import type { Meta, StoryObj } from '@storybook/react';

import { NestedListedItem } from './NestedListedItem';

const meta: Meta<typeof NestedListedItem> = {
  component: NestedListedItem,
};

export default meta;
type Story = StoryObj<typeof NestedListedItem>;
 
export const Primary: Story = {
  name: 'shared/NestedListedItem',
  args: {
    children: 'Текст',
    size: "small",
    type: "default",
    iconLeft: '👍',
    iconRight: '👍',
  },
};