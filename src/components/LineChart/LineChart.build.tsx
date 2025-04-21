import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ILineChartProps } from './LineChart.config';

const LineChart: FC<ILineChartProps> = ({
  color,
  axisFontSize,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  style,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const chartRef = useRef<HTMLDivElement>(null);

  const data: any[] = [
    { x: 1, y: 30 },
    { x: 2, y: 50 },
    { x: 3, y: 40 },
    { x: 4, y: 70 },
    { x: 5, y: 60 },
    { x: 6, y: 100 },
  ];

  useEffect(() => {
    if (!chartRef.current) return;
    d3.select(chartRef.current).selectAll('*').remove();

    const margin = { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft };

    const width =
      typeof style?.width === 'number' ? style.width : parseInt(style?.width as string, 10) || 400;

    const height =
      typeof style?.height === 'number'
        ? style.height
        : parseInt(style?.height as string, 10) || 400;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.x)!, d3.max(data, (d) => d.x)!])
      .range([0, innerWidth]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.y)!])
      .nice()
      .range([innerHeight, 0]);

    const line = d3
      .line<{ x: number; y: number }>()
      .x((d) => x(d.x))
      .y((d) => y(d.y));

    // Axes
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    svg
      .append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .selectAll('text')
      .style('font-size', `${axisFontSize}px`)
      .style('fill', '#555');

    svg
      .append('g')
      .call(yAxis)
      .selectAll('text')
      .style('font-size', `${axisFontSize}px`)
      .style('fill', '#555');

    // Line path
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 2)
      .attr('d', line);
  }, [color, axisFontSize, marginBottom, marginLeft, marginRight, marginTop]);

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

export default LineChart;
