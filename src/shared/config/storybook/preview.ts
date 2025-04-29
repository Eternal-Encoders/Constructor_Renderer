import type { Preview } from '@storybook/react';
import 'app/styles/index.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        // 👇 Default values
        { name: 'Dark', value: '#333' },
        { name: 'Light', value: '#F7F9F2' },
        // 👇 Add your own
        { name: 'Maroon', value: '#400' },
        { name: 'Aliceblue', value: 'aliceblue' },
        { name: 'Aquamarine', value: 'aquamarine' },
      ],
      // 👇 Specify which background is shown by default
      default: 'Aquamarine',
    },
  },
};

export default preview;