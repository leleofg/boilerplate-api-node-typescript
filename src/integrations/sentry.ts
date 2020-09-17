import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_URL,
  tracesSampleRate: 1.0,
});

export default Sentry;
