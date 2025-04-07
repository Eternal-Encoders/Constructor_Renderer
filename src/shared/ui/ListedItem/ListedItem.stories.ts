import type { Meta, StoryObj } from '@storybook/react';

import { ListedItem } from './ListedItem';

const meta: Meta<typeof ListedItem> = {
  component: ListedItem,
};

export default meta;
type Story = StoryObj<typeof ListedItem>;
 
export const Primary: Story = {
  name: 'shared/ListedItem',
  args: {
    children: 'Текст',
    size: "small",
    type: "default",
    iconLeft: '👍',
    iconRight: '👍'
  },
};