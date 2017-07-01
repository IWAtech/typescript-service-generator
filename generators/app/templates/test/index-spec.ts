import fetch from 'node-fetch';

import index = require('../src/index');

describe('server', () => {
  it('should echo with message', (done) => {
    const expectedMessage = 'Hello! This is <%= orgname %>/<%= appname %>';
    index.server.once('listening', async () => {
      try {
        const response = await fetch(
            'http://127.0.0.1:' + index.server.address().port + '/echo',
          ).then((resp) => {
            return resp.json();
          });

        expect(response.message).toEqual(expectedMessage);
      } catch (error) {
        console.error('error', error);
        expect(false).toBeTruthy();
      } finally {
        done();
      }
    });
  });
});
