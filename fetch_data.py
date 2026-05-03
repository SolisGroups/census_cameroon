"""
fetch_data.py
Récupère toutes les soumissions + le schéma du formulaire KoboToolbox
et les sauvegarde dans data/submissions.json et data/schema.json.
Exécuté par GitHub Actions — aucun problème CORS.
"""

import os
import json
import sys
from datetime import datetime, timezone

try:
    import requests
except ImportError:
    print("❌ Module 'requests' manquant. Lancez : pip install requests")
    sys.exit(1)

# ── Configuration ────────────────────────────────────────────────────────
TOKEN    = os.environ.get("KOBO_TOKEN", "d7a3665f98d0d72d41f4def5c149da9eb5bf4564")
FORM_UID = os.environ.get("FORM_UID",   "aaoCZKsTPkLeLhdB6wDXdW")
BASE_URL = "https://kf.kobotoolbox.org/api/v2"
HEADERS  = {"Authorization": f"Token {TOKEN}"}
DATA_DIR = "data"

os.makedirs(DATA_DIR, exist_ok=True)

def fetch_json(url, label=""):
    """GET sur une URL KoboToolbox avec gestion d'erreur."""
    print(f"  → {label or url}")
    r = requests.get(url, headers=HEADERS, timeout=60)
    r.raise_for_status()
    return r.json()

# ── 1. Schéma du formulaire ──────────────────────────────────────────────
print("📋 Récupération du schéma…")
schema = fetch_json(f"{BASE_URL}/assets/{FORM_UID}/?format=json", "schéma formulaire")

schema_path = os.path.join(DATA_DIR, "schema.json")
with open(schema_path, "w", encoding="utf-8") as f:
    json.dump(schema, f, ensure_ascii=False, indent=2)
print(f"   ✅ Schéma sauvegardé → {schema_path}")

# ── 2. Données (pagination automatique) ──────────────────────────────────
print("📊 Récupération des soumissions…")
all_results = []
url = f"{BASE_URL}/assets/{FORM_UID}/data/?format=json&limit=5000"
page = 1

while url:
    data = fetch_json(url, f"page {page} ({len(all_results)} enregistrements chargés)")
    batch = data.get("results", [])
    all_results.extend(batch)
    url = data.get("next")
    page += 1

print(f"   ✅ {len(all_results)} soumissions récupérées au total.")

# ── 3. Sauvegarde avec métadonnées ────────────────────────────────────────
now_iso = datetime.now(timezone.utc).isoformat()

output = {
    "fetched_at": now_iso,
    "count":      len(all_results),
    "form_uid":   FORM_UID,
    "results":    all_results
}

subs_path = os.path.join(DATA_DIR, "submissions.json")
with open(subs_path, "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, separators=(",", ":"))

size_kb = os.path.getsize(subs_path) / 1024
print(f"   ✅ Données sauvegardées → {subs_path}  ({size_kb:.0f} Ko)")
print(f"\n🎉 Synchronisation terminée à {now_iso}")
