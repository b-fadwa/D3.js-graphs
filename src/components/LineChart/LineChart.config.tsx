import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { FaChartLine } from "react-icons/fa6";

import LineChartSettings, { BasicSettings } from './LineChart.settings';

export default {
  craft: {
    displayName: 'LineChart',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(LineChartSettings, BasicSettings),
    },
  },
  info: {
    settings: LineChartSettings,
    displayName: 'LineChart',
    exposed: true,
    icon: FaChartLine,
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
    width:450,
    height:400,
    axisFontSize:12,
    marginBottom:30,
    marginLeft:40,
    marginRight:30,
    marginTop:20,
    color:"#000000ff"
  },
} as T4DComponentConfig<ILineChartProps>;

export interface ILineChartProps extends webforms.ComponentProps {
  color: string;
  width:number;
  height:number;
  axisFontSize:number;
  marginTop:number;
  marginBottom:number;
  marginLeft:number;
  marginRight:number;
}
