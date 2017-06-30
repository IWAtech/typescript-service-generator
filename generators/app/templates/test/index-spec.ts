import index = require('../src/index');

describe('index', () => {
  it('should provide Greeter', () => {
    expect(index.Greeter).toBeDefined();
  });
});
