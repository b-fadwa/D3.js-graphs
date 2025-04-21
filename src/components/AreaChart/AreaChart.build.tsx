import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useRef } from 'react';
import * as d3 from 'd3';

import { IAreaChartProps } from './AreaChart.config';

const AreaChart: FC<IAreaChartProps> = ({
  top,
  right,
  bottom,
  left,
  color,
  style,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const chartRef = useRef<HTMLDivElement>(null);

  // Example data for the area chart
  const data = [
    { label: 'A', value: 30 },
    { label: 'B', value: 80 },
    { label: 'C', value: 45 },
    { label: 'D', value: 60 },
    { label: 'E', value: 20 },
    { label: 'F', value: 90 },
    { label: 'G', value: 55 },
  ];

  useEffect(() => {
    if (!chartRef.current) return;

    d3.select(chartRef.current).select('*').remove();

    const margin = { top, right, bottom, left };

    const width =
      typeof style?.width === 'number' ? style.width : parseInt(style?.width as string, 10) || 600;

    const height =
      typeof style?.height === 'number'
        ? style.height
        : parseInt(style?.height as string, 10) || 400;

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .range([0, width])
      .domain([0, data.length - 1]); // Linear scale for the x-axis
    const y = d3.scaleLinear().range([height, 0]);

    const area = d3
      .area<any>()
      .x((_, i) => x(i)) // Use the index for the x position
      .y0(height)
      .y1((d) => y(d.value));

    y.domain([0, d3.max(data, (d: any) => d.value)]);

    svg
      .append('path')
      .data([data])
      .attr('class', 'area')
      .attr('d', area)
      .attr('fill', color)
      .attr('opacity', 0.6);

    svg
      .append('g')
      .attr('class', 'x-axis')
      // .style('font-size', '12px') //to be updated
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(data.length));

    svg.append('g').attr('class', 'y-axis').call(d3.axisLeft(y));
  }, [top, right, bottom, left, color]);

  return (
    <div
      ref={connect}
      style={style || { width: 'fit-content', height: 'fit-content' }}
      className={cn(className, classNames)}
    >
      <div ref={chartRef} />
    </div>
  );
};

export default AreaChart;
