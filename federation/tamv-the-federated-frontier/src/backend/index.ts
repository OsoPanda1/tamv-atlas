import { createTamvServer } from "./server";

const app = createTamvServer(Number(process.env.TAMV_PORT ?? 4080));
app.start().then(() => {
  // eslint-disable-next-line no-console
  console.log(`TAMV backend running on http://localhost:${app.port}`);
});
