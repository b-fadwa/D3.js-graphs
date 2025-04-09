import config, { IPieChartProps } from './PieChart.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './PieChart.build';
import Render from './PieChart.render';

const PieChart: T4DComponent<IPieChartProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

PieChart.craft = config.craft;
PieChart.info = config.info;
PieChart.defaultProps = config.defaultProps;

export default PieChart;
