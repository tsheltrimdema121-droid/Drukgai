"""
Drukgai — data fetch script
Pulls all anonymous responses from Lovable Cloud (Supabase) and saves them
as CSV files in ./exports/ for analysis in Excel / pandas / Jupyter.

Run from VS Code terminal:
    cd analysis
    pip install supabase pandas python-dotenv
    export SUPABASE_URL="https://uwpwgtibedtpjpsknsac.supabase.co"
    export SUPABASE_SERVICE_ROLE_KEY="..."   # from Cloud → Settings → API
    python fetch_data.py

The service role key BYPASSES Row-Level Security. Keep it private — never
commit it, never put it in the website code. Treat it like a password.
"""

import os
import sys
from pathlib import Path
from datetime import datetime

try:
    import pandas as pd
    from supabase import create_client
except ImportError:
    print("Missing deps. Run:  pip install supabase pandas")
    sys.exit(1)

URL = os.environ.get("SUPABASE_URL", "https://uwpwgtibedtpjpsknsac.supabase.co")
KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not KEY:
    print("ERROR: SUPABASE_SERVICE_ROLE_KEY not set.")
    print("Get it from: Lovable → Cloud → Settings → API → service_role")
    print("Then:  export SUPABASE_SERVICE_ROLE_KEY='...'")
    sys.exit(1)

TABLES = ["mood_checkins", "quiz_responses", "ikigai_reflections", "druk_stories"]

out_dir = Path(__file__).parent / "exports"
out_dir.mkdir(exist_ok=True)
stamp = datetime.now().strftime("%Y%m%d_%H%M")

sb = create_client(URL, KEY)
print(f"Connected to {URL}\n")

summary = []
for table in TABLES:
    try:
        rows = sb.table(table).select("*").order("created_at", desc=True).execute().data
    except Exception as e:
        print(f"  ✗ {table}: {e}")
        continue

    df = pd.DataFrame(rows)
    path = out_dir / f"{table}_{stamp}.csv"
    df.to_csv(path, index=False)
    print(f"  ✓ {table:<22}  {len(df):>4} rows  →  {path.name}")
    summary.append((table, len(df)))

# Quick analysis preview
print("\n── Quick look ──")
moods = sb.table("mood_checkins").select("mood, gnh_pillar").execute().data
if moods:
    mdf = pd.DataFrame(moods)
    print("\nMood distribution:")
    print(mdf["mood"].value_counts().to_string())
    print("\nGNH pillar focus:")
    print(mdf["gnh_pillar"].value_counts().to_string())

quizzes = sb.table("quiz_responses").select("tier, percentage").execute().data
if quizzes:
    qdf = pd.DataFrame(quizzes)
    print(f"\nReadiness — avg score: {qdf['percentage'].mean():.1f}%")
    print(qdf["tier"].value_counts().to_string())

print(f"\nAll exports saved in: {out_dir}")
