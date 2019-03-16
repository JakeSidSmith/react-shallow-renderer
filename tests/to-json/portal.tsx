import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactShallowRenderer } from '../../src';
import { elementSymbol } from '../../src/constants';
import { compare } from '../helpers/compare';

describe('ReactShallowRenderer', () => {
  const ComponentWithPortal: React.FunctionComponent = () =>
    ReactDOM.createPortal(<p>I am a child!</p>, document.createElement('div'));

  describe('toJSON', () => {
    it('renders a portal', () => {
      const element = ReactDOM.createPortal(
        <p>I am a child!</p>,
        document.createElement('div')
      );

      const renderer = new ReactShallowRenderer(element);

      compare(renderer.toJSON(), {
        $$typeof: elementSymbol,
        type: 'ReactDOM.Portal',
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

    it('renders a portal with no children', () => {
      const element = ReactDOM.createPortal(
        undefined,
        document.createElement('div')
      );

      const renderer = new ReactShallowRenderer(element);

      compare(renderer.toJSON(), {
        $$typeof: elementSymbol,
        type: 'ReactDOM.Portal',
        key: null,
        ref: null,
        props: {
          children: [],
        },
        _owner: null,
        _store: {},
      });
    });

    it('renders a component that returns a portal', () => {
      const element = <ComponentWithPortal />;

      const renderer = new ReactShallowRenderer(element);

      compare(renderer.toJSON(), {
        $$typeof: elementSymbol,
        type: 'ReactDOM.Portal',
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
