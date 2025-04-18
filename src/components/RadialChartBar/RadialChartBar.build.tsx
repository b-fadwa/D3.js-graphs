import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useRef } from 'react';

import { IRadialChartBarProps } from './RadialChartBar.config';
import * as d3 from 'd3';
const RadialChartBar: FC<IRadialChartBarProps> = ({
  innerRadius,
  color,
  showLabels,
  fontSize,
  style,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const chartRef = useRef<HTMLDivElement>(null);
  const data = [
    { name: 'A', value: 30 },
    { name: 'B', value: 80 },
    { name: 'C', value: 45 },
    { name: 'D', value: 60 },
    { name: 'E', value: 20 },
    { name: 'F', value: 90 },
    { name: 'G', value: 55 },
  ];

  useEffect(() => {
    if (!chartRef.current) return;
    d3.select(chartRef.current).selectAll('*').remove();

    const width =
      typeof style?.width === 'number' ? style.width : parseInt(style?.width as string, 10) || 600;

    const height =
      typeof style?.height === 'number'
        ? style.height
        : parseInt(style?.height as string, 10) || 600;

    const outerRadius = Math.min(width, height) / 2 - 20;

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, 2 * Math.PI])
      .align(0);

    const y = d3
      .scaleRadial()
      .domain([0, d3.max(data, (d) => d.value) || 100])
      .range([innerRadius, outerRadius]);

    // Bars
    svg
      .append('g')
      .selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('fill', color)
      .attr(
        'd',
        (d3.arc() as any)
          .innerRadius(innerRadius)
          .outerRadius((d: any) => y(d.value))
          .startAngle((d: any) => x(d.name)!)
          .endAngle((d: any) => x(d.name)! + x.bandwidth())
          .padAngle(0.01)
          .padRadius(innerRadius),
      );

    showLabels &&
      svg
        .append('g')
        .selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('text-anchor', (d) =>
          (x(d.name)! + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? 'end' : 'start',
        )
        .attr('transform', (d) => {
          const angle = x(d.name)! + x.bandwidth() / 2;
          return `rotate(${(angle * 180) / Math.PI - 90})translate(${y(d.value) + 10},0)`;
        })
        .append('text')
        .text((d) => d.name)
        .attr('transform', (d) =>
          (x(d.name)! + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI
            ? 'rotate(180)'
            : null,
        )
        .style('font-size', fontSize + 'px')
        .attr('alignment-baseline', 'middle');
  }, [innerRadius, color , showLabels, fontSize]);

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <div ref={chartRef} />
    </div>
  );
};

export default RadialChartBar;
