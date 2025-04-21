import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { FaChartPie } from 'react-icons/fa';

import PieChartSettings, { BasicSettings } from './PieChart.settings';

export default {
  craft: {
    displayName: 'PieChart',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(PieChartSettings, BasicSettings),
    },
  },
  info: {
    settings: PieChartSettings,
    displayName: 'PieChart',
    exposed: true,
    icon: FaChartPie,
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
    innerRadius: 0,
    outerRadius: 150,
    labelFontSize: 14,
    color: '#3b82f6ff',
  },
} as T4DComponentConfig<IPieChartProps>;

export interface IPieChartProps extends webforms.ComponentProps {
  innerRadius: number;
  outerRadius: number;
  labelFontSize: number;
  color: string;
}
