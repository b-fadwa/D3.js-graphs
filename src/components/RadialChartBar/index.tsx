import config, { IRadialChartBarProps } from './RadialChartBar.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './RadialChartBar.build';
import Render from './RadialChartBar.render';

const RadialChartBar: T4DComponent<IRadialChartBarProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

RadialChartBar.craft = config.craft;
RadialChartBar.info = config.info;
RadialChartBar.defaultProps = config.defaultProps;

export default RadialChartBar;
