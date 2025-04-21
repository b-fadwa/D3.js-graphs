import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { IBarChartProps } from './BarChart.config';

const BarChart: FC<IBarChartProps> = ({
  axisFontSize,
  color,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  style,
  className,
  classNames = [],
}) => {
  const { connect } = useRenderer();
  const [value, setValue] = useState<any[]>([]);
  const {
    sources: { datasource: ds },
  } = useSources();
  const chartRef = useRef<HTMLDivElement>(null);

  //value = array [{name:"",value:0}]

  useEffect(() => {
    if (!ds) return;

    const listener = async (/* event */) => {
      const v = await ds.getValue<any>();
      setValue(v);
    };

    listener();

    ds.addListener('changed', listener);

    return () => {
      ds.removeListener('changed', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ds]);

  //creation part
  useEffect(() => {
    if (!value || value.length === 0) return;
    if (!chartRef.current) return;

    d3.select(chartRef.current).selectAll('*').remove();

    //properties
    const margin = { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft };
    const width =
      typeof style?.width === 'number' ? style.width : parseInt(style?.width as string, 10) || 400;

    const height =
      typeof style?.height === 'number'
        ? style.height
        : parseInt(style?.height as string, 10) || 400;

    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);

    //svg construction
    const svg = d3
      .select('.bar-chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('fill', color)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    x.domain(value.map((d) => d.name));
    y.domain([0, d3.max(value, (d) => d.value)]);
    // X Axis
    const xAxisGroup = svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    xAxisGroup
      .selectAll('text')
      .style('font-size', axisFontSize + 'px')
      .style('fill', '#555');

    xAxisGroup.selectAll('.domain').style('stroke', '#999');
    xAxisGroup.selectAll('.tick line').style('stroke', '#ccc');

    // Y Axis
    const yAxisGroup = svg.append('g').call(d3.axisLeft(y));

    yAxisGroup
      .selectAll('text')
      .style('font-size', axisFontSize + 'px')
      .style('fill', '#555');

    yAxisGroup.selectAll('.domain').style('stroke', '#999');
    yAxisGroup.selectAll('.tick line').style('stroke', '#ccc');

    svg
      .selectAll('.bar')
      .data(value)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.name) as any)
      .attr('width', x.bandwidth())
      .attr('y', (d) => y(d.value))
      .attr('height', (d) => height - y(d.value));
  }, [marginTop, marginRight, marginBottom, marginLeft, color, axisFontSize, value]);

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <div ref={chartRef} className="bar-chart" />
    </div>
  );
};

export default BarChart;
