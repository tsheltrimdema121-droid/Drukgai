# Drukgai — Data Analysis

Anonymous student responses live in Lovable Cloud. This script pulls them down as CSV.

## One-time setup

```bash
cd analysis
pip install supabase pandas
```

Get your **service role key** from Lovable → Cloud → Settings → API (the `service_role` one, NOT the anon key). Keep it secret.

## Run it

```bash
export SUPABASE_SERVICE_ROLE_KEY="paste-key-here"
python fetch_data.py
```

CSVs land in `analysis/exports/` with a timestamp. Open in Excel, Numbers, or pandas.

## Tables

| Table | What's inside |
|---|---|
| `mood_checkins` | mood, GNH pillar, optional note |
| `quiz_responses` | readiness answers, score, tier |
| `ikigai_reflections` | love / good at / world needs / paid for |
| `druk_stories` | shared stories from older students |

`.gitignore` already excludes `exports/` and any `.env`.
