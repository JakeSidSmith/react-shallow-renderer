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
});
