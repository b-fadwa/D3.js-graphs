import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { TbChartTreemap } from 'react-icons/tb';

import TreeMapChartSettings, { BasicSettings } from './TreeMapChart.settings';

export default {
  craft: {
    displayName: 'TreeMapChart',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(TreeMapChartSettings, BasicSettings),
    },
  },
  info: {
    settings: TreeMapChartSettings,
    displayName: 'TreeMapChart',
    exposed: true,
    icon: TbChartTreemap,
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
      accept: ['object'],
    },
  },
  defaultProps: {
    padding: 1,
    leaveColor: '#8dbee4ff',
    strokeColor: '#fff',
    strokeWidth: 1,
    fontColor: '#000',
  },
} as T4DComponentConfig<ITreeMapChartProps>;

export interface ITreeMapChartProps extends webforms.ComponentProps {
  padding: number;
  leaveColor: string;
  strokeColor: string;
  strokeWidth: number;
  fontColor:string;
}
