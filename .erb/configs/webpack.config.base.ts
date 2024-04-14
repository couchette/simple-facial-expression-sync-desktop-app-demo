/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import TsconfigPathsPlugins from 'tsconfig-paths-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import webpackPaths from './webpack.paths';
import { dependencies as externals } from '../../release/app/package.json';

const configuration: webpack.Configuration = {
  externals: [...Object.keys(externals || {})],

  stats: 'errors-only',

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            // Remove this line to enable type checking in webpack builds
            transpileOnly: true,
            compilerOptions: {
              module: 'esnext',
            },
          },
        },
      },
    ],
  },

  output: {
    path: webpackPaths.srcPath,
    // https://github.com/webpack/webpack/issues/1114
    library: {
      type: 'commonjs2',
    },
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [webpackPaths.srcPath, 'node_modules'],
    // There is no need to add aliases here, the paths in tsconfig get mirrored
    plugins: [new TsconfigPathsPlugins()],
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.join(webpackPaths.rootPath, 'assets', 'models'),
          to: path.join(webpackPaths.distRendererPath, 'models'),
        },
        {
          from: path.join(webpackPaths.rootPath, 'assets', 'ai_models'),
          to: path.join(webpackPaths.distRendererPath, 'ai_models'),
        },
        {
          from: path.join(webpackPaths.rootPath, 'assets', 'basis'),
          to: path.join(webpackPaths.distRendererPath, 'basis'),
        },
        {
          from: path.join(webpackPaths.rootPath, 'assets', 'fileset_resolver'),
          to: path.join(webpackPaths.distRendererPath, 'fileset_resolver'),
        },
      ],
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
};

export default configuration;
