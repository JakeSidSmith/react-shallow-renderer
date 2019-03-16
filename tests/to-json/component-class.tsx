import * as React from 'react';
import { ReactShallowRenderer } from '../../src';
import { elementSymbol } from '../../src/constants';
import { compare } from '../helpers/compare';

describe('ReactShallowRenderer', () => {
  class ComponentClass extends React.Component {
    public render() {
      return <p>Component class child</p>;
    }
  }

  // tslint:disable-next-line:max-classes-per-file
  class ComponentClassWithDisplayName extends React.Component {
    public static displayName = 'DisplayName';

    public render() {
      return <p>Component class (with display name) child</p>;
    }
  }

  // tslint:disable-next-line:max-classes-per-file
  class ComponentClassWithSuppliedChildren extends React.Component {
    public render() {
      return <p>{this.props.children}</p>;
    }
  }

  // tslint:disable-next-line:max-classes-per-file
  class ComponentClassReturnsArray extends React.Component {
    public render() {
      return [<p key={1}>First</p>, 'Second'];
    }
  }

  const ComponentWithClassChildren: React.FunctionComponent = () => (
    <div>
      <ComponentClass />
      <ComponentClassWithDisplayName />
    </div>
  );

  const ComponentWithComponentClassSuppliedChildren: React.FunctionComponent = () => (
    <div>
      <ComponentClassWithSuppliedChildren>
        I am a child!
      </ComponentClassWithSuppliedChildren>
    </div>
  );

  describe('toJSON', () => {
    it('renders a component class that returns an array', () => {
      const element = <ComponentClassReturnsArray />;

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

    it('renders a component class', () => {
      const element = <ComponentClass />;

      const renderer = new ReactShallowRenderer(element);

      compare(renderer.toJSON(), {
        $$typeof: elementSymbol,
        type: 'p',
        key: null,
        ref: null,
        props: {
          children: ['Component class child'],
        },
        _owner: null,
        _store: {},
      });
    });

    it('renders a component class with a display name', () => {
      const element = <ComponentClassWithDisplayName />;

      const renderer = new ReactShallowRenderer(element);

      compare(renderer.toJSON(), {
        $$typeof: elementSymbol,
        type: 'p',
        key: null,
        ref: null,
        props: {
          children: ['Component class (with display name) child'],
        },
        _owner: null,
        _store: {},
      });
    });

    it('renders a component with component class children', () => {
      const element = <ComponentWithClassChildren />;

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
              type: 'ComponentClass',
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
              type: 'DisplayName',
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

    it('renders a component class with supplied children', () => {
      const element = (
        <ComponentClassWithSuppliedChildren>
          I am a child!
        </ComponentClassWithSuppliedChildren>
      );

      const renderer = new ReactShallowRenderer(element);

      compare(renderer.toJSON(), {
        $$typeof: elementSymbol,
        type: 'p',
        key: null,
        ref: null,
        props: {
          children: ['I am a child!'],
        },
        _owner: null,
        _store: {},
      });
    });

    it('renders a component with a component class child with supplied children', () => {
      const element = <ComponentWithComponentClassSuppliedChildren />;

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
              type: 'ComponentClassWithSuppliedChildren',
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
