import config, { ILollipopChartProps } from './LollipopChart.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './LollipopChart.build';
import Render from './LollipopChart.render';

const LollipopChart: T4DComponent<ILollipopChartProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

LollipopChart.craft = config.craft;
LollipopChart.info = config.info;
LollipopChart.defaultProps = config.defaultProps;

export default LollipopChart;
