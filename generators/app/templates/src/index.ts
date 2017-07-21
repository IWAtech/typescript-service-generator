import appInsights = require('applicationinsights');
import * as restify from 'restify';
import * as restifyErrors from 'restify-errors';
import { SimpleDI } from 'typescript-simple-di';

export const server = restify.createServer({
  name: '<%= appname %>',
  version: '0.1.0',
  handleUncaughtExceptions: true,
});
server.use(restify.plugins.bodyParser({ mapParams: true }));

// setup azure application insights
const key = 'insert-your-azure-application-insights-key-here';
appInsights.setup(key)
    .setAutoCollectRequests(false)
    .start();
const client = appInsights.client;
server.pre((req: restify.Request, res: restify.Response, next: restify.Next) => {
  client.trackRequest(req, res, { app: server.name });
  return next();
});

// setup IoC service
SimpleDI.registerByName('appinsights', client);

server.get('/echo', (req: restify.Request, res: restify.Response, next: restify.Next) => {
  res.send(200, {message: 'Hello! This is <%= orgname %>/<%= appname %>'});
  next();
});

server.listen(8000, () => {
  console.log('%s listening at %s', server.name, server.url);
});
