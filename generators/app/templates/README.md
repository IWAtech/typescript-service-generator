# <%= appname %>

INSERT YOUR APP DESCRIPTION HERE

## Development

Following scripts are available to you (in the package.json):

- `start` Starts the webserver (executes lib/index.js)
- `start:watch` Same as `start` but restarts when file changes are detected
- `build` Compliles the typescript sources to javascript
- `build:docker` Builds sources, packages them into a docker image and push it to the DockerHub repository
- `test` Runs all specs
- `test:coverage` Runs all specs and generates a coverage report
- `watch` Same as build but stays active and watches for file changes

You can run them using `yarn run [script]`

### Want to use mongoose in your service?

Run `yarn run yarn:install:mongoose`

Next add following imports

```typescript
import * as bluebird from 'bluebird';
import * as mongoose from 'mongoose';
```

After that you can add this snippet in your application

```typescript
// Use bluebird
declare module 'mongoose' {
  type Promise<T> = bluebird<T>;
}
(mongoose as any).Promise = bluebird;
const options = { promiseLibrary: bluebird };
mongoose.connect('mongodb://mongodb:27017/test', options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', console.info.bind(console, 'connection open:'));
```

Now you should have an active mongodb connection and can create schemas and model to make use of it. For more details take a look at the [offical mongoose documentation](http://mongoosejs.com/docs/guide.html) or the [README for the mongoose typings](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/mongoose) to see the correct TypeScript syntax.

### Want to build graphql a service?

Run `yarn run yarn:install:graphql`

Next add following imports

```typescript
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
```

Now replace the restify server with the following snippet which will give you a basic graphql server based on express

```typescript
const typeDefs = [`
type Query {
  hello: String
}

schema {
  query: Query
}`];

const resolvers = {
  Query: {
    hello(root) {
      return 'world';
    }
  }
};

const schema = makeExecutableSchema({typeDefs, resolvers});
const server = express();
server.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
server.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
server.listen(4000, () => console.log('Now browse to localhost:4000/graphiql'));
```
