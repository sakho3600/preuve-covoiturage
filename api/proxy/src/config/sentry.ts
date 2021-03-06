import { env } from '@ilos/core';

export const dsn = env('APP_SENTRY_DSN', null);
export const environment = env('APP_SENTRY_ENV', env('NODE_ENV', 'local'));
export const version = env('APP_VERSION', '0.0.1');
