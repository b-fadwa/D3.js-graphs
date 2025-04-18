import config, { IBulletChartProps } from './BulletChart.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './BulletChart.build';
import Render from './BulletChart.render';

const BulletChart: T4DComponent<IBulletChartProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

BulletChart.craft = config.craft;
BulletChart.info = config.info;
BulletChart.defaultProps = config.defaultProps;

export default BulletChart;
