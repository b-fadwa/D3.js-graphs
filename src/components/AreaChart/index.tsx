import config, { IAreaChartProps } from './AreaChart.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './AreaChart.build';
import Render from './AreaChart.render';

const AreaChart: T4DComponent<IAreaChartProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

AreaChart.craft = config.craft;
AreaChart.info = config.info;
AreaChart.defaultProps = config.defaultProps;

export default AreaChart;
