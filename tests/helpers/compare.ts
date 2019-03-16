import { ReactResolvedChildren } from '../../src';

export function compare(
  output: ReactResolvedChildren,
  expected: ReactResolvedChildren
) {
  expect(JSON.stringify(output, undefined, 2)).toBe(
    JSON.stringify(expected, undefined, 2)
  );
}
