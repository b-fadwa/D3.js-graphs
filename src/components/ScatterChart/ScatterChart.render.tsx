import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';

import { IScatterChartProps } from './ScatterChart.config';
import * as d3 from 'd3';

const ScatterChart: FC<IScatterChartProps> = ({
  style,
  pointColor,
  pointRadius,
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
      if (!chartRef.current) return;
      d3.select(chartRef.current).selectAll('*').remove();
  
      const width = style?.width ? parseInt(style.width as string, 10) : 600;
      const height = style?.height ? parseInt(style.height as string, 10) : 400;
      
      const margin = {
        top: marginTop ?? 20,
        right: marginRight ?? 30,
        bottom: marginBottom ?? 40,
        left: marginLeft ?? 40,
      };
  
      const svg = d3
        .select(chartRef.current)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
  
      const x = d3
        .scaleLinear()
        .domain(d3.extent(value, (d) => d.x) as [number, number])
        .nice()
        .range([margin.left, width - margin.right]);
  
      const y = d3
        .scaleLinear()
        .domain(d3.extent(value, (d) => d.y) as [number, number])
        .nice()
        .range([height - margin.bottom, margin.top]);
  
      svg
        .append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));
  
      svg.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y));
  
      svg
        .selectAll('circle')
        .data(value)
        .enter()
        .append('circle')
        .attr('cx', (d) => x(d.x))
        .attr('cy', (d) => y(d.y))
        .attr('r', pointRadius)
        .attr('fill', pointColor);

    }, [pointColor, pointRadius, marginBottom, marginLeft, marginRight, marginTop, value]);

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <div ref={chartRef} />
    </div>
  );
};

export default ScatterChart;
