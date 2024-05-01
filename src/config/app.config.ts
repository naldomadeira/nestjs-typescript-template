export default () => {
  const appName = process.env.APP_NAME ?? 'nestjs-boilerplate';
  const env = process.env.ENV ?? 'dev';
  const logLevel = process.env.LOG_LEVEL ?? 'debug';

  return {
    appName,
    env,
    logLevel,
    port: process.env.PORT ?? 3000,
    logInjection: process.env.LOG_INJECTION ?? true,
  };
};
