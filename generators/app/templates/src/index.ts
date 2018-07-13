import appInsights = require('applicationinsights');
import * as restify from 'restify';
import * as restifyErrors from 'restify-errors';
import { SimpleDI } from 'typescript-simple-di';

export const server = restify.createServer({
  name: '<%= appname %>',
  version: '0.1.0',
});
server.use(restify.plugins.bodyParser({ mapParams: true, maxFileSize: 20 * 1024 * 1024 }));

// setup azure application insights
const appInsightsKey = process.env.APPINSIGHTS_KEY;
if (appInsightsKey) {
  appInsights.setup(appInsightsKey)
      .setAutoCollectRequests(false)
      .start();
  const client = appInsights.defaultClient;
  SimpleDI.registerByName('appinsights', client);

  server.pre((req: restify.Request, res: restify.Response, next: restify.Next) => {
    client.trackNodeHttpRequest({
      request: req,
      response: res,
    });
    return next();
  });
}

server.get('/echo', (req: restify.Request, res: restify.Response, next: restify.Next) => {
  res.send(200, {message: 'Hello! This is <%= orgname %>/<%= appname %>'});
  next();
});

server.listen(8000, () => {
  console.log('%s listening at %s', server.name, server.url);
});
