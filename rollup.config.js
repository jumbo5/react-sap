import ts from '@wessberg/rollup-plugin-ts';
import progress from 'rollup-plugin-progress';
import bundleSize from 'rollup-plugin-bundle-size'

import pkg from './package.json';

const plugins = [
  progress(),
  ts({
    tsconfig: 'tsconfig.json',
    transpileOnly: true,
    babelConfig: {
      plugins: [
        [
          'babel-plugin-styled-components',
          {
            displayName: true,
            cssProp: true,
            minify: true,
          },
        ],
      ],
    },
  }),
  bundleSize(),
];

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        name: pkg.name,
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        name: pkg.name,
        sourcemap: true,
      },
    ],
    plugins: [...plugins],
    external: [...Object.keys(pkg.peerDependencies), ...Object.keys(pkg.dependencies)],
  },
];
