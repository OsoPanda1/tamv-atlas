import { config } from '../config.js';
import { reconcilePids } from '../pidReconciler.js';

const EXIT = Object.freeze({
  SUCCESS: 0,
  VALIDATION_FAILED: 1,
  RUNTIME_ERROR: 2,
});

const emit = (level, message, payload = null) => {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...(payload && { payload }),
  };

  const output = JSON.stringify(entry);

  if (level === 'error') {
    console.error(output);
  } else {
    console.log(output);
  }
};

const normalizeError = (error) => ({
  name: error?.name || 'Error',
  message: error?.message || 'Unknown error',
  stack: error?.stack,
});

async function runReconciliation() {
  emit('info', 'PID reconciliation started');

  const report = await reconcilePids(config);

  emit('info', 'PID reconciliation completed', report);

  process.exitCode = report.passed
    ? EXIT.SUCCESS
    : EXIT.VALIDATION_FAILED;

  return report;
}

async function main() {
  try {
    await runReconciliation();
  } catch (error) {
    emit(
      'error',
      'PID reconciliation job failed',
      normalizeError(error),
    );

    process.exitCode = EXIT.RUNTIME_ERROR;
  }
}

main();
