import * as React from 'react';
import { elementSymbol } from './constants';
import { isClass, isFragment, isFunction, isHTML, isMemo } from './guards';
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

    if (isFragment(node)) {
      return this.internalToJSON({
        ...node,
        type: this.resolveChildName(node),
      });
    }

    throw new Error('Invalid React element / child');
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

    if (isMemo(node) || isFragment(node)) {
      return this.resolveChildren({
        ...node,
        type: this.resolveChildName(node),
      });
    }

    throw new Error('Invalid React element / child');
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

    if (isFunction(node) || isClass(node)) {
      return node.type.displayName || node.type.name || 'Unknown';
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

    throw new Error('Invalid React element / child');
  }
}
