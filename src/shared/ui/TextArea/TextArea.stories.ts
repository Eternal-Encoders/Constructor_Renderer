import type { Meta, StoryObj } from '@storybook/react';

import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  component: TextArea,
};

export default meta;
type Story = StoryObj<typeof TextArea>;
 
export const Primary: Story = {
  name: 'shared/TextArea',
  args: {
    size: "small",
    value: 'Текст',
  },
};