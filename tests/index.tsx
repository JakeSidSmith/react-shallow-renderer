import * as React from 'react';
import {
  ReactAnyNode,
  ReactResolvedChildren,
  ReactShallowRenderer,
} from '../src';
import { elementSymbol } from '../src/constants';

function compare(
  output: ReactResolvedChildren,
  expected: ReactResolvedChildren
) {
  expect(JSON.stringify(output, undefined, 2)).toBe(
    JSON.stringify(expected, undefined, 2)
  );
}

describe('ReactShallowRenderer', () => {
  const ComponentReturnsArray = ((() => [
    <p key={1}>First</p>,
    'Second',
  ]) as unknown) as React.FunctionComponent; // Casting because this shouldn't really be possible

  const UnknownMemoComponent: React.FunctionComponent = React.memo(() => (
    <p>Unknown name</p>
  ));

  const ComponentWithUnknownMemoChild: React.FunctionComponent = () => (
    <div>
      <UnknownMemoComponent />
    </div>
  );

  const ComponentWithChildren: React.FunctionComponent = ({ children }) => (
    <p>{children}</p>
  );

  const ComponentWithFalsyChildren: React.FunctionComponent = () => (
    <div>
      <p>{null}</p>
      <p>{false}</p>
    </div>
  );

  const MemoComponentWithChildren: React.FunctionComponent = React.memo(
    ComponentWithChildren
  );

  const ComponentWithChildrenAndOwnChildren: React.FunctionComponent = ({
    children,
  }) => (
    <div>
      <p>I have children!</p>
      {children}
    </div>
  );

  const MemoComponentWithMemoChildren: React.FunctionComponent = React.memo(
    ({ children }) => (
      <div>
        <MemoComponentWithChildren>I have children!</MemoComponentWithChildren>
        {children}
      </div>
    )
  );

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

  it('renders a component with a falsy children', () => {
    const element = <ComponentWithFalsyChildren />;

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
              children: [null],
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
              children: [false],
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
