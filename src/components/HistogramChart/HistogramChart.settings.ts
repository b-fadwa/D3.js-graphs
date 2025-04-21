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
  {
    key: 'marginTop',
    label: 'Margin top',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 20,
  },
  {
    key: 'marginLeft',
    label: 'Margin left',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 40,
  },
  {
    key: 'marginRight',
    label: 'Margin right',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 30,
  },
  {
    key: 'marginBottom',
    label: 'Margin bottom',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 30,
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
