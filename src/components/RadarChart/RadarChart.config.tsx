import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { AiOutlineRadarChart } from "react-icons/ai";

import RadarChartSettings, { BasicSettings } from './RadarChart.settings';

export default {
  craft: {
    displayName: 'RadarChart',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(RadarChartSettings, BasicSettings),
    },
  },
  info: {
    settings: RadarChartSettings,
    displayName: 'RadarChart',
    exposed: true,
    icon: AiOutlineRadarChart,
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
    margin : 50,
    strokeWidth: 2,
    dotColor: '#e73351ff',
    innerStrokeColor: '#29db25ff',
    outerStrokeColor: 'rgba(59, 130, 246, 0.3)',
    innerStrokeWidth: 2,
    outerStrokeWidth: 2,
    radarAreaColor: 'rgba(0, 123, 255, 0.3)',
    labelFontSize: 12,
    labelOffset: 20,
    showLabels: true
  },
} as T4DComponentConfig<IRadarChartProps>;

export interface IRadarChartProps extends webforms.ComponentProps {
  margin: number;
  strokeWidth:number;
  dotColor: string;
  innerStrokeColor: string;
  outerStrokeColor: string;
  innerStrokeWidth: number;
  outerStrokeWidth: number;
  radarAreaColor: string;
  showLabels: boolean;
  labelFontSize: number;
  labelOffset: number;
}
