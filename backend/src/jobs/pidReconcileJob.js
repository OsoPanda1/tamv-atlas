import { config } from '../config.js';
import { reconcilePids } from '../pidReconciler.js';

async function main() {
  const report = await reconcilePids(config);
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(report, null, 2));

  if (!report.passed) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('PID reconciliation job failed:', error);
  process.exit(1);
});
