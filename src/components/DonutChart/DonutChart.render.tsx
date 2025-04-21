import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';

import { IDonutChartProps } from './DonutChart.config';
import * as d3 from 'd3';
const DonutChart: FC<IDonutChartProps> = ({
  color,
  width,
  height,
  textFontSize,
  style,
  className,
  classNames = [],
}) => {
  const { connect } = useRenderer();
  const [value, setValue] = useState<any[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);

  const {
    sources: { datasource: ds },
  } = useSources();

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
    d3.select(chartRef.current).selectAll('*').remove();
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arc = d3
      .arc<any>()
      .innerRadius(radius * 0.5) // donut hole size
      .outerRadius(radius);

    const pie = d3
      .pie<any>()
      .value((d) => d.value)
      .sort(null);

    const generateGradientColors = (baseColor: string, steps: number): string[] => {
      const darker = d3.color(baseColor)?.darker(1.5).formatHex() ?? baseColor;
      const interpolator = d3.interpolateLab(darker, baseColor);
      return Array.from({ length: steps }, (_, i) => interpolator(i / (steps - 1)));
    };

    const gradientColors = color
      ? generateGradientColors(color as any, value.length)
      : d3.schemeCategory10;

    svg
      .selectAll('path')
      .data(pie(value))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (_, i) => gradientColors[i])
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    // Optional: add labels
    svg
      .selectAll('text')
      .data(pie(value))
      .enter()
      .append('text')
      .text((d) => d.data.label)
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .style('text-anchor', 'middle')
      .style('font-size', textFontSize + 'px');
  }, [textFontSize,width, height, color, value]);

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <div ref={chartRef} />
    </div>
  );
};

export default DonutChart;
