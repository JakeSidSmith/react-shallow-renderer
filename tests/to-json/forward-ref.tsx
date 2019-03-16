import * as React from 'react';
import { ReactShallowRenderer } from '../../src';
import { elementSymbol } from '../../src/constants';
import { compare } from '../helpers/compare';

describe('ReactShallowRenderer', () => {
  const ForwardRefComponentReturnsArray: React.ForwardRefExoticComponent<
    React.RefAttributes<HTMLParagraphElement>
  > = React.forwardRef((((_props: {}, ref: React.Ref<HTMLParagraphElement>) => [
    <p key={1} ref={ref}>
      First
    </p>,
    <p key={2}>Second</p>,
  ]) as unknown) as React.RefForwardingComponent<HTMLParagraphElement, {}>);

  const ComponentWithChildren: React.RefForwardingComponent<
    HTMLParagraphElement
  > = ({ children }, ref) => <p ref={ref}>{children}</p>;

  const ForwardRefComponentWithChildren: React.ForwardRefExoticComponent<
    React.PropsWithChildren<{}> & React.RefAttributes<HTMLParagraphElement>
  > = React.forwardRef(ComponentWithChildren);

  const ForwardRefComponentWithForwardRefChildren: React.ForwardRefExoticComponent<
    React.PropsWithChildren<{}> & React.RefAttributes<HTMLParagraphElement>
  > = React.forwardRef(({ children }, ref) => (
    <div>
      <ForwardRefComponentWithChildren ref={ref}>
        I have children!
      </ForwardRefComponentWithChildren>
      {children}
    </div>
  ));

  const UnknownForwardRefComponent: React.FunctionComponent = React.forwardRef(
    () => <p>Unknown name</p>
  );

  const ComponentWithUnknownForwardRefChild: React.FunctionComponent = () => (
    <div>
      <UnknownForwardRefComponent />
    </div>
  );

  describe('toJSON', () => {
    it('renders a forward red function component with forward ref children (without ref)', () => {
      const element = (
        <ForwardRefComponentWithForwardRefChildren>
          <p>I am a child!</p>
        </ForwardRefComponentWithForwardRefChildren>
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
              type: 'React.forwardRef(ComponentWithChildren)',
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

    it('renders a forward red function component with forward ref children (with ref)', () => {
      const element = (
        <ForwardRefComponentWithForwardRefChildren ref={() => null}>
          <p>I am a child!</p>
        </ForwardRefComponentWithForwardRefChildren>
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
              type: 'React.forwardRef(ComponentWithChildren)',
              key: null,
              ref: () => null,
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

    it('renders a forward ref function component with an unknown name', () => {
      const element = <ComponentWithUnknownForwardRefChild />;

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
              type: 'React.forwardRef(Unknown)',
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

    it('renders a forward ref function component that returns an array (without ref)', () => {
      const element = <ForwardRefComponentReturnsArray />;

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
        {
          $$typeof: elementSymbol,
          type: 'p',
          key: '2',
          ref: null,
          props: {
            children: ['Second'],
          },
          _owner: null,
          _store: {},
        },
      ]);
    });

    it('renders a forward ref function component that returns an array (with ref)', () => {
      const element = <ForwardRefComponentReturnsArray ref={() => null} />;

      const renderer = new ReactShallowRenderer(element);

      compare(renderer.toJSON(), [
        {
          $$typeof: elementSymbol,
          type: 'p',
          key: '1',
          ref: () => null,
          props: {
            children: ['First'],
          },
          _owner: null,
          _store: {},
        },
        {
          $$typeof: elementSymbol,
          type: 'p',
          key: '2',
          ref: null,
          props: {
            children: ['Second'],
          },
          _owner: null,
          _store: {},
        },
      ]);
    });
  });
});
