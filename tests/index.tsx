import * as React from 'react';
import { ReactShallowRenderer } from '../src';
import { elementSymbol } from '../src/constants';
import { compare } from './helpers/compare';

describe('ReactShallowRenderer', () => {
  const ComponentWithFragment: React.FunctionComponent = () => (
    <>
      <p>First</p>
      <p>Second</p>
    </>
  );

  const MemoComponentWithFragment: React.FunctionComponent = React.memo(
    ComponentWithFragment
  );

  const ComponentWithFragmentChildren: React.FunctionComponent = () => (
    <div>
      <ComponentWithFragment />
      <MemoComponentWithFragment />
    </div>
  );

  describe('toJSON', () => {
    it('renders a component with a fragment', () => {
      const element = <ComponentWithFragment />;

      const renderer = new ReactShallowRenderer(element);

      compare(renderer.toJSON(), {
        $$typeof: elementSymbol,
        type: 'React.Fragment',
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
                children: ['First'],
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
                children: ['Second'],
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

    it('renders a memo component with a fragment', () => {
      const element = <MemoComponentWithFragment />;

      const renderer = new ReactShallowRenderer(element);

      compare(renderer.toJSON(), {
        $$typeof: elementSymbol,
        type: 'React.Fragment',
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
                children: ['First'],
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
                children: ['Second'],
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

    it('renders a component with fragment children', () => {
      const element = <ComponentWithFragmentChildren />;

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
              type: 'ComponentWithFragment',
              key: null,
              ref: null,
              props: {
                children: [],
              },
              _owner: null,
              _store: {},
            },
            {
              $$typeof: elementSymbol,
              type: 'React.memo(ComponentWithFragment)',
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

    it('renders an inline fragment', () => {
      const element = (
        <>
          <p>I am a child!</p>
        </>
      );

      const renderer = new ReactShallowRenderer(element);

      compare(renderer.toJSON(), {
        $$typeof: elementSymbol,
        type: 'React.Fragment',
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
          ],
        },
        _owner: null,
        _store: {},
      });
    });
  });
});
