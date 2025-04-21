import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { CiLollipop } from 'react-icons/ci';

import LollipopChartSettings, { BasicSettings } from './LollipopChart.settings';

export default {
  craft: {
    displayName: 'LollipopChart',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(LollipopChartSettings, BasicSettings),
    },
  },
  info: {
    settings: LollipopChartSettings,
    displayName: 'LollipopChart',
    exposed: true,
    icon: CiLollipop,
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
    margingTop: 20,
    margingRight: 20,
    margingBottom: 40,
    margingLeft: 60,
    color: '#000000',
    dotSize: 6,
    strokeWidth: 2,
  },
} as T4DComponentConfig<ILollipopChartProps>;

export interface ILollipopChartProps extends webforms.ComponentProps {
  margingTop: number;
  margingRight: number;
  margingBottom: number;
  margingLeft: number;
  color: string;
  dotSize: number;
  strokeWidth: number;
}
