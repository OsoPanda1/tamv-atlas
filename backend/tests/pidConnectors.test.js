import test from 'node:test';
import assert from 'node:assert/strict';
import { loadPidStatus } from '../src/pidConnectors.js';

const baseConfig = {
  pids: {
    orcid: '0000-0000-0000-0000',
    zenodoRecord: '12345',
    isni: '0000 0001 2281 955X',
  },
};

test('loadPidStatus resolves ORCID, Zenodo and ISNI with fetch adapter', async () => {
  const fetchImpl = async (url) => {
    if (url.includes('/person')) {
      return Response.json({
        name: {
          'given-names': { value: 'Jane' },
          'family-name': { value: 'Doe' },
        },
      });
    }

    if (url.includes('/works')) {
      return Response.json({
        group: [{ 'last-modified-date': { value: 1715723077442 } }],
      });
    }

    if (url.includes('zenodo.org/api/records/12345')) {
      return Response.json({
        doi: '10.5281/zenodo.12345',
        metadata: {
          title: 'Demo record',
          publication_date: '2026-04-16',
        },
        links: {
          html: 'https://zenodo.org/records/12345',
        },
      });
    }

    if (url.includes('isni.org/isni/000000012281955X')) {
      return new Response('<html>ok</html>', { status: 200 });
    }

    return new Response('not-found', { status: 404 });
  };

  const result = await loadPidStatus(baseConfig, { fetchImpl });
  assert.equal(result.records.orcid.reachable, true);
  assert.equal(result.records.orcid.displayName, 'Jane Doe');
  assert.equal(result.records.orcid.worksCount, 1);
  assert.equal(result.records.zenodo.reachable, true);
  assert.equal(result.records.zenodo.doi, '10.5281/zenodo.12345');
  assert.equal(result.records.isni.reachable, true);
});

test('loadPidStatus keeps service alive when one provider fails', async () => {
  const fetchImpl = async (url) => {
    if (url.includes('zenodo.org/api/records/12345')) {
      return new Response('forbidden', { status: 403 });
    }

    if (url.includes('/person')) {
      return Response.json({ name: {} });
    }

    if (url.includes('/works')) {
      return Response.json({ group: [] });
    }

    if (url.includes('isni.org/isni/000000012281955X')) {
      return new Response('ok', { status: 200 });
    }

    return new Response('not-found', { status: 404 });
  };

  const result = await loadPidStatus(baseConfig, { fetchImpl });
  assert.equal(result.records.orcid.reachable, true);
  assert.equal(result.records.isni.reachable, true);
  assert.equal(result.records.zenodo.reachable, false);
  assert.match(result.records.zenodo.error, /403/);
});
