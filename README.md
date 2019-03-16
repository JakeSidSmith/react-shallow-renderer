# react-shallow-renderer

**A shallow renderer for React components**

This is an alternative renderer to `react-test-renderer/shallow` with full support for:

* React.memo
* React.forwardRef
* React.Fragment
* React.createContext (Provider and Consumer)
* ReactDOM.createPortal
* Functional components
* Component classes

The output of this renderer is far more informative than other existing renderers, providing context of memo wrapped components, fragments, etc.

## Install

```shell
npm i @jakesidsmith/react-shallow-renderer -S
```

## Usage

Example with jest:

```jsx
import React from 'react';
import { ReactShallowRenderer } from '@jakesidsmith/react-shallow-renderer';
import MyComponent from './path';

describe('MyComponent', () => {
  it('renders some stuff', () => {
    const renderer = new ReactShallowRenderer(<MyComponent />);

    expect(renderer).toMatchSnapshot();
  });
});
```

Newer versions of jest will automatically call the `toJSON` method of the renderer. If the version you are using doesn't you can try:

```jsx
expect(renderer.toJSON()).toMatchSnapshot();
```
