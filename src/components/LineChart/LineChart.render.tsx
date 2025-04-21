import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';

import { ILineChartProps } from './LineChart.config';
import * as d3 from 'd3';
const LineChart: FC<ILineChartProps> = ({
  color,
  axisFontSize,
  marginBottom,
  marginLeft,
  marginTop,
  marginRight,
  style,
  className,
  classNames = [],
}) => {
  const { connect } = useRenderer();
  const [value, setValue] = useState<any[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);

  const {
    sources: { datasource: ds },
  } = useSources();

  useEffect(() => {
    if (!ds) return;

    const listener = async (/* event */) => {
      const v = await ds.getValue<any[]>();
      setValue(v);
    };

    listener();

    ds.addListener('changed', listener);

    return () => {
      ds.removeListener('changed', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ds]);

  useEffect(() => {
    if (!chartRef.current || !value || value.length === 0) return;
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
      .domain([d3.min(value, (d) => d.x)!, d3.max(value, (d) => d.x)!])
      .range([0, innerWidth]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(value, (d) => d.y)!])
      .nice()
      .range([innerHeight, 0]);

    const line = d3
      .line<{ x: number; y: number }>()
      .x((d) => x(d.x))
      .y((d) => y(d.y));

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

    svg
      .append('path')
      .datum(value)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 2)
      .attr('d', line);
  }, [value, color, axisFontSize, marginBottom, marginLeft, marginRight, marginTop]);

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <div ref={chartRef} />
    </div>
  );
};

export default LineChart;
