import * as React from 'react';
import { ReactShallowRenderer } from '../../src';
import { elementSymbol } from '../../src/constants';
import { compare } from '../helpers/compare';

describe('ReactShallowRenderer', () => {
  const TestContext = React.createContext({ foo: 'bar' });

  const ContextRenderer = ({ foo }: { foo: string }) => <p>{foo}</p>;

  const ComponentWithConsumer: React.FunctionComponent = () => (
    <TestContext.Consumer>{ContextRenderer}</TestContext.Consumer>
  );

  const ComponentWithProvider: React.FunctionComponent = () => (
    <TestContext.Provider value={{ foo: 'provided value' }}>
      <ComponentWithConsumer />
    </TestContext.Provider>
  );

  describe('toJSON', () => {
    it('renders an inline provider', () => {
      const element = (
        <TestContext.Provider value={{ foo: 'provided value' }}>
          <ComponentWithConsumer />
        </TestContext.Provider>
      );

      const renderer = new ReactShallowRenderer(element);

      compare(renderer.toJSON(), {
        $$typeof: elementSymbol,
        type: 'React.Provider',
        key: null,
        ref: null,
        props: {
          value: {
            foo: 'provided value',
          },
          children: [
            {
              $$typeof: elementSymbol,
              type: 'ComponentWithConsumer',
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

    it('renders an inline consumer', () => {
      const element = (
        <TestContext.Consumer>{ContextRenderer}</TestContext.Consumer>
      );

      const renderer = new ReactShallowRenderer(element);

      compare(renderer.toJSON(), {
        $$typeof: elementSymbol,
        type: 'React.Consumer',
        key: null,
        ref: null,
        props: {
          children: ['[Function: ContextRenderer]'],
        },
        _owner: null,
        _store: {},
      });
    });
    it('renders a component with a provider', () => {
      const element = <ComponentWithProvider />;

      const renderer = new ReactShallowRenderer(element);

      compare(renderer.toJSON(), {
        $$typeof: elementSymbol,
        type: 'React.Provider',
        key: null,
        ref: null,
        props: {
          value: {
            foo: 'provided value',
          },
          children: [
            {
              $$typeof: elementSymbol,
              type: 'ComponentWithConsumer',
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

    it('renders a component with a consumer', () => {
      const element = <ComponentWithConsumer />;

      const renderer = new ReactShallowRenderer(element);

      compare(renderer.toJSON(), {
        $$typeof: elementSymbol,
        type: 'React.Consumer',
        key: null,
        ref: null,
        props: {
          children: ['[Function: ContextRenderer]'],
        },
        _owner: null,
        _store: {},
      });
    });
  });
});
