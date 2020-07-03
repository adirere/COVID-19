import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

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
  const [myData, setMyData] = useState([10, 34, 64, 14, 28, 60, 50]);
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
      .domain([0, 150])
      .range([dimensions.height, 0]);

    const xAxis = d3.axisBottom(xScale).ticks(types.length);

    svg
      .select(".x-axis")
      .style("transform", `translateY(${dimensions.height}px)`)
      .call(xAxis);

    const yAxis = d3.axisRight(yScale);

    svg
      .select(".y-axis")
      .style("transform", `translateY(${dimensions.width}px)`)
      .call(yAxis);

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
          .text(value)
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
    <div ref={wrapperRef} style={{margin:"0 20%"}}>
      <svg ref={svgRef} style={{ overflow: "visible",  width: "75%"}}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );

  // const canvas = useRef(null);

  // useEffect(() => {
  //   if (confirmed) {
  //     const data = [confirmed.value, recovered.value, deaths.value];

  //     const w =
  //       window.innerWidth ||
  //       document.documentElement.clientWidth ||
  //       document.body.clientWidth;
  //     const h =
  //       window.innerHeight ||
  //       document.documentElement.clientHeight ||
  //       document.body.clientHeight;
  //     const canvasHeight = h / 2;
  //     const canvasWidth = w / 2;
  //     const scale = canvasHeight / (Math.max(...data) + Math.min(...data));

  //     const svgCanvas = d3
  //       .select(canvas.current)
  //       .append("svg")
  //       .attr("width", canvasWidth)
  //       .attr("height", canvasHeight)
  //       .style("border", "2px solid #aaa")
  //       .style("background-color", "#fff")
  //       .style("border-radius", "10px");

  //     svgCanvas
  //       .selectAll("rect")
  //       .data(data)
  //       .enter()
  //       .append("rect")
  //       .attr("width", canvasWidth / 4)
  //       .attr("height", datapoint => datapoint * scale)
  //       .attr(
  //         "x",
  //         (datapoint, iteration) =>
  //           canvasWidth / 40 + iteration * (canvasWidth / 3)
  //       )
  //       .attr("y", datapoint => canvasHeight - datapoint)
  //       .attr("fill", (datapoint, i) => {
  //         switch (i) {
  //           case 0:
  //             return "#FFD177";
  //           case 1:
  //             return "#60D66C";
  //           default:
  //             return "#f89283";
  //         }
  //       })
  //       .append("title")
  //       .text(datapoint => datapoint);

  //     svgCanvas
  //       .selectAll("rect")
  //       .transition()
  //       .attr("y", datapoint => canvasHeight - datapoint * scale);

  //     svgCanvas.exit().remove();
  //   }
  // }, [confirmed, recovered, deaths]);

  // return <div ref={canvas} style={{ marginTop: "5%" }} />;
};

export default BarChart;
