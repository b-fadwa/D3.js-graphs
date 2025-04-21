import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { FaChartBar } from "react-icons/fa6";

import BulletChartSettings, { BasicSettings } from './BulletChart.settings';

export default {
  craft: {
    displayName: 'BulletChart',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(BulletChartSettings, BasicSettings),
    },
  },
  info: {
    settings: BulletChartSettings,
    displayName: 'BulletChart',
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
    marginBottom: 20,
    marginLeft: 20,
    color: 'blue',
    showTargetLine: true,
  },
} as T4DComponentConfig<IBulletChartProps>;

export interface IBulletChartProps extends webforms.ComponentProps {
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  color: string;
  showTargetLine: boolean;
}
