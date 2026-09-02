import sqlite3
import json
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "orbit_game.db")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Themes table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS themes (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        icon TEXT NOT NULL,
        badge TEXT NOT NULL,
        description TEXT NOT NULL
    );
    """)

    # Words table (50+ words per theme)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS words (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        theme_id TEXT NOT NULL,
        word TEXT NOT NULL,
        is_target INTEGER DEFAULT 0,
        associations_json TEXT,
        clues_json TEXT,
        FOREIGN KEY (theme_id) REFERENCES themes(id)
    );
    """)

    # Sessions table (Server-side target word locking & anti-cheat)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS sessions (
        session_id TEXT PRIMARY KEY,
        theme_id TEXT NOT NULL,
        target_word TEXT NOT NULL,
        guesses_json TEXT DEFAULT '[]',
        unlocked_hints_json TEXT DEFAULT '[]',
        last_hint_guess_count INTEGER DEFAULT 0,
        is_won INTEGER DEFAULT 0,
        is_surrendered INTEGER DEFAULT 0,
        start_time INTEGER NOT NULL,
        end_time INTEGER DEFAULT 0
    );
    """)

    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully at:", DB_PATH)
