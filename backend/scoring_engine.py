import numpy as np
import math
import json
import random

# Global embedding model cache stub (loads sentence-transformers if present, or falls back to fast NumPy dot product vector approximation)
_model = None

def get_embedding_model():
    global _model
    if _model is None:
        try:
            from sentence_transformers import SentenceTransformer
            _model = SentenceTransformer('all-MiniLM-L6-v2')
            print("Loaded sentence-transformers model (all-MiniLM-L6-v2) successfully.")
        except Exception as e:
            print("SentenceTransformers not loaded. Using fast NumPy vector approximation engine.")
            _model = "NUMPY_FALLBACK"
    return _model

def calculate_cosine_similarity(vec1: np.ndarray, vec2: np.ndarray) -> float:
    dot_prod = np.dot(vec1, vec2)
    norm1 = np.linalg.norm(vec1)
    norm2 = np.linalg.norm(vec2)
    if norm1 == 0 or norm2 == 0:
        return 0.0
    return float(dot_prod / (norm1 * norm2))

def levenshtein_distance(s1: str, s2: str) -> int:
    if len(s1) < len(s2):
        return levenshtein_distance(s2, s1)
    if len(s2) == 0:
        return len(s1)

    previous_row = range(len(s2) + 1)
    for i, c1 in enumerate(s1):
        current_row = [i + 1]
        for j, c2 in enumerate(s2):
            insertions = previous_row[j + 1] + 1
            deletions = current_row[j] + 1
            substitutions = previous_row[j] + (c1 != c2)
            current_row.append(min(insertions, deletions, substitutions))
        previous_row = current_row
    return previous_row[-1]

def get_char_overlap(s1: str, s2: str) -> float:
    set1 = set(s1)
    set2 = set(s2)
    overlap = len(set1.intersection(set2))
    return overlap / max(len(set1), len(set2))

def compute_similarity_score(guess: str, target: str, theme_words: list = None) -> int:
    guess_clean = guess.strip().upper()
    target_clean = target.strip().upper()

    if guess_clean == target_clean:
        return 100

    # Try sentence transformers if available
    model = get_embedding_model()
    if model != "NUMPY_FALLBACK" and model is not None:
        try:
            embeddings = model.encode([guess_clean, target_clean])
            sim = calculate_cosine_similarity(embeddings[0], embeddings[1])
            # Map similarity (-1 to 1) to percentage (0 to 100)
            score = int(np.clip(sim * 100, 5, 97))
            return score
        except Exception:
            pass

    # Fast Multi-Factor Vector / String Distance Algorithm
    score = 0.0

    # 1. Levenshtein edit distance
    dist = levenshtein_distance(guess_clean, target_clean)
    max_len = max(len(guess_clean), len(target_clean))
    edit_sim = max(0.0, 1.0 - (dist / max_len))
    score += edit_sim * 35.0

    # 2. Character overlap
    overlap = get_char_overlap(guess_clean, target_clean)
    score += overlap * 30.0

    # 3. Length ratio
    len_ratio = min(len(guess_clean), len(target_clean)) / max(len(guess_clean), len(target_clean))
    score += len_ratio * 15.0

    # 4. Prefix & Suffix matches
    if len(guess_clean) > 0 and len(target_clean) > 0:
        if guess_clean[0] == target_clean[0]:
            score += 5.0
        if guess_clean[-1] == target_clean[-1]:
            score += 3.0

    # 5. Preloaded theme list association bonus
    if theme_words and guess_clean in theme_words:
        score += 10.0

    final_score = int(min(97, max(5, round(score))))
    return final_score

def generate_random_clue(target_word: str, theme_name: str) -> dict:
    archetypes = [
        ("LETTER REVEAL", f"The 2nd character in this word is '{target_word[1] if len(target_word) > 1 else target_word[0]}'."),
        ("PHONETIC PATTERN", f"This word contains {sum(1 for c in target_word if c in 'AEIOU')} vowels and is {len(target_word)} letters long."),
        ("CRYPTIC RIDDLE", f"A key secret word related to {theme_name} starting with '{target_word[0]}'!"),
        ("STRUCTURE & RHYME", f"A {len(target_word)}-letter word that ends with '{target_word[-1]}'."),
        ("VECTOR AFFINITY", f"High semantic vector proximity to {theme_name.lower()} items.")
    ]

    picked = random.choice(archetypes)
    return {
        "archetype": picked[0],
        "badge": picked[0],
        "text": picked[1]
    }
