import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';

import { IBubbleChartProps } from './BubbleChart.config';
import * as d3 from 'd3';

const BubbleChart: FC<IBubbleChartProps> = ({
  circlePadding,
  color,
  fontSize,
  style,
  className,
  classNames = [],
}) => {
  const { connect } = useRenderer();
  const [value, setValue] = useState<any[]>([]);
  const {
    sources: { datasource: ds },
  } = useSources();

  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ds) return;

    const listener = async (/* event */) => {
      const v = await ds.getValue<any[]>();
      setValue(v);
    };

    listener();

    ds.addListener('changed', listener);

    return () => {
      ds.removeListener('changed', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ds]);

  useEffect(() => {
    if (!chartRef.current || !value) return;

    d3.select(chartRef.current).selectAll('*').remove();

    const width = style ? parseInt(style.width as any, 10) : 600;
    const height = style ? parseInt(style.height as any, 10) : 400;

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const pack = d3.pack().size([width, height]).padding(circlePadding);

    const generateGradientColors = (baseColor: string, steps: number): string[] => {
      const darker = d3.color(baseColor)?.darker(1.5).formatHex() ?? baseColor;
      const interpolator = d3.interpolateLab(darker, baseColor);
      return Array.from({ length: steps }, (_, i) => interpolator(i / (steps - 1)));
    };

    const gradientColors = color
      ? generateGradientColors(color as any, value.length)
      : d3.schemeCategory10;

    const bubbleRoot = d3.hierarchy({ children: value }).sum((d: any) => d.value);

    const nodes = pack(bubbleRoot as any).leaves();

    const node = svg
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${d.x},${d.y})`);

    node
      .append('circle')
      .attr('r', (d) => d.r)
      .style('fill', (_, i) => gradientColors[i]);

    node
      .append('text')
      .attr('dy', '0.3em')
      .attr('text-anchor', 'middle')
      .style('font-size', fontSize+'px')
      .style('fill', 'white')
      .text((d) => (d.data as any).name);
  }, [circlePadding, color, fontSize, value]);

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <div ref={chartRef} />
    </div>
  );
};

export default BubbleChart;
