import config, { ITreeChartProps } from './TreeChart.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './TreeChart.build';
import Render from './TreeChart.render';

const TreeChart: T4DComponent<ITreeChartProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

TreeChart.craft = config.craft;
TreeChart.info = config.info;
TreeChart.defaultProps = config.defaultProps;

export default TreeChart;
