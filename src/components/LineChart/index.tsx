import config, { ILineChartProps } from './LineChart.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './LineChart.build';
import Render from './LineChart.render';

const LineChart: T4DComponent<ILineChartProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

LineChart.craft = config.craft;
LineChart.info = config.info;
LineChart.defaultProps = config.defaultProps;

export default LineChart;
