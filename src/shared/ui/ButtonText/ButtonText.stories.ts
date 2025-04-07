import type { Meta, StoryObj } from '@storybook/react';

import { ButtonText } from './ButtonText';

const meta: Meta<typeof ButtonText> = {
  component: ButtonText,
};

export default meta;
type Story = StoryObj<typeof ButtonText>;
 
export const Primary: Story = {
  name: 'shared/ButtonText',
  args: {
    children: 'Текст',
    size: 'small',
    type: 'default',
    iconLeft: '👍',
    disabled: false
  },
};