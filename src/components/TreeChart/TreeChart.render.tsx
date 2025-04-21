import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';

import { ITreeChartProps } from './TreeChart.config';
import * as d3 from 'd3';

const TreeChart: FC<ITreeChartProps> = ({
  nodeColor,
  linkColor,
  fontSize,
  marginBottom,
  marginRight,
  marginTop,
  marginLeft,
  strokeWidth,
  style,
  className,
  classNames = [],
}) => {
  const { connect } = useRenderer();
  const [value, setValue] = useState<object>({});

  const chartRef = useRef<HTMLDivElement>(null);
  const {
    sources: { datasource: ds },
  } = useSources();

  useEffect(() => {
    if (!ds) return;

    //to convert numeric array into an actual array []
    const normalize = (node: any): any => {
      const children = node?.children ? Object.values(node?.children).map(normalize) : undefined;
      return {
        name: node?.name,
        children,
      };
    };

    const listener = async () => {
      const v = await ds.getValue();
      const cleanArray = normalize(v);
      setValue(cleanArray);
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

    const width =
      typeof style?.width === 'number' ? style.width : parseInt(style?.width as string, 10) || 400;

    const height =
      typeof style?.height === 'number'
        ? style.height
        : parseInt(style?.height as string, 10) || 400;

    const margin = {
      top: marginTop ?? 20,
      right: marginRight ?? 100,
      bottom: marginBottom ?? 20,
      left: marginLeft ?? 100,
    };

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const root = d3.hierarchy(value);
    const treeLayout = d3
      .tree()
      .size([height - margin.top - margin.bottom, width - margin.left - margin.right]);

    treeLayout(root as any);

    //lines
    svg
      .selectAll('link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', linkColor)
      .attr('stroke-width', strokeWidth)
      .attr('d', (d: any) => {
        return `M${d.source.y},${d.source.x} L${d.target.y},${d.target.x}`;
      });
    //curved:
    // .attr(
    //   'd',
    //   (d3.linkHorizontal() as any).x((d: any) => d.y).y((d: any) => d.x),
    // );

    //nodes
    const node = svg
      .selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => `translate(${d.y},${d.x})`);

    node.append('circle').attr('r', 5).attr('fill', nodeColor);

    node
      .append('text')
      .attr('dy', '3')
      .attr('x', (d: any) => (d.children ? -10 : 10))
      .attr('text-anchor', (d: any) => (d.children ? 'end' : 'start'))
      .text((d: any) => d.data.name)
      .style('font-size', fontSize);
  }, [
    nodeColor,
    linkColor,
    fontSize,
    marginBottom,
    marginRight,
    marginTop,
    marginLeft,
    strokeWidth,
    value,
  ]);

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <div ref={chartRef} />
    </div>
  );
};

export default TreeChart;
