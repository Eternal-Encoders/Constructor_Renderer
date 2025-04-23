import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  "stories": [
    "../../../../src/**/*.mdx",
    "../../../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          App: path.resolve(__dirname, '../../../App.tsx'),
          app: path.resolve(__dirname, '../../../app'),
          assets: path.resolve(__dirname, '../../../assets'),
          entities: path.resolve(__dirname, '../../../entities'),
          helpers: path.resolve(__dirname, '../../../helpers'),
          pages: path.resolve(__dirname, '../../../pages'),
          processes: path.resolve(__dirname, '../../../processes'),
          shared: path.resolve(__dirname, '../../../shared'),
          widgets: path.resolve(__dirname, '../../../widgets'),
          features: path.resolve(__dirname, '../../../features'),
        },
      },
    });
  },
};
export default config;