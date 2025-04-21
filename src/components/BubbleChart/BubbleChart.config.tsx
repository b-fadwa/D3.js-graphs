import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { TbChartBubbleFilled } from 'react-icons/tb';

import BubbleChartSettings, { BasicSettings } from './BubbleChart.settings';

export default {
  craft: {
    displayName: 'BubbleChart',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(BubbleChartSettings, BasicSettings),
    },
  },
  info: {
    settings: BubbleChartSettings,
    displayName: 'BubbleChart',
    exposed: true,
    icon: TbChartBubbleFilled,
    events: [
      {
        label: 'On Click',
        value: 'onclick',
      },
      {
        label: 'On Blur',
        value: 'onblur',
      },
      {
        label: 'On Focus',
        value: 'onfocus',
      },
      {
        label: 'On MouseEnter',
        value: 'onmouseenter',
      },
      {
        label: 'On MouseLeave',
        value: 'onmouseleave',
      },
      {
        label: 'On KeyDown',
        value: 'onkeydown',
      },
      {
        label: 'On KeyUp',
        value: 'onkeyup',
      },
    ],
    datasources: {
      accept: ['array'],
    },
  },
  defaultProps: {
    circlePadding: 10,
    color: 'blue',
    fontSize: 12,
  },
} as T4DComponentConfig<IBubbleChartProps>;

export interface IBubbleChartProps extends webforms.ComponentProps {
  circlePadding: number;
  color: string;
  fontSize: number;
}
