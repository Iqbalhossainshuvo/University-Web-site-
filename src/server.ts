import mongoose from 'mongoose';
import config from './config';
import app from './app';
import { logger, errorlogger } from './Shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorlogger.error(error);
  process.exit(1);
});

let server: Server;

async function databaseConnection() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('database connection established');

    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    errorlogger.error('Failed to connect to database', err);
  }

  process.on('unhandledRejection', error => {
    console.log(
      'Unhandled rejection in detected we are closing our server........'
    );
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
databaseConnection();

// signal error
process.on('SIGTERM', () => {
  logger.info('signal error');
  if (server) {
    server.close();
  }
});
