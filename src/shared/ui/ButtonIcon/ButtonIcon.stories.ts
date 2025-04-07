import type { Meta, StoryObj } from '@storybook/react';

import { ButtonIcon } from './ButtonIcon';

const meta: Meta<typeof ButtonIcon> = {
  component: ButtonIcon,
};

export default meta;
type Story = StoryObj<typeof ButtonIcon>;
 
export const Primary: Story = {
  name: 'shared/ButtonIcon',
  args: {
    children: '👍',
    size: 'tiny',
    type: 'default',
    disabled: false
  },
};