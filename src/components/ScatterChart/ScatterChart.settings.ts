import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';

const commonSettings: TSetting[] = [
  {
    key: 'pointColor',
    label: 'Point Color',
    type: ESetting.COLOR_PICKER ,
    defaultValue: 'red',
  },
  {
    key: 'pointRadius',
    label: 'Point Radius',
    type: ESetting.NUMBER_FIELD ,
    defaultValue: 5,
  },
  {
    key: 'marginTop',
    label: 'Margin Top',
    type: ESetting.NUMBER_FIELD ,
    defaultValue: 20,
  },
  {
    key: 'marginRight',
    label: 'Margin Right',
    type: ESetting.NUMBER_FIELD ,
    defaultValue: 30,
  },
  {
    key: 'marginBottom',
    label: 'Margin Bottom',
    type: ESetting.NUMBER_FIELD ,
    defaultValue: 40,
  },
  {
    key: 'marginLeft',
    label: 'Margin Left',
    type: ESetting.NUMBER_FIELD ,
    defaultValue: 40,
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
