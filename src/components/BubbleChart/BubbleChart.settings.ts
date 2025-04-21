import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';

const commonSettings: TSetting[] = [
  {
    key: 'circlePadding',
    label: 'Circle Padding',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 10,
  },
  {
    key: 'color',
    label: 'Color',
    type: ESetting.COLOR_PICKER,
    defaultValue: 'blue',
  },
  {
    key: 'fontSize',
    label: 'Font Size',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 12,
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
