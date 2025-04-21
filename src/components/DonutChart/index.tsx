import config, { IDonutChartProps } from './DonutChart.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './DonutChart.build';
import Render from './DonutChart.render';

const DonutChart: T4DComponent<IDonutChartProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

DonutChart.craft = config.craft;
DonutChart.info = config.info;
DonutChart.defaultProps = config.defaultProps;

export default DonutChart;
