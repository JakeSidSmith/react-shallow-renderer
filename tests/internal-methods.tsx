import * as React from 'react';
import { ReactAnyNode, ReactShallowRenderer } from '../src';

describe('ReactShallowRenderer', () => {
  describe('internalToJSON', () => {
    it('throws an error if the node is invalid', () => {
      const renderer = new ReactShallowRenderer(<div />);

      expect(() =>
        // tslint:disable-next-line:no-string-literal
        renderer['internalToJSON'](({} as unknown) as ReactAnyNode)
      ).toThrow(/invalid/i);
    });
  });

  describe('resolveChildren', () => {
    it('throws an error if the node is invalid', () => {
      const renderer = new ReactShallowRenderer(<div />);

      expect(() =>
        // tslint:disable-next-line:no-string-literal
        renderer['resolveChildren'](({} as unknown) as ReactAnyNode)
      ).toThrow(/invalid/i);
    });
  });

  describe('resolveChildName', () => {
    it('throws an error if the node is invalid', () => {
      const renderer = new ReactShallowRenderer(<div />);

      expect(() =>
        // tslint:disable-next-line:no-string-literal
        renderer['resolveChildName'](({} as unknown) as ReactAnyNode)
      ).toThrow(/invalid/i);
    });
  });

  describe('invalidNodeToString', () => {
    it('returns a string representation of the invalid node', () => {
      const renderer = new ReactShallowRenderer(<div />);

      // tslint:disable:no-string-literal
      expect(renderer['invalidNodeToString']('string')).toBe('"string"');
      expect(renderer['invalidNodeToString'](null)).toBe('null');
      expect(renderer['invalidNodeToString'](undefined)).toBe('undefined');
      expect(renderer['invalidNodeToString'](123)).toBe('123');
      expect(renderer['invalidNodeToString']([])).toBe('[object Array]');
      expect(renderer['invalidNodeToString']({})).toBe('[object Object]');
      expect(renderer['invalidNodeToString'](new Error('error'))).toBe(
        '[object Error]'
      );
      // tslint:enable:no-string-literal
    });
  });
});
