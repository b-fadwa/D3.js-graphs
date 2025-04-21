import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';

const commonSettings: TSetting[] = [
  {
    key: 'innerRadius',
    label: 'Inner Radius',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 0,
  },
  {
    key: 'outerRadius',
    label: 'Outer Radius',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 150,
  },
  {
    key: 'labelFontSize',
    label: 'Label Font Size',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 14,
  },
  {
    key: 'color',
    label: 'Color',
    type: ESetting.COLOR_PICKER,
    defaultValue: '#3b82f6ff',
  },
];

const Settings: TSetting[] = [
  {
    key: 'properties',
    label: 'Properties',
    type: ESetting.GROUP,
    components: commonSettings,
  },
  ...DEFAULT_SETTINGS,
];

export const BasicSettings: TSetting[] = [
  ...commonSettings,
  ...load(BASIC_SETTINGS).filter('style.overflow'),
];

export default Settings;
