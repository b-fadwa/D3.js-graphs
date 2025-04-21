import config, { IBarChartProps } from './BarChart.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './BarChart.build';
import Render from './BarChart.render';

const BarChart: T4DComponent<IBarChartProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

BarChart.craft = config.craft;
BarChart.info = config.info;
BarChart.defaultProps = config.defaultProps;

export default BarChart;
