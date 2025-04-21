import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { GiRadialBalance } from 'react-icons/gi';

import RadialChartBarSettings, { BasicSettings } from './RadialChartBar.settings';

export default {
  craft: {
    displayName: 'RadialChartBar',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(RadialChartBarSettings, BasicSettings),
    },
  },
  info: {
    settings: RadialChartBarSettings,
    displayName: 'RadialChartBar',
    exposed: true,
    icon: GiRadialBalance,
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
    innerRadius: 100,
    color:'#3b82f6',
    showLabels: true,
    fontSize: 12
  },
} as T4DComponentConfig<IRadialChartBarProps>;

export interface IRadialChartBarProps extends webforms.ComponentProps {
  innerRadius: number;
  color: string;
  showLabels: boolean;
  fontSize: number;
}

