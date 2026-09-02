import time
import json
import uuid
import random
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List

from database import get_db_connection, init_db
from scoring_engine import compute_similarity_score, generate_random_clue

app = FastAPI(title="ORBIT Semantic Proximity Game API", version="1.0.0")

# CORS middleware for Vite development server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

# Pydantic schemas
class StartGameRequest(BaseModel):
    theme_id: str

class GuessRequest(BaseModel):
    session_id: str
    word: str

class HintRequest(BaseModel):
    session_id: str
    ads_watched: int # Must be >= 2

class RevealRequest(BaseModel):
    session_id: str
    ads_watched: int # Must be >= 3

@app.get("/api/themes")
def get_themes():
    conn = get_db_connection()
    cursor = conn.cursor()
    rows = cursor.execute("SELECT * FROM themes;").fetchall()
    conn.close()

    themes = []
    for r in rows:
        themes.append({
            "id": r["id"],
            "name": r["name"],
            "icon": r["icon"],
            "badge": r["badge"],
            "description": r["description"]
        })
    return {"themes": themes}

@app.post("/api/game/start")
def start_game(req: StartGameRequest):
    conn = get_db_connection()
    cursor = conn.cursor()

    # Get theme
    theme_row = cursor.execute("SELECT * FROM themes WHERE id = ?;", (req.theme_id,)).fetchone()
    if not theme_row:
        # Create dynamic custom theme if requested
        clean_name = req.theme_id.replace("custom-", "").replace("-", " ").title()
        cursor.execute(
            "INSERT INTO themes (id, name, icon, badge, description) VALUES (?, ?, ?, ?, ?);",
            (req.theme_id, clean_name, "✨", "CUSTOM", f"Custom secret word game for {clean_name}!")
        )

    # Pick random target word from database for this theme
    word_rows = cursor.execute("SELECT word FROM words WHERE theme_id = ?;", (req.theme_id,)).fetchall()
    if word_rows:
        target_word = random.choice(word_rows)["word"]
    else:
        target_word = req.theme_id.replace("custom-", "").split("-")[0].upper() or "MAGIC"

    session_id = f"sess_{uuid.uuid4().hex[:12]}"
    now = int(time.time())

    cursor.execute("""
    INSERT INTO sessions (session_id, theme_id, target_word, start_time)
    VALUES (?, ?, ?, ?);
    """, (session_id, req.theme_id, target_word, now))

    conn.commit()
    conn.close()

    return {
        "session_id": session_id,
        "theme_id": req.theme_id,
        "start_time": now,
        "message": "Game session locked server-side. Target word obfuscated!"
    }

@app.post("/api/game/guess")
def submit_guess(req: GuessRequest):
    conn = get_db_connection()
    cursor = conn.cursor()

    sess = cursor.execute("SELECT * FROM sessions WHERE session_id = ?;", (req.session_id,)).fetchone()
    if not sess:
        conn.close()
        raise HTTPException(status_code=404, detail="Game session not found.")

    if sess["is_won"] or sess["is_surrendered"]:
        conn.close()
        return {"error": "Game is already finished."}

    target_word = sess["target_word"]
    guesses = json.loads(sess["guesses_json"] or "[]")
    word_clean = req.word.strip().upper()

    # Calculate similarity score
    score = compute_similarity_score(word_clean, target_word)

    # Calculate rank position
    all_scores = [g["score"] for g in guesses] + [score]
    all_scores.sort(reverse=True)
    rank = all_scores.index(score) + 1

    new_guess = {
        "id": f"{word_clean}-{int(time.time()*1000)}",
        "word": word_clean,
        "score": score,
        "rank": rank,
        "timestamp": int(time.time())
    }

    guesses.append(new_guess)
    is_won = 1 if score == 100 else 0
    end_time = int(time.time()) if is_won else sess["end_time"]

    cursor.execute("""
    UPDATE sessions
    SET guesses_json = ?, is_won = ?, end_time = ?
    WHERE session_id = ?;
    """, (json.dumps(guesses), is_won, end_time, req.session_id))

    conn.commit()
    conn.close()

    return {
        "guess": new_guess,
        "total_guesses": len(guesses),
        "is_won": bool(is_won),
        "target_word": target_word if is_won else None
    }

@app.post("/api/game/hint")
def unlock_hint(req: HintRequest):
    if req.ads_watched < 2:
        raise HTTPException(status_code=400, detail="Must watch 2 sponsor ads to unlock hint.")

    conn = get_db_connection()
    cursor = conn.cursor()

    sess = cursor.execute("SELECT * FROM sessions WHERE session_id = ?;", (req.session_id,)).fetchone()
    if not sess:
        conn.close()
        raise HTTPException(status_code=404, detail="Session not found.")

    guesses = json.loads(sess["guesses_json"] or "[]")
    unlocked_hints = json.loads(sess["unlocked_hints_json"] or "[]")
    last_hint_guess_count = sess["last_hint_guess_count"]

    # Enforce 10-guess cooldown between clues (except for 1st hint)
    if len(unlocked_hints) > 0:
        guesses_since_last = len(guesses) - last_hint_guess_count
        if guesses_since_last < 10:
            conn.close()
            raise HTTPException(
                status_code=400,
                detail=f"Cooldown active! Need {10 - guesses_since_last} more guesses before unlocking next clue."
            )

    # Generate random clue
    theme_row = cursor.execute("SELECT name FROM themes WHERE id = ?;", (sess["theme_id"],)).fetchone()
    theme_name = theme_row["name"] if theme_row else sess["theme_id"]
    new_hint = generate_random_clue(sess["target_word"], theme_name)

    unlocked_hints.append(new_hint)

    cursor.execute("""
    UPDATE sessions
    SET unlocked_hints_json = ?, last_hint_guess_count = ?
    WHERE session_id = ?;
    """, (json.dumps(unlocked_hints), len(guesses), req.session_id))

    conn.commit()
    conn.close()

    return {
        "hint": new_hint,
        "unlocked_hints": unlocked_hints,
        "hint_index": len(unlocked_hints)
    }

@app.post("/api/game/reveal")
def reveal_target_word(req: RevealRequest):
    if req.ads_watched < 3:
        raise HTTPException(status_code=400, detail="Must watch 3 sponsor ads to reveal word.")

    conn = get_db_connection()
    cursor = conn.cursor()

    sess = cursor.execute("SELECT * FROM sessions WHERE session_id = ?;", (req.session_id,)).fetchone()
    if not sess:
        conn.close()
        raise HTTPException(status_code=404, detail="Session not found.")

    guesses = json.loads(sess["guesses_json"] or "[]")
    if len(guesses) < 10:
        conn.close()
        raise HTTPException(status_code=400, detail="Must make at least 10 guesses before revealing secret word.")

    target_word = sess["target_word"]
    cursor.execute("""
    UPDATE sessions
    SET is_surrendered = 1, end_time = ?
    WHERE session_id = ?;
    """, (int(time.time()), req.session_id))

    conn.commit()
    conn.close()

    return {
        "target_word": target_word,
        "total_guesses": len(guesses),
        "is_surrendered": True
    }

if __name__ == "__main__":
    import uvicorn
    print("Starting ORBIT FastAPI server on http://localhost:8000 ...")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
