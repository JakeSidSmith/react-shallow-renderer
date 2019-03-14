import * as React from 'react';
import { elementSymbol } from './constants';
import { isHTML } from './guards';
import {
  ReactAnyChild,
  ReactAnyNode,
  ReactResolvedChild,
  ReactResolvedNode,
} from './types';

export class ReactShallowRenderer {
  private element: ReactAnyNode;

  public constructor(element: React.ReactElement) {
    this.element = element as ReactAnyNode;
  }

  public toJSON(): ReactResolvedNode {
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

    return {
      $$typeof: elementSymbol,
      type: 'div',
      ref: null,
      key: null,
      props: {
        children: [],
      },
      _owner: null,
      _store: {}
    };
  }

  private resolveChildren(
    node: ReactAnyNode
  ): ReadonlyArray<ReactResolvedChild> {
    if (isHTML(node)) {
      return typeof node.props.children !== 'undefined'
        ? ([] as ReadonlyArray<ReactAnyChild>).concat(node.props.children).map(child => {
            return this.resolveChild(child);
          })
        : [];
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
        type: this.resolveName(node),
        props: {
          ...node.props,
          children: this.resolveChildren(node),
        },
      };
    }

    return node;
  }

  private resolveName(node: ReactAnyNode): string {
    if (isHTML(node)) {
      return node.type;
    }

    return node ? 'MyComponent' : 'NotMyComponent';
  }
}
