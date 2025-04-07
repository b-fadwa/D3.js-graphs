import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useRef } from 'react';
import * as d3 from 'd3';

import { IBarChartProps } from './BarChart.config';

const BarChart: FC<IBarChartProps> = ({ marginTop, marginRight, marginBottom, marginLeft, style, className, classNames = [] }) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();
  const chartRef = useRef<HTMLDivElement>(null);

  const value = [
    { name: 'Category A', value: 50 },
    { name: 'Category B', value: 20 },
    { name: 'Category C', value: 40 },
    { name: 'Category D', value: 70 },
  ];

  useEffect(() => {
    if (!chartRef.current) return;

    const margin = { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft }; //to be updated from props
    const width = 500 - margin.left - margin.right;//to be updated from props
    const height = 400 - margin.top - margin.bottom;//to be updated from props

    d3.select(chartRef.current).selectAll('*').remove();

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);

    x.domain(value.map((d) => d.name));
    y.domain([0, d3.max(value, (d) => d.value) || 0]);

    svg
      .selectAll('.bar')
      .data(value)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.name)!)
      .attr('width', x.bandwidth())
      .attr('y', (d) => y(d.value))
      .attr('height', (d) => height - y(d.value));

    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g').call(d3.axisLeft(y));
  }, [marginBottom, marginLeft, marginRight, marginTop, value]);
  
  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <div ref={chartRef} />
    </div>
  );
};

export default BarChart;