import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useRef } from 'react';

import { ITreeMapChartProps } from './TreeMapChart.config';
import * as d3 from 'd3';

const TreeMapChart: FC<ITreeMapChartProps> = ({
  padding,
  leaveColor,
  strokeColor,
  strokeWidth,
  fontColor,
  style,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const chartRef = useRef<HTMLDivElement>(null);

  const data = {
    name: 'Company',
    children: [
      {
        name: 'North America',
        children: [
          { name: 'Electronics', value: 120 },
          { name: 'Furniture', value: 60 },
        ],
      },
      {
        name: 'Europe',
        children: [
          { name: 'Electronics', value: 100 },
          { name: 'Furniture', value: 50 },
        ],
      },
      {
        name: 'Asia',
        children: [
          { name: 'Electronics', value: 150 },
          { name: 'Furniture', value: 30 },
        ],
      },
    ],
  };

  useEffect(() => {
    if (!chartRef.current) return;

    d3.select(chartRef.current).selectAll('*').remove();

    const width =
      typeof style?.width === 'number' ? style.width : parseInt(style?.width as string, 10) || 600;

    const height =
      typeof style?.height === 'number'
        ? style.height
        : parseInt(style?.height as string, 10) || 600;

    // Create the SVG container
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Define the treemap layout
    const treemap = d3.treemap().size([width, height]).padding(padding);

    const root = d3.hierarchy(data).sum((d: any) => d.value);
    treemap(root as any);

    // Append the rectangles
    svg
      .selectAll('rect')
      .data(root.leaves())
      .enter()
      .append('rect')
      .attr('x', (d: any) => d.x0)
      .attr('y', (d: any) => d.y0)
      .attr('width', (d: any) => d.x1 - d.x0)
      .attr('height', (d: any) => d.y1 - d.y0)
      .attr('fill', leaveColor)
      .attr('stroke', strokeColor)
      .attr('stroke-width', strokeWidth);

    // Add labels to the treemap
    svg
      .selectAll('text')
      .data(root.leaves())
      .enter()
      .append('text')
      .attr('x', (d: any) => (d.x0 + d.x1) / 2)
      .attr('y', (d: any) => (d.y0 + d.y1) / 2)
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .attr('fill', fontColor)
      .text((d: any) => `${d.data.name}: ${d.data.value}`);
  }, [padding, leaveColor, strokeColor, strokeWidth, fontColor, style]);

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

export default TreeMapChart;
