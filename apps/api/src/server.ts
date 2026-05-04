import { createApp } from "./app";
import { config } from "./config";

async function start() {
  const app = createApp();

  try {
    await app.listen({
      host: config.host,
      port: config.port
    });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

void start();
