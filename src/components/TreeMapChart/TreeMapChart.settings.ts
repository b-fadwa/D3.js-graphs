import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';

const commonSettings: TSetting[] = [
  {
    key: 'padding',
    label: 'Padding',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 1,
  },
  {
    key: 'leaveColor',
    label: 'Leave Color',
    type: ESetting.COLOR_PICKER,
    defaultValue: '#8dbee4ff',
  },
  {
    key: 'strokeWidth',
    label: 'Stroke Width',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 1,
  },
  {
    key: 'strokeColor',
    label: 'Stroke Color',
    type: ESetting.COLOR_PICKER,
    defaultValue: '#fff',
  },
  {
    key: 'fontColor',
    label: 'Font Color',
    type: ESetting.COLOR_PICKER,
    defaultValue: '#000',
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
