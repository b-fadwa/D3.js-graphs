import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';

import { IRadarChartProps } from './RadarChart.config';
import * as d3 from 'd3';

const RadarChart: FC<IRadarChartProps> = ({
  margin,
  style,
  strokeWidth,
  dotColor,
  innerStrokeColor,
  outerStrokeColor,
  innerStrokeWidth,
  outerStrokeWidth,
  radarAreaColor,
  labelFontSize,
  labelOffset,
  showLabels,
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
    if (!chartRef.current || !value) return;

    d3.select(chartRef.current).selectAll('*').remove();

    const width =
      typeof style?.width === 'number' ? style.width : parseInt(style?.width as string, 10) || 400;

    const height =
      typeof style?.height === 'number'
        ? style.height
        : parseInt(style?.height as string, 10) || 400;

    const radius = Math.min(width, height) / 2 - (margin ?? 50);
    const angleSlice = (Math.PI * 2) / value.length;

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const radialScale = d3
      .scaleLinear()
      .domain([0, d3.max(value, (d) => d.value as number) as number])
      .range([0, radius]);

    // Polygon (the chart shape)
    const radarLine = d3
      .lineRadial()
      .curve(d3.curveLinearClosed) // to close the shape
      .radius((d) => radialScale((d as any).value))
      .angle((_, i) => i * angleSlice);

    // Labels for each axis
    showLabels &&
      svg
        .selectAll('.axisLabel')
        .data(value)
        .enter()
        .append('text')
        .attr('class', 'axisLabel')
        .attr('x', (_, i) => {
          const angle = i * angleSlice - Math.PI / 2;
          const labelRadius = radius + labelOffset;
          return labelRadius * Math.cos(angle);
        })
        .attr('y', (_, i) => {
          const angle = i * angleSlice - Math.PI / 2;
          const labelRadius = radius + labelOffset;
          return labelRadius * Math.sin(angle);
        })
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .style('font-size', +labelFontSize + 'px')
        .text((d) => d.label);

    svg
      .append('path')
      .data([value])
      .attr('class', 'radarArea')
      .attr('d', radarLine as any)
      .attr('fill', radarAreaColor)
      .attr('stroke', outerStrokeColor)
      .attr('stroke-width', outerStrokeWidth);

    // Axes (one for each data variable)
    const axisGrid = svg.append('g').attr('class', 'axisWrapper');
    axisGrid
      .selectAll('.axis')
      .data(value)
      .enter()
      .append('line')
      .attr('class', 'axis')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (d, i) => radialScale(d.value) * Math.cos(i * angleSlice - Math.PI / 2))
      .attr('y2', (d, i) => radialScale(d.value) * Math.sin(i * angleSlice - Math.PI / 2))
      .attr('stroke', innerStrokeColor)
      .attr('stroke-width', innerStrokeWidth);

    // Points (data values)
    svg
      .selectAll('.radarCircle')
      .data(value)
      .enter()
      .append('circle')
      .attr('class', 'radarCircle')
      .attr('r', 4)
      .attr('cx', (d, i) => radialScale(d.value) * Math.cos(i * angleSlice - Math.PI / 2))
      .attr('cy', (d, i) => radialScale(d.value) * Math.sin(i * angleSlice - Math.PI / 2))
      .attr('fill', '#007bff')
      .attr('stroke', dotColor)
      .attr('stroke-width', strokeWidth);
  }, [
    margin,
    strokeWidth,
    dotColor,
    outerStrokeColor,
    innerStrokeColor,
    innerStrokeWidth,
    outerStrokeWidth,
    radarAreaColor,
    labelFontSize,
    labelOffset,
    showLabels,
    style,
    value,
  ]);

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

export default RadarChart;
