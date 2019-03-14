import * as React from 'react';
import {
  contextSymbol,
  elementSymbol,
  fragmentSymbol,
  memoSymbol,
  portalSymbol,
  providerSymbol,
} from './constants';

export interface MemoType {
  $$type: typeof memoSymbol;
  type: React.FunctionComponent | React.Component;
  compare: null;
}

export interface ProviderType {
  $$typeof: typeof providerSymbol;
}

export interface ConsumerType {
  $$typeof: typeof contextSymbol;
}

export type ReactPrimitiveChild = string | number | null | boolean;

export type ReactAnyChild = ReactAnyNode | ReactPrimitiveChild;

export type ReactResolvedChild = ReactResolvedNode | ReactPrimitiveChild;

export interface ReactAnyNode {
  $$typeof: symbol;
  type:
    | undefined
    | string
    | symbol
    | React.FunctionComponent
    | React.Component
    | MemoType
    | ProviderType
    | ConsumerType;
  key: null | string;
  ref: React.Ref<unknown>;
  props: {
    [i: string]: unknown;
    children?: ReadonlyArray<ReactAnyChild> | ReactAnyChild;
  };
}

export interface ReactHTMLNode extends ReactAnyNode {
  $$typeof: typeof elementSymbol;
  type: string;
  ref: React.Ref<unknown>;
}

export interface ReactResolvedNode extends ReactAnyNode {
  $$typeof: typeof elementSymbol;
  type: string;
  ref: React.Ref<unknown>;
  props: {
    [i: string]: unknown;
    children: ReadonlyArray<ReactResolvedChild>;
  };
}

export interface ReactFragmentNode extends ReactAnyNode {
  $$typeof: typeof elementSymbol;
  type: typeof fragmentSymbol;
  props: { children: ReadonlyArray<ReactAnyNode> };
}

export interface ReactClassNode extends ReactAnyNode {
  $$typeof: typeof elementSymbol;
  type: React.Component;
  ref: React.Ref<unknown>;
}

export interface ReactFunctionNode extends ReactAnyNode {
  $$typeof: typeof elementSymbol;
  type: React.FunctionComponent;
  ref: React.Ref<unknown>;
}

export interface ReactMemoNode extends ReactAnyNode {
  $$typeof: typeof elementSymbol;
  type: MemoType;
}

export interface ReactPortalNode extends ReactAnyNode {
  $$typeof: typeof portalSymbol;
  type: undefined;
}

export interface ReactProviderNode extends ReactAnyNode {
  $$type: typeof elementSymbol;
  type: {
    $$typeof: typeof providerSymbol;
  };
}

export interface ReactConsumerNode extends ReactAnyNode {
  $$type: typeof elementSymbol;
  type: {
    $$typeof: typeof contextSymbol;
  };
}
