import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { MdOutlineAccountTree } from "react-icons/md";

import TreeChartSettings, { BasicSettings } from './TreeChart.settings';

export default {
  craft: {
    displayName: 'TreeChart',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(TreeChartSettings, BasicSettings),
    },
  },
  info: {
    settings: TreeChartSettings,
    displayName: 'TreeChart',
    exposed: true,
    icon: MdOutlineAccountTree,
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
    nodeColor:'blue',
    linkColor:'red',
    fontSize:12,
    marginTop:20,
    marginRight:100,
    marginBottom:20,
    marginLeft:100,
    strokeWidth:1
  },
} as T4DComponentConfig<ITreeChartProps>;

export interface ITreeChartProps extends webforms.ComponentProps {
  nodeColor: string;
  linkColor: string;
  fontSize: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  strokeWidth: number;
}
