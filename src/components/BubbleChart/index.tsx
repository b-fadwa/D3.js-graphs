import config, { IBubbleChartProps } from './BubbleChart.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './BubbleChart.build';
import Render from './BubbleChart.render';

const BubbleChart: T4DComponent<IBubbleChartProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

BubbleChart.craft = config.craft;
BubbleChart.info = config.info;
BubbleChart.defaultProps = config.defaultProps;

export default BubbleChart;
