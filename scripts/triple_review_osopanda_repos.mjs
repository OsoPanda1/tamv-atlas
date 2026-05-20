#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { readdir } from 'node:fs/promises';

const OWNER = process.env.TAMV_GH_OWNER ?? 'OsoPanda1';
const API = 'https://api.github.com';
const headers = {
  Accept: 'application/vnd.github+json',
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

const now = new Date();
const day = now.toISOString().slice(0, 10).replaceAll('-', '');

function mapFederation(repo) {
  const name = `${repo.name} ${(repo.description ?? '')}`.toLowerCase();
  if (/atlas|wiki|doc|knowledge|canon/.test(name)) return 'federation.knowledge-atlas';
  if (/api|backend|server|gateway|service|auth/.test(name)) return 'federation.backend-services';
  if (/ai|ml|model|llm|agent|isabella/.test(name)) return 'federation.ai-intelligence';
  if (/security|crypto|did|ssi|identity|wallet|audit/.test(name)) return 'federation.security-identity';
  if (/xr|vr|ar|metaverse|three|unity/.test(name)) return 'federation.xr-experience';
  if (/infra|devops|k8s|terraform|docker|ci|cd/.test(name)) return 'federation.infrastructure';
  return 'federation.general-labs';
}

function readiness(repo) {
  const stars = repo.stargazers_count ?? 0;
  const forks = repo.forks_count ?? 0;
  const issues = repo.open_issues_count ?? 0;
  const hasHomepage = Boolean(repo.homepage);
  const hasTopics = (repo.topics ?? []).length > 0;
  const archivedPenalty = repo.archived ? 30 : 0;
  const base = Math.min(100, 35 + stars * 1.5 + forks * 1.2 + (hasHomepage ? 8 : 0) + (hasTopics ? 10 : 0) - Math.min(issues, 40) * 0.7);
  return Math.max(5, Math.round(base - archivedPenalty));
}

async function fetchAllRepos(owner) {
  const repos = [];
  for (let page = 1; page < 10; page += 1) {
    const url = `${API}/users/${owner}/repos?type=owner&sort=updated&per_page=100&page=${page}`;
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`GitHub API error ${res.status} ${url}`);
    const batch = await res.json();
    if (!batch.length) break;
    repos.push(...batch);
  }
  return repos;
}

async function loadLocalFallbackRepos() {
  const entries = await readdir('federation', { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({
      name: entry.name,
      description: 'local-fallback-from-federation-dir',
      private: false,
      archived: false,
      default_branch: 'main',
      pushed_at: null,
      html_url: `https://github.com/${OWNER}/${entry.name}`,
      language: 'Unknown',
      topics: [],
      stargazers_count: 0,
      forks_count: 0,
      open_issues_count: 0,
      homepage: null,
      fork: false,
    }));
}

function tripleReview(repos) {
  const filtered = repos.filter((r) => !r.fork);
  const review = filtered.map((repo) => {
    const federation = mapFederation(repo);
    const pass1 = {
      metadata: {
        name: repo.name,
        private: repo.private,
        archived: repo.archived,
        defaultBranch: repo.default_branch,
        pushedAt: repo.pushed_at,
      },
    };
    const pass2 = {
      classification: {
        federation,
        primaryLanguage: repo.language ?? 'Unknown',
        topics: repo.topics ?? [],
      },
    };
    const pass3 = {
      operational: {
        readiness: readiness(repo),
        risk: repo.archived ? 'high' : 'medium',
        recommendation: repo.archived ? 'freeze_or_migrate' : 'integrate_iteratively',
      },
    };
    return {
      repo: repo.name,
      url: repo.html_url,
      ...pass1,
      ...pass2,
      ...pass3,
    };
  });

  const grouped = review.reduce((acc, item) => {
    acc[item.classification.federation] ??= [];
    acc[item.classification.federation].push(item);
    return acc;
  }, {});

  const manifest = {
    schema: 'tamv.federation.triple-review.v1',
    owner: OWNER,
    generatedAt: now.toISOString(),
    totals: {
      repositories: review.length,
      federations: Object.keys(grouped).length,
      averageReadiness: Math.round(review.reduce((sum, r) => sum + r.operational.readiness, 0) / Math.max(1, review.length)),
    },
    triplePasses: ['metadata', 'classification', 'operational'],
    federations: grouped,
  };

  const canonical = JSON.stringify(manifest);
  const tamvInternalSha = createHash('sha256').update(canonical).digest('hex');
  return {
    ...manifest,
    tamvInternalSha,
    registry: {
      ledgerId: `tamv-online:${OWNER}:${day}`,
      signedAt: now.toISOString(),
      algorithm: 'sha256',
    },
  };
}

async function main() {
  let repos;
  try {
    repos = await fetchAllRepos(OWNER);
  } catch (error) {
    console.warn(`GitHub API unavailable, using local fallback: ${error instanceof Error ? error.message : String(error)}`);
    repos = await loadLocalFallbackRepos();
  }
  const reviewed = tripleReview(repos);
  await mkdir('data/federation', { recursive: true });
  const dated = `data/federation/osopanda-triple-review-${day}.json`;
  await writeFile(dated, JSON.stringify(reviewed, null, 2));
  await writeFile('data/federation/osopanda-triple-review-latest.json', JSON.stringify(reviewed, null, 2));
  console.log(`Generated ${dated}`);
  console.log(`SHA ${reviewed.tamvInternalSha}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
