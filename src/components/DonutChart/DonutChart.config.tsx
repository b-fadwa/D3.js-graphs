import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { MdDonutSmall } from "react-icons/md";

import DonutChartSettings, { BasicSettings } from './DonutChart.settings';

export default {
  craft: {
    displayName: 'DonutChart',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(DonutChartSettings, BasicSettings),
    },
  },
  info: {
    settings: DonutChartSettings,
    displayName: 'DonutChart',
    exposed: true,
    icon: MdDonutSmall ,
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
    color:'red',
    textFontSize:12
  },
} as T4DComponentConfig<IDonutChartProps>;

export interface IDonutChartProps extends webforms.ComponentProps {
  color:string;
  textFontSize?: number;
}
