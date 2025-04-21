import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';

import { IAreaChartProps } from './AreaChart.config';
import * as d3 from 'd3';

const AreaChart: FC<IAreaChartProps> = ({
  top,
  right,
  bottom,
  left,
  color,
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
    if (!chartRef.current || !value) return;

    d3.select(chartRef.current).select('*').remove();

    const margin = { top, right, bottom, left };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .range([0, width])
      .domain([0, value.length - 1]); // Linear scale for the x-axis
    const y = d3.scaleLinear().range([height, 0]);

    const area = d3
      .area<any>()
      .x((_, i) => x(i)) // Use the index for the x position
      .y0(height)
      .y1((d) => y(d.value));

    y.domain([0, d3.max(value, (d: any) => d.value)]);

    svg
      .append('path')
      .data([value])
      .attr('class', 'area')
      .attr('d', area)
      .attr('fill', color)
      .attr('opacity', 0.6);

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      // .style('font-size', '50px')
      .call(d3.axisBottom(x).ticks(value.length));

    svg.append('g').attr('class', 'y-axis').call(d3.axisLeft(y));
  }, [top, right, bottom, left, color, value]);

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <div ref={chartRef} />
    </div>
  );
};

export default AreaChart;
