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

    const xScale = d3
      .scaleLinear()
      .domain(dailyData.map((value, index) => index))
      .range([0, dimensions.width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dailyData.map(daily => daily.confirmed))])
      .range([dimensions.height, 0]);

    const xTicksScale = d3
      .scaleLinear()
      .domain(dailyData.map((daily, index) => daily.reportDate));

    const xAxis = d3.axisBottom(xTicksScale).ticks(dailyData.length);

    svg
      .select(".x-axis")
      .style("transform", `translateY(${dimensions.height}px)`)
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale);

    svg.select(".y-axis").call(yAxis);

    svg
      .selectAll(".circle")
      .data(dailyData)
      .join("line")
      .attr("class", "circle")
      .style("transform", "scale(1,-1)")
      .attr("x", (daily, index) => xScale(index))
      .attr("y", -dimensions.height);
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
