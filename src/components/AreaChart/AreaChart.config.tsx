import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { FaChartArea } from 'react-icons/fa';

import AreaChartSettings, { BasicSettings } from './AreaChart.settings';

export default {
  craft: {
    displayName: 'AreaChart',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(AreaChartSettings, BasicSettings),
    },
  },
  info: {
    settings: AreaChartSettings,
    displayName: 'AreaChart',
    exposed: true,
    icon: FaChartArea,
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
    top: 20,
    right: 30,
    bottom: 40,
    left: 40,
    color:'blue'
  },
} as T4DComponentConfig<IAreaChartProps>;

export interface IAreaChartProps extends webforms.ComponentProps {
  top: number;
  right: number;
  bottom: number;
  left: number;
  color:string
}
