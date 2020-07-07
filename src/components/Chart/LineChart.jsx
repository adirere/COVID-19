import React, { useState, useEffect, useRef } from "react";
import { fetchDailyData } from "../../api";
import * as d3 from "d3";
import ResizeObserver from "resize-observer-polyfill";

const useResizeObserver = ref => {
  const [dimensions, setDimensions] = useState(null);

  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        setDimensions(entry.contentRect);
      });
    });

    resizeObserver.observe(observeTarget);

    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);

  return dimensions;
};

const LineChart = () => {
  const [dailyData, setDailyData] = useState([]);
  useEffect(() => {
    const fetchDaily = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchDaily();
  }, []);

  const svgRef = useRef();
  const wrapperRef = useRef();

  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    if (!dimensions) return;

    const parsedDate = function(d) {
      return d3.timeParse("%Y-%m-%d")(d);
    };

    console.log(d3.extent(dailyData.map(daily => parsedDate(daily.date))));
    console.log(d3.max(dailyData.map(daily => daily.confirmed)));

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(dailyData.map(daily => parsedDate(daily.date))))
      .range([0, dimensions.width]);

    svg
      .append("g")
      .attr("transform", "translate(0," + dimensions.height + ")")
      .call(d3.axisBottom(xScale));

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dailyData.map(daily => daily.confirmed))])
      .range([dimensions.height, 0])
      .nice();

    const yAxis = d3.axisLeft(yScale);

    svg.select(".y-axis").call(yAxis);

    svg
      .append("path")
      .datum(dailyData)
      .attr("fill", "none")
      .attr("stroke", "#FFD177")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x(d => xScale(parsedDate(d.date)))
          .y(d => yScale(d.confirmed))
      );

    svg
      .append("path")
      .datum(dailyData)
      .attr("fill", "none")
      .attr("stroke", "#F89283")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x(d => xScale(parsedDate(d.date)))
          .y(d => yScale(d.deaths))
      );
  }, [dailyData, dimensions]);

  return (
    <div ref={wrapperRef} style={{ margin: "5% 20%" }}>
      <svg
        ref={svgRef}
        style={{ overflow: "visible", width: "100%", height: "50vh" }}
      >
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default LineChart;
