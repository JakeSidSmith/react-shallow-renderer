import * as React from 'react';
import { elementSymbol } from './constants';
import { isFunction, isHTML } from './guards';
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
    const node = this.element;

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
      const children = this.resolveChildren(node);

      if (children.length === 1) {
        return children[0];
      }

      return children;
    }

    return {
      $$typeof: elementSymbol,
      type: 'div',
      ref: null,
      key: null,
      props: {
        children: [],
      },
      _owner: null,
      _store: {},
    };
  }

  private resolveChildren(
    node: ReactAnyNode
  ): ReadonlyArray<ReactResolvedChild> {
    if (isHTML(node)) {
      return typeof node.props.children !== 'undefined'
        ? ([] as ReadonlyArray<ReactAnyChild>)
            .concat(node.props.children)
            .map(child => {
              return this.resolveChild(child);
            })
        : [];
    }

    if (isFunction(node)) {
      const children = node.type(node.props);
      return ([] as ReadonlyArray<ReactAnyChild>)
        .concat(children as ReactAnyChildren)
        .map(child => {
          return this.resolveChild(child);
        });
    }

    return [];
  }

  private resolveChild(node: ReactAnyChild): ReactResolvedChild {
    if (!node) {
      return node;
    }

    if (typeof node === 'object') {
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

    return node;
  }

  private resolveChildName(node: ReactAnyNode): string {
    if (isHTML(node)) {
      return node.type;
    }

    if (isFunction(node)) {
      return node.type.displayName || node.type.name || 'Unknown';
    }

    return node ? 'MyComponent' : 'NotMyComponent';
  }
}
