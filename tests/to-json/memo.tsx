import * as React from 'react';
import { ReactShallowRenderer } from '../../src';
import { elementSymbol } from '../../src/constants';
import { compare } from '../helpers/compare';

describe('ReactShallowRenderer', () => {
  const ComponentWithChildren: React.FunctionComponent = ({ children }) => (
    <p>{children}</p>
  );

  const MemoComponentWithChildren: React.FunctionComponent = React.memo(
    ComponentWithChildren
  );

  const MemoComponentWithMemoChildren: React.FunctionComponent = React.memo(
    ({ children }) => (
      <div>
        <MemoComponentWithChildren>I have children!</MemoComponentWithChildren>
        {children}
      </div>
    )
  );

  const UnknownMemoComponent: React.FunctionComponent = React.memo(() => (
    <p>Unknown name</p>
  ));

  const ComponentWithUnknownMemoChild: React.FunctionComponent = () => (
    <div>
      <UnknownMemoComponent />
    </div>
  );

  describe('toJSON', () => {
    it('renders a memo function component with memo children', () => {
      const element = (
        <MemoComponentWithMemoChildren>
          <p>I am a child!</p>
        </MemoComponentWithMemoChildren>
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
              type: 'React.memo(ComponentWithChildren)',
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

    it('renders a memo function component with an unknown name', () => {
      const element = <ComponentWithUnknownMemoChild />;

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
              type: 'React.memo(Unknown)',
              key: null,
              ref: null,
              props: {
                children: [],
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
});
