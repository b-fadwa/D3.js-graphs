import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';

const commonSettings: TSetting[] = [
  {
    key: 'margingTop',
    label: 'Margin Top',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 20,
  },
  {
    key: 'margingRight',
    label: 'Margin Right',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 20,
  },
  {
    key: 'margingLeft',
    label: 'Margin Left',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 60,
  },
  {
    key: 'margingBottom',
    label: 'Margin Bottom',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 40,
  },
  {
    key: 'dotSize',
    label: 'Dot Size',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 6,
  },
  {
    key: 'strokeWidth',
    label: 'Stroke Width',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 2,
  },
  {
    key: 'color',
    label: 'Color',
    type: ESetting.COLOR_PICKER,
    defaultValue: '#000000',
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
