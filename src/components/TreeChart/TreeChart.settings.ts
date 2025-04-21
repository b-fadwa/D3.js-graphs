import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';

const commonSettings: TSetting[] = [
  {
    key: 'nodeColor',
    label: 'Node Color',
    type: ESetting.COLOR_PICKER,
    defaultValue: '#fff',
  },
  {
    key: 'linkColor',
    label: 'Link Color',
    type: ESetting.COLOR_PICKER,
    defaultValue: '#fff',
  },
  {
    key: 'fontSize',
    label: 'Font Size',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 12,
  },
  {
    key: 'marginTop',
    label: 'Margin Top',
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
    key: 'marginLeft',
    label: 'Margin Left',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 50,
  },
  {
    key: 'marginRight',
    label: 'Margin Right',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 100,
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
