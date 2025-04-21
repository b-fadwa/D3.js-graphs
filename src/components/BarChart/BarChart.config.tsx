import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { FaChartBar } from 'react-icons/fa';

import BarChartSettings, { BasicSettings } from './BarChart.settings';

export default {
  craft: {
    displayName: 'BarChart',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(BarChartSettings, BasicSettings),
    },
  },
  info: {
    settings: BarChartSettings,
    displayName: 'BarChart',
    exposed: true,
    icon: FaChartBar,
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
    marginTop: 20,
    marginRight: 20,
    marginBottom: 30,
    marginLeft: 45,
    axisFontSize: 16,
    color: '#3b82f6ff',
  },
} as T4DComponentConfig<IBarChartProps>;

export interface IBarChartProps extends webforms.ComponentProps {
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  color: string;
  axisFontSize: number;
}
