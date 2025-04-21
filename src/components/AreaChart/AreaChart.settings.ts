import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';

const commonSettings: TSetting[] = [
  {
    key: 'top',
    label: 'Top',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 20,
  },
  {
    key: 'right',
    label: 'Right',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 30,
  },
  {
    key: 'left',
    label: 'Left',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 40,
  },
  {
    key: 'bottom',
    label: 'Bottom',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 40,
  },
  {
    key: 'color',
    label: 'Color',
    type: ESetting.COLOR_PICKER,
    defaultValue: 'blue',
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
