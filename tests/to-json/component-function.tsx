import * as React from 'react';
import { ReactShallowRenderer } from '../../src';
import { elementSymbol } from '../../src/constants';
import { compare } from '../helpers/compare';

describe('ReactShallowRenderer', () => {
  const ComponentWithChildrenAndOwnChildren: React.FunctionComponent = ({
    children,
  }) => (
    <div>
      <p>I have children!</p>
      {children}
    </div>
  );

  const ComponentReturnsArray = ((() => [
    <p key={1}>First</p>,
    'Second',
  ]) as unknown) as React.FunctionComponent; // Casting because this shouldn't really be possible

  describe('toJSON', () => {
    it('renders a basic function component with own and supplied children', () => {
      const element = (
        <ComponentWithChildrenAndOwnChildren>
          <p>I am a child!</p>
        </ComponentWithChildrenAndOwnChildren>
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
                children: ['I have children!'],
              },
              _owner: null,
              _store: {},
            },
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
          ],
        },
        _owner: null,
        _store: {},
      });
    });

    it('renders a component that returns an array', () => {
      const element = <ComponentReturnsArray />;

      const renderer = new ReactShallowRenderer(element);

      compare(renderer.toJSON(), [
        {
          $$typeof: elementSymbol,
          type: 'p',
          key: '1',
          ref: null,
          props: {
            children: ['First'],
          },
          _owner: null,
          _store: {},
        },
        'Second',
      ]);
    });
  });
});
