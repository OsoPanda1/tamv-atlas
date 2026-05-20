# RFC-0001: Triple Review & Federation Classification Pipeline

- Date: 2026-05-20
- Status: Draft
- Owner: TAMV Online
- Internal Registry SHA Source: `data/federation/osopanda-triple-review-latest.json`

## Summary
Define a repeatable pipeline that reviews all OsoPanda1 repositories in three passes (metadata, classification, operational readiness), then publishes a federation-classified JSON artifact consumable by backend and frontend modules.

## Decision
Adopt `scripts/triple_review_osopanda_repos.mjs` as the canonical generator and persist outputs under `data/federation/` with a date-stamped snapshot plus `latest` alias.

## Output Contract
- `schema`
- `owner`
- `generatedAt`
- `totals`
- `federations`
- `tamvInternalSha`
- `registry`

## Security
- Uses read-only GitHub API.
- Auth token optional via `GITHUB_TOKEN`.
- Internal SHA generated with `sha256` over canonical manifest payload.
