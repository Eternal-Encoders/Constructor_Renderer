import type { Meta, StoryObj } from '@storybook/react';

import { Text, TextTheme } from './Text';

const meta: Meta<typeof Text> = {
  component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;
 
export const Primary: Story = {
  name: 'shared/Text_Primary',
  args: {
    title: 'Title lorem ipsum',
    text: 'Description lorem ipsum lorem ipsum',
  },
};

export const Error: Story = {
  name: 'shared/Text_Error',
  args: {
    title: 'Title lorem ipsum',
    text: 'Description lorem ipsum lorem ipsum',
    theme: TextTheme.ERROR,
  },
};

export const onlyTitle: Story = {
  name: 'shared/Text_OnlyTitle',
  args: {
    title: 'Title lorem ipsum',
  },
};

export const onlyText: Story = {
  name: 'shared/Text_OnlyText',
  args: {
    text: 'Description lorem ipsum lorem ipsum',
  },
};