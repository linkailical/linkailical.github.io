# AI Doctor — Symptom Checker

An **educational, fully offline** symptom-checker demo. A single self-contained
`index.html` (HTML + CSS + JavaScript, no build step, no dependencies, no API key)
that runs in any browser and can be deployed directly to GitHub Pages.

> ⚠️ **Not medical advice.** This is a student-built learning project that uses
> simple rules, not a real AI model or diagnosis. In an emergency, call your local
> emergency number.

## What it does

1. **Pick a main symptom** (fever, cough, headache, chest pain, etc.).
2. **Answer a few questions** — severity, duration, and warning signs.
3. **Get a rule-based triage result** with a color-coded urgency level:
   - 🟢 Self-care at home
   - 🟡 Routine doctor visit
   - 🟠 Urgent care (within hours)
   - 🔴 Emergency — seek care now

The logic lives in a small knowledge base (`SYMPTOMS`) plus a global list of
`EMERGENCY_FLAGS`. Triage = red-flag detection first, then severity/duration.

## Run it

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Tech & design notes

- Vanilla JS, no framework — easy to read as a first project.
- Knowledge base is data-driven, so adding a symptom = adding one object.
- Clear separation: data (`SYMPTOMS`) → questions (step 2) → triage rules (step 3).

## Possible next steps

- More symptoms and follow-up questions.
- Swap the rule engine for a real LLM (e.g. Claude API) behind a small backend.
- Localization (multi-language UI).

## License

MIT — educational use.
