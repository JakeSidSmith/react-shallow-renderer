import * as React from 'react';
import { elementSymbol } from './constants';
import {
  isClass,
  isConsumer,
  isFragment,
  isFunction,
  isHTML,
  isMemo,
  isPortal,
  isProvider,
} from './guards';
import {
  ReactAnyChild,
  ReactAnyChildren,
  ReactAnyNode,
  ReactResolvedChild,
  ReactResolvedChildren,
} from './types';

export class ReactShallowRenderer {
  private element: ReactAnyNode;

  public constructor(element: React.ReactElement) {
    this.element = element as ReactAnyNode;
  }

  public toJSON(): ReactResolvedChildren {
    return this.internalToJSON(this.element);
  }

  private internalToJSON(node: ReactAnyNode): ReactResolvedChildren {
    if (isHTML(node)) {
      return {
        ...node,
        props: {
          ...node.props,
          children: this.resolveChildren(node),
        },
      };
    }

    if (isFunction(node)) {
      const rendered = node.type(node.props) as ReactAnyChildren;
      const children = ([] as ReadonlyArray<ReactAnyChild>)
        .concat(rendered)
        .map(child => {
          return this.resolveChild(child);
        });

      if (children.length === 1) {
        return children[0];
      }

      return children;
    }

    if (isClass(node)) {
      const rendered = new node.type(node.props).render() as ReactAnyChildren;
      const children = ([] as ReadonlyArray<ReactAnyChild>)
        .concat(rendered)
        .map(child => {
          return this.resolveChild(child);
        });

      if (children.length === 1) {
        return children[0];
      }

      return children;
    }

    if (isMemo(node)) {
      return this.internalToJSON({
        ...node,
        type: node.type.type,
      });
    }

    if (isFragment(node) || isProvider(node) || isConsumer(node)) {
      return this.internalToJSON({
        ...node,
        type: this.resolveChildName(node),
      });
    }

    if (isPortal(node)) {
      return this.resolveChild(node);
    }

    throw new Error(this.constructInvalidNodeMessage(node));
  }

  private resolveChildren(
    node: ReactAnyNode
  ): ReadonlyArray<ReactResolvedChild> {
    if (isHTML(node)) {
      return typeof node.props.children !== 'undefined'
        ? ([] as ReadonlyArray<ReactAnyChild>)
            .concat(node.props.children)
            .map(child => this.resolveChild(child))
        : [];
    }

    if (isFunction(node) || isClass(node)) {
      return typeof node.props.children !== 'undefined'
        ? ([] as ReadonlyArray<ReactAnyChild>)
            .concat(node.props.children)
            .map(child => this.resolveChild(child))
        : [];
    }

    if (
      isMemo(node) ||
      isFragment(node) ||
      isProvider(node) ||
      isConsumer(node)
    ) {
      return this.resolveChildren({
        ...node,
        type: this.resolveChildName(node),
      });
    }

    if (isPortal(node)) {
      return typeof node.children !== 'undefined'
        ? ([] as ReadonlyArray<ReactAnyChild>)
            .concat(node.children)
            .map(child => this.resolveChild(child))
        : [];
    }

    throw new Error(this.constructInvalidNodeMessage(node));
  }

  private resolveChild(node: ReactAnyChild): ReactResolvedChild {
    if (!node) {
      return node;
    }

    if (typeof node === 'object') {
      if (isPortal(node)) {
        return {
          $$typeof: elementSymbol,
          type: this.resolveChildName(node),
          key: null,
          ref: null,
          props: {
            children: this.resolveChildren(node),
          },
          _owner: null,
          _store: {},
        };
      }

      return {
        ...node,
        $$typeof: elementSymbol,
        type: this.resolveChildName(node),
        props: {
          ...node.props,
          children: this.resolveChildren(node),
        },
      };
    }

    if (typeof node === 'function') {
      return `[Function: ${this.resolveFunctionName(node)}]`;
    }

    return node;
  }

  private resolveChildName(node: ReactAnyNode): string {
    if (isHTML(node)) {
      return node.type;
    }

    if (isFunction(node) || isClass(node)) {
      return this.resolveFunctionName(node.type);
    }

    if (isMemo(node)) {
      return `React.memo(${this.resolveChildName({
        ...node,
        type: node.type.type,
      })})`;
    }

    if (isFragment(node)) {
      return 'React.Fragment';
    }

    if (isProvider(node)) {
      return 'React.Provider';
    }

    if (isConsumer(node)) {
      return 'React.Consumer';
    }

    if (isPortal(node)) {
      return 'ReactDOM.Portal';
    }

    throw new Error(this.constructInvalidNodeMessage(node));
  }

  private resolveFunctionName(
    fn: React.FunctionComponent | React.ComponentClass
  ) {
    return fn.displayName || fn.name || 'Unknown';
  }

  private constructInvalidNodeMessage(node: ReactAnyNode): string {
    return `Invalid or unsupported React element / child: ${Object.prototype.toString.call(
      node
    )}`;
  }
}
