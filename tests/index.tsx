import * as React from 'react';
import { ReactShallowRenderer } from '../src';
import { elementSymbol } from '../src/constants';

describe('ReactShallowRenderer', () => {
  const ComponentWithChildren: React.FunctionComponent = ({ children }) => (
    <div>
      <p>I have children!</p>
      {children}
    </div>
  );

  it('renders some simple HTML', () => {
    const element = (
      <div>
        <p>I am a child!</p>I am text!
      </div>
    );

    const renderer = new ReactShallowRenderer(element);

    expect(JSON.stringify(renderer.toJSON(), undefined, 2)).toEqual(JSON.stringify({
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
      _store: {}
    }, undefined, 2));
  });

  it('renders a basic function component with own and supplied children', () => {
    const element = (
      <ComponentWithChildren>
        <p>I am a child!</p>
      </ComponentWithChildren>
    );

    const renderer = new ReactShallowRenderer(element);

    expect(renderer.toJSON()).toEqual({
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
              children: [
                {
                  $$typeof: elementSymbol,
                  type: 'p',
                  key: null,
                  ref: null,
                  props: {
                    children: ['I have children!'],
                  },
                  _owner: null,
                  _store: {},
                },
                'I am a child!',
              ],
            },
            _owner: null,
            _store: {},
          },
        ],
      },
      _owner: null,
      _store: {},
    });
  });
});
