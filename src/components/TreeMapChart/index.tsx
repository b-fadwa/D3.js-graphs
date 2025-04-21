import config, { ITreeMapChartProps } from './TreeMapChart.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './TreeMapChart.build';
import Render from './TreeMapChart.render';

const TreeMapChart: T4DComponent<ITreeMapChartProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

TreeMapChart.craft = config.craft;
TreeMapChart.info = config.info;
TreeMapChart.defaultProps = config.defaultProps;

export default TreeMapChart;
