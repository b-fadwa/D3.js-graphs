import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { PiChartScatterLight } from 'react-icons/pi';

import ScatterChartSettings, { BasicSettings } from './ScatterChart.settings';

export default {
  craft: {
    displayName: 'ScatterChart',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(ScatterChartSettings, BasicSettings),
    },
  },
  info: {
    settings: ScatterChartSettings,
    displayName: 'ScatterChart',
    exposed: true,
    icon: PiChartScatterLight,
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
    pointColor: 'red',
    pointRadius: 5,
    marginBottom: 40,
    marginLeft: 40,
    marginRight: 30,
    marginTop: 20,
  },
} as T4DComponentConfig<IScatterChartProps>;

export interface IScatterChartProps extends webforms.ComponentProps {
  pointColor: string;
  pointRadius: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}
