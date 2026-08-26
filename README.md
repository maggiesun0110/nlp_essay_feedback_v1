# Essay Feedback Tool

An exploratory NLP application that identifies writing patterns which may be useful during essay revision, such as passive-voice constructions, repeated sentence starters, repeated nearby words, and similar sentence-opening structures.

The project combines a spaCy-based Python analysis service with a React interface to create a transparent, rule-based feedback tool.

## Features

- Counts words and sentences in a draft
- Flags likely passive-voice constructions using dependency and morphology signals
- Finds sentences that begin with the same word
- Groups repeated content words within a local sentence window
- Detects consecutive sentences with similar opening structures
- Presents results in a readable, responsive interface

## Architecture

```text
React + Vite frontend
        |
        | POST /analyze
        v
FastAPI service
        |
        v
spaCy en_core_web_sm pipeline
```

The analyzer uses interpretable linguistic rules over spaCy annotations. Keeping the rules explicit makes the system easier to inspect, test, and revise.

## Run locally

### Backend

Python 3.10 or newer is recommended.

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m spacy download en_core_web_sm
uvicorn backend.server:app --reload
```

The API runs at `http://127.0.0.1:8000`. Check it with:

```bash
curl http://127.0.0.1:8000/health
```

### Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

To use a backend at another address, create `frontend/.env.local`:

```text
VITE_API_URL=http://127.0.0.1:8000
```

## Tests and checks

```bash
pip install -r requirements-dev.txt
pytest
cd frontend
npm run lint
npm run build
```

## Example

Input:

> This draft is short. This draft was reviewed by a classmate.

The tool reports the repeated starter “this” and identifies the likely passive construction in the second sentence.

## Limitations

- The system is rule-based and can produce false positives or miss valid patterns.
- Passive voice is not inherently incorrect; whether it should be revised depends on context.
- Repetition can be intentional and rhetorically effective.
- The current English model is not designed to evaluate argument quality, factual accuracy, originality, or overall writing quality.
- Text is processed by the locally running backend and is not stored by this application.

## Future work

- Evaluate each detector against an annotated test set
- Attach explanations and confidence information to individual findings
- Make repetition thresholds configurable
- Improve accessibility and result highlighting
- Package the application for deployment

## Technology

- Python, FastAPI, spaCy
- JavaScript, React, Vite
- pytest and ESLint


