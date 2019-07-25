import appInsights = require('applicationinsights');
import * as restify from 'restify';
import * as restifyErrors from 'restify-errors';
import { SimpleDI } from 'typescript-simple-di';

export const server = restify.createServer({
  name: '<%= appname %>',
  version: '0.1.0',
});
server.use(restify.plugins.bodyParser({ mapParams: true }));

// setup azure application insights
const appInsightsKey = process.env.APPINSIGHTS_KEY;
if (appInsightsKey) {
  appInsights.setup(appInsightsKey).start();
  const client = appInsights.defaultClient;
  client.commonProperties = {
    app: '<%= appname %>',
  };
  SimpleDI.registerByName('appinsights', client);
}

server.get('/echo', (req: restify.Request, res: restify.Response, next: restify.Next) => {
  res.send(200, {message: 'Hello! This is <%= orgname %>/<%= appname %>'});
  next();
});

const port = Number(process.env.PORT) || 8000;
server.listen(port, () => {
  console.log('%s listening at %s', server.name, server.url);
});
