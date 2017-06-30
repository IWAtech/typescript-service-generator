import { Greeter } from '../src/greeter';

describe('greeter', () => {
  it('should greet with message', () => {
    const greeter = new Greeter('friend');
    expect(greeter.greet()).toEqual('Bonjour, friend!');
  });
});
