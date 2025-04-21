import config, { IHistogramChartProps } from './HistogramChart.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './HistogramChart.build';
import Render from './HistogramChart.render';

const HistogramChart: T4DComponent<IHistogramChartProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

HistogramChart.craft = config.craft;
HistogramChart.info = config.info;
HistogramChart.defaultProps = config.defaultProps;

export default HistogramChart;
