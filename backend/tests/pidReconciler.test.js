import test from 'node:test';
import assert from 'node:assert/strict';
import { validatePidFormat } from '../src/pidReconciler.js';

test('validatePidFormat returns true on valid PID schema', () => {
  const result = validatePidFormat({
    isni: 'TAMV-ONLINE-0001',
    orcid: '0009-0008-5050-1539',
    zenodoRecord: '19436662',
    doiPrefix: '10.5281',
  });

  assert.deepEqual(result, {
    isni: true,
    orcid: true,
    zenodoRecord: true,
    doiPrefix: true,
  });
});
