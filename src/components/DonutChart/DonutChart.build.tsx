import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useRef } from 'react';

import { IDonutChartProps } from './DonutChart.config';
import * as d3 from 'd3';

const DonutChart: FC<IDonutChartProps> = ({
  color,
  textFontSize,
  style,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const chartRef = useRef<HTMLDivElement>(null);

  const data: any[] = [
    { label: 'A', value: 30 },
    { label: 'B', value: 70 },
    { label: 'C', value: 45 },
    { label: 'D', value: 35 },
    { label: 'E', value: 15 },
    { label: 'F', value: 10 },
  ];

  useEffect(() => {
    d3.select(chartRef.current).selectAll('*').remove();

    const width =
      typeof style?.width === 'number' ? style.width : parseInt(style?.width as string, 10) || 400;

    const height =
      typeof style?.height === 'number'
        ? style.height
        : parseInt(style?.height as string, 10) || 400;

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
      ? generateGradientColors(color as any, data.length)
      : d3.schemeCategory10;

    svg
      .selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (_, i) => gradientColors[i])
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    // Optional: add labels
    svg
      .selectAll('text')
      .data(pie(data))
      .enter()
      .append('text')
      .text((d) => d.data.label)
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .style('text-anchor', 'middle')
      .style('font-size', textFontSize + 'px');
  }, [color, textFontSize]);

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <div ref={chartRef} />
    </div>
  );
};

export default DonutChart;
