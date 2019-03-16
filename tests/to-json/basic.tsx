import * as React from 'react';
import { ReactShallowRenderer } from '../../src';
import { elementSymbol } from '../../src/constants';
import { compare } from '../helpers/compare';

describe('ReactShallowRenderer', () => {
  describe('toJSON', () => {
    it('renders some simple HTML', () => {
      const element = (
        <div>
          <p>I am a child!</p>I am text!
        </div>
      );

      const renderer = new ReactShallowRenderer(element);

      compare(renderer.toJSON(), {
        $$typeof: elementSymbol,
        type: 'div',
        key: null,
        ref: null,
        props: {
          children: [
            {
              $$typeof: elementSymbol,
              type: 'p',
              key: null,
              ref: null,
              props: {
                children: ['I am a child!'],
              },
              _owner: null,
              _store: {},
            },
            'I am text!',
          ],
        },
        _owner: null,
        _store: {},
      });
    });
  });
});
