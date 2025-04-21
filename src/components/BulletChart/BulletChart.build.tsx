import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useRef } from 'react';

import { IBulletChartProps } from './BulletChart.config';
import * as d3 from 'd3';

const BulletChart: FC<IBulletChartProps> = ({
  marginBottom,
  marginRight,
  marginTop,
  marginLeft,
  color,
  showTargetLine,
  style,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const chartRef = useRef<HTMLDivElement>(null);

  const data = [
    {
      label: 'Revenue',
      unit: 'US$, in thousands',
      thresholds: [150, 225, 300],
      value: 220,
      target: 250,
    },
    {
      label: 'Profit',
      unit: 'Percentage',
      thresholds: [20, 25, 30],
      value: 23,
      target: 27,
    },
    {
      label: 'Customer Satisfaction',
      unit: 'Score out of 100',
      thresholds: [50, 70, 90],
      value: 72,
      target: 85,
    },
    {
      label: 'Employee Retention',
      unit: 'Percentage',
      thresholds: [60, 75, 90],
      value: 78,
      target: 80,
    },
  ];

  useEffect(() => {
    if (!chartRef.current) return;
    d3.select(chartRef.current).selectAll('*').remove();

    const width =
      typeof style?.width === 'number' ? style.width : parseInt(style?.width as string, 10) || 600;

    const height =
      typeof style?.height === 'number'
        ? style.height
        : parseInt(style?.height as string, 10) || 40;

    const margin = { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft };

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', data.length * (height + margin.top));

    data.forEach((d, i) => {
      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${i * (height + margin.top)})`);

      const x = d3
        .scaleLinear()
        .domain([0, d3.max(d.thresholds) as any])
        .range([0, width]);

      const generateGradientColors = (baseColor: string, steps: number): string[] => {
        const darker = d3.color(baseColor)?.darker(1.5).formatHex() ?? baseColor;
        const interpolator = d3.interpolateLab(darker, baseColor);
        return Array.from({ length: steps }, (_, i) => interpolator(i / (steps - 1)));
      };

      const gradientColors = color
        ? generateGradientColors(color as any, data.length)
        : d3.schemeCategory10;

      // Ranges
      g.selectAll('rect.range')
        .data(d.thresholds)
        .enter()
        .append('rect')
        .attr('class', 'range')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', (t, idx) => x(t) - (idx > 0 ? x(d.thresholds[idx - 1]) : 0))
        .attr('height', height)
        .attr('fill', (_, i) => gradientColors[i]);

      // Actual Value
      g.append('rect')
        .attr('class', 'value')
        .attr('x', 0)
        .attr('y', height / 4)
        .attr('width', x(d.value))
        .attr('height', height / 2)
        .attr('fill', color);

      // Target Line
      showTargetLine &&
        g
          .append('line')
          .attr('x1', x(d.target))
          .attr('x2', x(d.target))
          .attr('y1', 0)
          .attr('y2', height)
          .attr('stroke', 'black')
          .attr('stroke-width', 2);

      // Label
      // g.append('text')
      //   .attr('x', -10)
      //   .attr('y', height / 2)
      //   .attr('dy', '.35em')
      //   .attr('text-anchor', 'end')
      //   .text(`${d.label} (${d.unit})`);
      // Label inside the bar area
      g.append('text')
        .attr('x', 5) // ← inside the chart area
        .attr('y', height / 2)
        .attr('dy', '.35em')
        .attr('text-anchor', 'start')
        .style('fill', 'black')
        .style('font-weight', 'bold')
        .text(`${d.label} (${d.unit})`);
    });
  }, [marginBottom, marginRight, marginTop, marginLeft, showTargetLine, color, style]);

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <div ref={chartRef} />
    </div>
  );
};

export default BulletChart;
