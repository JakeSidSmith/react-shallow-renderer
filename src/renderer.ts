import * as React from 'react';
import { elementSymbol } from './constants';
import { isHTML } from './guards';
import { ReactAnyNode, ReactHTMLNode } from './types';

export class ReactShallowRenderer {
  private element: ReactAnyNode;

  public constructor(element: React.ReactElement) {
    this.element = element as ReactAnyNode;
  }

  public toJSON(): ReactHTMLNode {
    if (isHTML(this.element)) {
      return this.element;
    }

    return {
      $$typeof: elementSymbol,
      type: 'div',
      ref: null,
      key: null,
      props: {},
    };
  }
}
