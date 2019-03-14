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

  it('renders a basic function component with own and supplied children', () => {
    const element = (
      <ComponentWithChildren>
        <p>I'm a child!</p>
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
                "I'm a child!",
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
