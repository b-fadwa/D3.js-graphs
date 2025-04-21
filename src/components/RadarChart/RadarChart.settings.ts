import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';

const commonSettings: TSetting[] = [
  {
    key: 'margin',
    label: 'Margin',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 50,
  },
  {
    key: 'strokeWidth',
    label: 'Stroke Width',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 2,
  },
  {
    key: 'innerStrokeWidth',
    label: 'Inner stroke Width',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 2,
  },
  {
    key: 'outerStrokeWidth',
    label: 'Outer stroke Width',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 2,
  },
  {
    key: 'showLabels',
    label: 'Show Labels',
    type: ESetting.CHECKBOX,
    defaultValue: true,
  },
  {
    key: 'labelFontSize',
    label: 'Label Font Size',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 12,
  },
  {
    key: 'labelOffset',
    label: 'Label Offset',
    type: ESetting.NUMBER_FIELD,
    defaultValue: 20,
  },
  {
    key: 'dotColor',
    label: 'Dot Color',
    type: ESetting.COLOR_PICKER,
    defaultValue: '#e73351ff',
  },
  {
    key: 'innerStrokeColor',
    label: 'Inner stroke Color',
    type: ESetting.COLOR_PICKER,
    defaultValue: '#29db25ff',
  },
  {
    key: 'outerStrokeColor',
    label: 'Outer stroke Color',
    type: ESetting.COLOR_PICKER,
    defaultValue: 'rgba(59, 130, 246, 0.3)',
  },
  {
    key: 'radarAreaColor',
    label: 'Radar Area Color',
    type: ESetting.COLOR_PICKER,
    defaultValue: 'rgba(0, 123, 255, 0.3)',
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
