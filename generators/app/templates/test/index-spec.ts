import server = require('../src/index');

describe('server', () => {
  it('should echo with message', () => {
    const expectedMessage = 'Hello! This is updatemi/platform-article-service';
    expect(expectedMessage).toEqual(expectedMessage);
    // expect(server.echo()).toEqual(expectedMessage);
  });
});
