import type { Meta, StoryObj } from '@storybook/react';

import { SelectorItem } from './SelectorItem';

const meta: Meta<typeof SelectorItem> = {
  component: SelectorItem,
};

export default meta;
type Story = StoryObj<typeof SelectorItem>;
 
export const Primary: Story = {
  name: 'shared/SelectorItem',
  args: {
    children: 'Текст',
    size: "small",
    type: "default",
    iconTop: '👍',
    disabled: false,
  },
};