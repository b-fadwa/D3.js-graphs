import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';

const commonSettings: TSetting[] = [
  {
    key: 'width',
    label: 'Width',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 300,
  },
  {
    key: 'height',
    label: 'Height',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 300,
  },
  {
    key: 'textFontSize',
    label: 'Text Font Size',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 12,
  },
  {
    key: 'color',
    label: 'Color',
    type: ESetting.COLOR_PICKER,
    defaultValue: 'red',
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
