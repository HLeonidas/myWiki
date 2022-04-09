// import mongoose from 'mongoose';
import AppError from './AppError.js';
import { log } from '../logging/app-logger.js';

export const defaultError = (err, req, res, next) => {
  res
    .status(500)
    .send('Problems at start up - contact the admin or use the healthcheck ');
};

export const handleAsyncError = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};

export const globalErrorHandler = (err, req, res, next) => {
  // console.error(err.stack);

  if (err instanceof AppError) {
    res.status(err.statusCode).send(err.message);
    return;
  }

  log.error(err);
  res.status(500).send('Something broke!');
};
