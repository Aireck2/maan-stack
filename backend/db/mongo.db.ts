import mongoose from "mongoose";

import config from "../helpers/config";
import logger from "../helpers/logger";

const {
  db: { name, uri },
} = config;

const ctx = { context: "DATABASE" };

const dbConnect = (startServer?: () => void) => {
  mongoose.connect(uri);
  mongoose.connection.on("error", (error) => {
    logger
      .child(ctx)
      .error(
        `:: MongoDB :: Error to connect: ${name} :: ${JSON.stringify(error)}`
      );
    mongoose.connection
      .close()
      .catch(() =>
        logger.child(ctx).error(`[MongoDB]: Failed to close connection ${name}`)
      );
  });

  mongoose.connection.on("connected", () => {
    logger.child(ctx).info(`:: MongoDB :: Established connection: ${name}`);
    startServer && startServer();
  });

  mongoose.connection.on("disconnected", () => {
    logger.child(ctx).error(`[MongoDB] Disconnected: ${name}`);
  });
};

export { dbConnect };
