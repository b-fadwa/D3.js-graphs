import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { IPieChartProps } from './PieChart.config';

const PieChart: FC<IPieChartProps> = ({
  style,
  className,
  classNames = [],
  color,
  innerRadius,
  outerRadius,
  labelFontSize,
}) => {
  const { connect } = useRenderer();
  const [value, setValue] = useState<any[]>([]);
  const {
    sources: { datasource: ds },
  } = useSources();
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ds) return;

    const listener = async () => {
      const v = await ds.getValue<any>();
      setValue(v);
    };

    listener();
    ds.addListener('changed', listener);

    return () => {
      ds.removeListener('changed', listener);
    };
  }, [ds]);

  const generateGradientColors = (baseColor: string, steps: number): string[] => {
    const darker = d3.color(baseColor)?.darker(1.5).formatHex() ?? baseColor;
    const interpolator = d3.interpolateLab(darker, baseColor);
    return Array.from({ length: steps }, (_, i) => interpolator(i / (steps - 1)));
  };
  

  useEffect(() => {
    if (!value || value.length === 0 || !chartRef.current) return;

    d3.select(chartRef.current).selectAll('*').remove();

    const width = outerRadius * 2 + 50;
    const height = outerRadius * 2 + 50;

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const pie = d3.pie<any>().value(d => d.value);
    const dataReady = pie(value);
    const gradientColors = color ? generateGradientColors(color, value.length) : d3.schemeCategory10;
    

    const arc = d3.arc<any>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    svg
      .selectAll('path')
      .data(dataReady)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (_, i) => gradientColors[i])
      .attr('stroke', '#fff')
      .style('stroke-width', '2px');

    // Optional: add labels
    svg
      .selectAll('text')
      .data(dataReady)
      .enter()
      .append('text')
      .text(d => d.data.name)
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .style('text-anchor', 'middle')
      .style('font-size', `${labelFontSize}px`)
      .style('fill', '#333');
  }, [value, color, outerRadius, innerRadius, labelFontSize]);

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <div ref={chartRef} />
    </div>
  );
};

export default PieChart;
