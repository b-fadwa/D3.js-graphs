import config, { IRadarChartProps } from './RadarChart.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './RadarChart.build';
import Render from './RadarChart.render';

const RadarChart: T4DComponent<IRadarChartProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

RadarChart.craft = config.craft;
RadarChart.info = config.info;
RadarChart.defaultProps = config.defaultProps;

export default RadarChart;
