import config, { IScatterChartProps } from './ScatterChart.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './ScatterChart.build';
import Render from './ScatterChart.render';

const ScatterChart: T4DComponent<IScatterChartProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

ScatterChart.craft = config.craft;
ScatterChart.info = config.info;
ScatterChart.defaultProps = config.defaultProps;

export default ScatterChart;
