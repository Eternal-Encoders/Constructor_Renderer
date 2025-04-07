import type { Meta, StoryObj } from '@storybook/react';

import { LockIcon } from './LockIcon';

const meta: Meta<typeof LockIcon> = {
  component: LockIcon,
};

export default meta;
type Story = StoryObj<typeof LockIcon>;
 
export const Primary: Story = {
  name: 'shared/LockIcon',
  args: {
    initialStateIsLocked: undefined
  },
};