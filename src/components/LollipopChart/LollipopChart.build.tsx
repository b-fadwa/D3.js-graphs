import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useRef } from 'react';

import { ILollipopChartProps } from './LollipopChart.config';
import * as d3 from 'd3';

const LollipopChart: FC<ILollipopChartProps> = ({
  margingBottom,
  margingLeft,
  margingRight,
  margingTop,
  color,
  strokeWidth,
  dotSize,
  style,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const chartRef = useRef<HTMLDivElement>(null);

  const data = [
    { label: 'A', value: 30 },
    { label: 'B', value: 50 },
    { label: 'C', value: 80 },
    { label: 'D', value: 60 },
    { label: 'E', value: 40 },
  ];

  useEffect(() => {
    if (!chartRef.current) return;

    d3.select(chartRef.current).selectAll('*').remove();

    const margin = {
      top: margingTop,
      right: margingRight,
      bottom: margingBottom,
      left: margingLeft,
    };

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
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // scales
    const xScale = d3.scaleBand().range([0, width]).padding(0.1);
    const yScale = d3.scaleLinear().range([height, 0]);

    xScale.domain(data.map((d) => d.label));
    yScale.domain([0, d3.max(data, (d: any) => d.value)]);

    // lollipop "sticks" (
    svg
      .selectAll('.stick')
      .data(data)
      .enter()
      .append('line')
      .attr('class', 'stick')
      .attr('x1', (d) => (xScale(d.label) as any) + xScale.bandwidth() / 2)
      .attr('y1', (d) => yScale(d.value))
      .attr('x2', (d) => (xScale(d.label) as any) + xScale.bandwidth() / 2)
      .attr('y2', height)
      .attr('stroke', color)
      .attr('stroke-width', strokeWidth);

    //lollipop "heads"
    svg
      .selectAll('.head')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'head')
      .attr('cx', (d) => (xScale(d.label) as any) + xScale.bandwidth() / 2)
      .attr('cy', (d) => yScale(d.value))
      .attr('r', dotSize)
      .attr('fill', color);

    // x-axis
    svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(xScale));

    // y-axis
    svg.append('g').call(d3.axisLeft(yScale));
  }, [margingBottom, margingLeft, margingRight, margingTop, color, dotSize, strokeWidth]);

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <div ref={chartRef} />
    </div>
  );
};

export default LollipopChart;
