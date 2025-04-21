import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { IPieChartProps } from './PieChart.config';

const PieChart: FC<IPieChartProps> = ({ color, outerRadius, innerRadius, labelFontSize, style, className, classNames = [] }) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();
    const chartRef = useRef<HTMLDivElement>(null);
  
    const data :any[] = [
      { name: 'A', value: 30 },
      { name: 'B', value: 20 },
      { name: 'C', value: 15 },
      { name: 'D', value: 10 },
      { name: 'E', value: 25 }
    ]   
    
    const generateGradientColors = (baseColor: string, steps: number): string[] => {
      const darker = d3.color(baseColor)?.darker(1.5).formatHex() ?? baseColor;
      const interpolator = d3.interpolateLab(darker, baseColor);
      return Array.from({ length: steps }, (_, i) => interpolator(i / (steps - 1)));
    };
    
    
    useEffect(() => {
      if (!chartRef.current) return;
  
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
      const dataReady = pie(data);
      const gradientColors = color ? generateGradientColors(color, data.length) : d3.schemeCategory10;

  
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
    }, [color, outerRadius, innerRadius, labelFontSize]);

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <div ref={chartRef} />
    </div>
  );
};

export default PieChart;