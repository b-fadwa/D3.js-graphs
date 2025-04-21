import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';

const commonSettings: TSetting[] = [
  {
    key: 'binsCount',
    label: 'Bins Count',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 10,
  },
  {
    key: 'barSpacing',
    label: 'Bar spacing',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 35,
  },
  {
    key: 'color',
    label: 'Bar color',
    type: ESetting.COLOR_PICKER,
    defaultValue: '#ff0000',
  },
  {
    key: 'barStroke',
    label: 'Stroke color',
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
