import ts from '@wessberg/rollup-plugin-ts';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import progress from 'rollup-plugin-progress';
import resolve from '@rollup/plugin-node-resolve';
import svgr from '@svgr/rollup';
import url from '@rollup/plugin-url';

import pkg from './package.json';

const plugins = [
  progress(),
  postcss({
    extract: false,
    modules: true,
    autoModules: true,
    minimize: true,
  }),
  image(),
  url(),
  svgr(),

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
  resolve({ preferBuiltins: false }),
  commonjs(),
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
