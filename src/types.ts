import * as React from 'react';
import {
  contextSymbol,
  elementSymbol,
  forwardRefSymbol,
  fragmentSymbol,
  memoSymbol,
  portalSymbol,
  providerSymbol,
} from './constants';

export interface MemoType {
  $$typeof: typeof memoSymbol;
  type: React.FunctionComponent | React.ComponentClass;
  compare: null;
}

export interface ProviderType {
  $$typeof: typeof providerSymbol;
}

export interface ConsumerType {
  $$typeof: typeof contextSymbol;
}

export interface ForwardRefType {
  $$typeof: typeof forwardRefSymbol;
  render: React.FunctionComponent;
  displayName?: string;
}

export type ReactPrimitiveChild =
  | string
  | number
  | null
  | boolean
  | React.FunctionComponent
  | React.ComponentClass;

export type ReactAnyChild = ReactAnyNode | ReactPrimitiveChild;
export type ReactAnyChildren = ReadonlyArray<ReactAnyChild> | ReactAnyChild;

export type ReactResolvedChild = ReactResolvedNode | ReactPrimitiveChild;
export type ReactResolvedChildren =
  | ReadonlyArray<ReactResolvedChild>
  | ReactResolvedChild;

export type ReactAnyNode = ReactElementNode | ReactDOMPortalNode;

export interface ReactElementNode {
  $$typeof: typeof elementSymbol;
  type:
    | undefined
    | string
    | symbol
    | React.FunctionComponent
    | React.ComponentClass
    | MemoType
    | ProviderType
    | ConsumerType
    | ForwardRefType;
  key: null | string;
  ref: React.Ref<unknown>;
  props: {
    [i: string]: unknown;
    children?: ReactAnyChildren;
  };
  _owner: unknown;
  _store: unknown;
}

export interface ReactHTMLNode extends ReactElementNode {
  type: string;
  ref: React.Ref<unknown>;
}

export interface ReactResolvedNode extends ReactElementNode {
  type: string;
  ref: React.Ref<unknown>;
  props: {
    [i: string]: unknown;
    children: ReadonlyArray<ReactResolvedChild>;
  };
  _owner: unknown;
  _store: unknown;
}

export interface ReactFragmentNode extends ReactElementNode {
  type: typeof fragmentSymbol;
  props: { children: ReadonlyArray<ReactAnyNode> };
}

export interface ReactClassNode extends ReactElementNode {
  type: React.ComponentClass;
  ref: React.Ref<unknown>;
}

export interface ReactFunctionNode extends ReactElementNode {
  type: React.FunctionComponent;
  ref: React.Ref<unknown>;
}

export interface ReactMemoNode extends ReactElementNode {
  type: MemoType;
}

export interface ReactProviderNode extends ReactElementNode {
  type: ProviderType;
}

export interface ReactConsumerNode extends ReactElementNode {
  type: ConsumerType;
}

export interface ReactForwardRefNode extends ReactElementNode {
  type: ForwardRefType;
}

export interface ReactDOMPortalNode {
  $$typeof: typeof portalSymbol;
  key: null | string;
  children?: ReactAnyChildren;
  containerInfo: {};
  implementation: null;
}
