import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { IBarChartProps } from './BarChart.config';

const BarChart: FC<IBarChartProps> = ({ marginTop, marginRight, marginBottom, marginLeft, style, className, classNames = [] }) => {
  const { connect } = useRenderer();
  const [value, setValue] = useState<any[]>([]);
  const {
    sources: { datasource: ds },
  } = useSources();

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
    //properties
    const margin = { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft }; //to be set as component's properties
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom; 
    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);

    //svg construction
    const svg = d3
      .select('.bar-chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    x.domain(
      value.map(function (d) {
        return d.name;
      }),
    );
    y.domain([
      0,
      d3.max(value, function (d) {
        return d.value;
      }),
    ]);

    svg
      .selectAll('.bar')
      .data(value)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', function (d: any) {
        return x(d.name);
      } as any)
      .attr('width', x.bandwidth())
      .attr('y', function (d) {
        return y(d.value);
      })
      .attr('height', function (d) {
        return height - y(d.value);
      });

    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    svg.append('g').call(d3.axisLeft(y));
  },[value, marginTop, marginRight, marginBottom, marginLeft]);

  return <div ref={connect} style={style} className={cn(className, classNames)}>
    <div className='bar-chart'/>
  </div>;
};

export default BarChart;
