import {
  contextSymbol,
  elementSymbol,
  fragmentSymbol,
  MATCHES_CLASS,
  memoSymbol,
  portalSymbol,
  providerSymbol,
} from './constants';
import {
  ReactAnyNode,
  ReactClassNode,
  ReactConsumerNode,
  ReactDOMPortalNode,
  ReactFragmentNode,
  ReactFunctionNode,
  ReactHTMLNode,
  ReactMemoNode,
  ReactProviderNode,
} from './types';

export function isFragment(node: ReactAnyNode): node is ReactFragmentNode {
  return node.$$typeof === elementSymbol && node.type === fragmentSymbol;
}

export function isHTML(node: ReactAnyNode): node is ReactHTMLNode {
  return node.$$typeof === elementSymbol && typeof node.type === 'string';
}

export function isClass(node: ReactAnyNode): node is ReactClassNode {
  return (
    node.$$typeof === elementSymbol &&
    typeof node.type === 'function' &&
    MATCHES_CLASS.test(Object.toString.call(node.type))
  );
}

export function isFunction(node: ReactAnyNode): node is ReactFunctionNode {
  return (
    node.$$typeof === elementSymbol &&
    typeof node.type === 'function' &&
    !MATCHES_CLASS.test(Object.toString.call(node.type))
  );
}

export function isMemo(node: ReactAnyNode): node is ReactMemoNode {
  return (
    node.$$typeof === elementSymbol &&
    typeof node.type === 'object' &&
    '$$typeof' in node.type &&
    node.type.$$typeof === memoSymbol
  );
}

export function isProvider(node: ReactAnyNode): node is ReactProviderNode {
  return (
    node.$$typeof === elementSymbol &&
    typeof node.type === 'object' &&
    '$$typeof' in node.type &&
    node.type.$$typeof === providerSymbol
  );
}

export function isConsumer(node: ReactAnyNode): node is ReactConsumerNode {
  return (
    node.$$typeof === elementSymbol &&
    typeof node.type === 'object' &&
    '$$typeof' in node.type &&
    node.type.$$typeof === contextSymbol
  );
}

export function isPortal(node: ReactAnyNode): node is ReactDOMPortalNode {
  return node.$$typeof === portalSymbol;
}
