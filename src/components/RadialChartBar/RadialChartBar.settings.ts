import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';

const commonSettings: TSetting[] = [
  {
    key: 'innerRadius',
    label: 'Inner radius',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 100,
  },
  {
    key: 'color',
    label: 'Color',
    type: ESetting.COLOR_PICKER,
    defaultValue: '#3b82f6',
  },
  {
    key: 'showLabels',
    label: 'Show labels',
    type: ESetting.CHECKBOX,
    defaultValue: true,
  },
  {
    key: 'fontSize',
    label: 'Font size',
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
