import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';

const commonSettings: TSetting[] = [
  {
    key: 'marginTop',
    label: 'Margin Top',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 20,
  },
  {
    key: 'marginRight',
    label: 'Margin Right',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 20,
  },
  {
    key: 'marginLeft',
    label: 'Margin Left',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 20,
  },
  {
    key: 'marginBottom',
    label: 'Margin Bottom',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 20,
  },
  {
    key: 'color',
    label: 'Color',
    type: ESetting.COLOR_PICKER,
    defaultValue: 'blue',
  },
  {
    key: 'showTargetLine',
    label: 'Show Target Line',
    type: ESetting.CHECKBOX,
    defaultValue: true,
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
