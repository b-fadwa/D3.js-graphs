import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';

const commonSettings: TSetting[] = [
  {
    key: 'width',
    label: 'Width',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 450,
  },
  {
    key: 'height',
    label: 'Height',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 400,
  },
  { key: 'axisFontSize', label: 'Axis font size', type: ESetting.NUMBER_FIELD, defaultValue: 12 },
  { key: 'marginTop', label: 'Margin top', type: ESetting.NUMBER_FIELD, defaultValue: 20 },
  { key: 'marginBottom', label: 'Margin bottom', type: ESetting.NUMBER_FIELD, defaultValue: 30 },
  { key: 'marginLeft', label: 'Margin left', type: ESetting.NUMBER_FIELD, defaultValue: 40 },
  { key: 'marginRight', label: 'Margin right', type: ESetting.NUMBER_FIELD, defaultValue: 30 },
  { key: 'color', label: 'Color', type: ESetting.COLOR_PICKER , defaultValue:"#000000ff" },

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
