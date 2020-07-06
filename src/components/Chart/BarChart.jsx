import React, { useRef, useEffect, useState } from "react";
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

const BarChart = ({ data: { confirmed, recovered, deaths } }) => {
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    if (!confirmed) return;
    setMyData([confirmed.value, recovered.value, deaths.value]);
  }, [confirmed]);

  const svgRef = useRef();
  const wrapperRef = useRef();

  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const types = ["INFECTED", "RECOVERED", "DEATHS"];

    if (!dimensions) return;

    const xScale = d3
      .scaleBand()
      .domain(myData.map((value, index) => index))
      .range([0, dimensions.width])
      .padding(0.5);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(myData)])
      .range([dimensions.height, 0]);

    const xTicksScale = d3
      .scaleBand()
      .domain(types.map((value, index) => value))
      .range([0, dimensions.width])
      .padding(0.5);

    const xAxis = d3.axisBottom(xTicksScale).ticks(types.length);

    svg
      .select(".x-axis")
      .style("transform", `translateY(${dimensions.height}px)`)
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale);

    svg.select(".y-axis").call(yAxis);

    svg
      .selectAll(".bar")
      .data(myData)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1,-1)")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -dimensions.height)
      .attr("width", xScale.bandwidth())
      .on("mouseenter", (value, index) => {
        svg
          .selectAll(".tooltip")
          .data([value])
          .join(enter => enter.append("text").attr("y", yScale(value) - 4))
          .attr("class", "tooltip")
          .text(value => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
          .attr("x", xScale(index) + xScale.bandwidth() / 2)
          .attr("text-anchor", "middle")
          .transition()
          .attr("y", yScale(value) - 8)
          .attr("opacity", 1);
      })
      .on("mouseleave", () => svg.select(".tooltip").remove())
      .transition()
      .attr("height", value => dimensions.height - yScale(value))
      .attr("fill", (datapoint, i) => {
        switch (i) {
          case 0:
            return "#FFD177";
          case 1:
            return "#60D66C";
          default:
            return "#f89283";
        }
      });
  }, [myData, dimensions]);

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

export default BarChart;
