import * as index from '../src';

describe('index.ts', () => {
  it('exports a message', () => {
    expect(index).toEqual({ message: 'Hello, World!' });
  });
});
