import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';

import { IHistogramChartProps } from './HistogramChart.config';
import * as d3 from 'd3';

const HistogramChart: FC<IHistogramChartProps> = ({
  style,
  binsCount,
  color,
  barStroke,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
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
    if (!chartRef.current || !value || !value.length) return;

    d3.select(chartRef.current).selectAll('*').remove();

    const width =
      typeof style?.width === 'number' ? style.width : parseInt(style?.width as string, 10) || 600;

    const height =
      typeof style?.height === 'number'
        ? style.height
        : parseInt(style?.height as string, 10) || 400;

    const margin = {
      top: marginTop ?? 20,
      right: marginRight ?? 30,
      bottom: marginBottom ?? 30,
      left: marginLeft ?? 40,
    };

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const x = d3
      .scaleLinear()
      .domain(d3.extent(value) as [number, number])
      .nice()
      .range([margin.left, width - margin.right]);

    const bins = d3
      .bin()
      .domain(x.domain() as [number, number])
      .thresholds(x.ticks(binsCount) as any)(value);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(bins, (d) => d.length) as number])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .append('g')
      .selectAll('rect')
      .data(bins)
      .join('rect')
      .attr('x', (d) => x(d.x0!) + 1)
      .attr('y', (d) => y(d.length))
      .attr('width', (d) => Math.max(0, x(d.x1!) - x(d.x0!) - 1))
      .attr('height', (d) => y(0) - y(d.length))
      .attr('fill', color)
      .attr('stroke', barStroke);

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y));
  }, [binsCount, color, marginBottom, marginLeft, marginRight, marginTop, barStroke, value]);

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

export default HistogramChart;
