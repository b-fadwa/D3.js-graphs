import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useRef } from 'react';

import { IScatterChartProps } from './ScatterChart.config';
import * as d3 from 'd3';

const ScatterChart: FC<IScatterChartProps> = ({
  style,
  pointColor,
  pointRadius,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const chartRef = useRef<HTMLDivElement>(null);
  const data = [
    { x: 5.1, y: 3.5 },
    { x: 4.9, y: 3.0 },
    { x: 6.7, y: 3.1 },
    { x: 5.6, y: 2.5 },
    { x: 5.9, y: 3.2 },
    { x: 6.0, y: 2.2 },
    { x: 6.1, y: 2.8 },
    { x: 5.5, y: 4.2 },
  ];

  useEffect(() => {
    if (!chartRef.current) return;
    d3.select(chartRef.current).selectAll('*').remove();
    const width =
      typeof style?.width === 'number' ? style.width : parseInt(style?.width as string, 10) || 600;

    const height =
      typeof style?.height === 'number'
        ? style.height
        : parseInt(style?.height as string, 10) || 400;

    const margin = {
      top: marginTop ?? 20,
      right: marginRight ?? 30,
      bottom: marginBottom ?? 40,
      left: marginLeft ?? 40,
    };

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.x) as [number, number])
      .nice()
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.y) as [number, number])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y));

    svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.x))
      .attr('cy', (d) => y(d.y))
      .attr('r', pointRadius)
      .attr('fill', pointColor);
  }, [pointColor, pointRadius, marginBottom, marginLeft, marginRight, marginTop]);

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

export default ScatterChart;
