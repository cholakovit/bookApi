import fs from 'fs';
import path from 'path';
import pinoPretty from 'pino-pretty';

export const getLogStreams = (isProduction: boolean) => {
  const logPath = path.join(__dirname, '../logs/server.log'); // Path to log file
  const logStream = fs.createWriteStream(logPath, { flags: 'a' });

  // File stream for logging
  const fileStream = { stream: logStream };

  // Pretty print stream for development
  const prettyStream = pinoPretty({
    colorize: true, // Enable colors in the terminal
  });

  return isProduction
    ? [fileStream] // In production, log only to the file
    : [
        { stream: prettyStream }, // In development, log to the terminal (pretty-printed)
        fileStream, // Also log to the file
      ];
};
