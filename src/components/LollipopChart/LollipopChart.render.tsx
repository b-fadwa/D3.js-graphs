import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';

import { ILollipopChartProps } from './LollipopChart.config';
import * as d3 from 'd3';
const LollipopChart: FC<ILollipopChartProps> = ({
  margingBottom,
  margingLeft,
  margingRight,
  margingTop,
  color,
  dotSize,
  strokeWidth,
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
      const v = await ds.getValue();
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
    if (!chartRef.current) return;

    d3.select(chartRef.current).selectAll('*').remove();

    const margin = {
      top: margingTop,
      right: margingRight,
      bottom: margingBottom,
      left: margingLeft,
    };

    const width =
      typeof style?.width === 'number' ? style.width : parseInt(style?.width as string, 10) || 600;

    const height =
      typeof style?.height === 'number'
        ? style.height
        : parseInt(style?.height as string, 10) || 400;

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleBand().range([0, width]).padding(0.1);
    const yScale = d3.scaleLinear().range([height, 0]);

    xScale.domain(value.map((d) => d.label));
    yScale.domain([0, d3.max(value, (d: any) => d.value)]);

    // lollipop "sticks"
    svg
      .selectAll('.stick')
      .data(value)
      .enter()
      .append('line')
      .attr('class', 'stick')
      .attr('x1', (d) => (xScale(d.label) as any) + xScale.bandwidth() / 2)
      .attr('y1', (d) => yScale(d.value))
      .attr('x2', (d) => (xScale(d.label) as any) + xScale.bandwidth() / 2)
      .attr('y2', height)
      .attr('stroke', color)
      .attr('stroke-width', strokeWidth);

    // lollipop "heads"
    svg
      .selectAll('.head')
      .data(value)
      .enter()
      .append('circle')
      .attr('class', 'head')
      .attr('cx', (d) => (xScale(d.label) as any) + xScale.bandwidth() / 2)
      .attr('cy', (d) => yScale(d.value))
      .attr('r', dotSize)
      .attr('fill', color);

    //  x-axis
    svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(xScale));

    //  y-axis
    svg.append('g').call(d3.axisLeft(yScale));
  }, [margingBottom, margingLeft, margingRight, margingTop, value, color, strokeWidth, dotSize]);

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

export default LollipopChart;
