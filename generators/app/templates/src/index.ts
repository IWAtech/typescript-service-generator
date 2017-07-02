import { Tracker } from 'prometheus-tracking';
import * as restify from 'restify';

export const server = restify.createServer({
  name: '<%= appname %>',
  version: '0.1.0',
});

// setup tracking (exports prometheus metrics @ port 9090 /metrics)
const tracker = Tracker.getInstance(server.name);
server.on('after', (req: restify.Request, res: restify.Response) => {
  tracker.trackResponseTime(req.url, req.method, res.statusCode, Tracker.sumUp(req.timers.map((t) => t.time)));
});

server.use(restify.bodyParser());

server.get('/echo', (req: restify.Request, res: restify.Response, next: restify.Next) => {
  res.send(200, {message: 'Hello! This is <%= orgname %>/<%= appname %>'});
  next();
});

server.listen(8000, () => {
  console.log('%s listening at %s', server.name, server.url);
});
