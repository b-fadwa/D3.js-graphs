import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { GiHistogram } from "react-icons/gi";

import HistogramChartSettings, { BasicSettings } from './HistogramChart.settings';

export default {
  craft: {
    displayName: 'HistogramChart',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(HistogramChartSettings, BasicSettings),
    },
  },
  info: {
    settings: HistogramChartSettings,
    displayName: 'HistogramChart',
    exposed: true,
    icon: GiHistogram,
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
    binsCount: 10,
    color: 'blue',
    barSpacing:35,
    barStroke:'black',
    marginTop:20,
    marginRight:30,
    marginBottom:30,
    marginLeft:40
  },
} as T4DComponentConfig<IHistogramChartProps>;

export interface IHistogramChartProps extends webforms.ComponentProps {
binsCount?: number;
color:string;
barSpacing:number;
barStroke:string;
marginTop?:number;
marginRight?:number;
marginBottom?:number;
marginLeft?:number;
}
