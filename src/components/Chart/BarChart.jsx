import React, { Component } from "react";
import * as d3 from "d3";

class BarChart extends Component {
  componentDidMount() {
    const data = [2, 4, 3];
    this.drawBarChart(data);
  }

  drawBarChart(data) {
    const w =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    const canvasHeight = h / 2;
    const canvasWidth = w / 2;
    const scale = canvasHeight / (Math.max(...data) + Math.min(...data));

    const svgCanvas = d3
      .select(this.refs.canvas)
      .append("svg")
      .attr("width", canvasWidth)
      .attr("height", canvasHeight)
      .style("border", "2px solid #aaa")
      .style("background-color", "#fff")
      .style("border-radius", "10px");

    svgCanvas
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("width", canvasWidth / 4)
      .attr("height", datapoint => datapoint * scale)
      .attr(
        "x",
        (datapoint, iteration) =>
          canvasWidth / 40 + iteration * (canvasWidth / 3)
      )
      .attr("y", datapoint => canvasHeight - datapoint * scale)
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

    svgCanvas
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (datapoint, i) => canvasWidth / 40 + i * (canvasWidth / 3))
      .attr("y", (datapoint, i) => canvasHeight - datapoint * scale - 10)
      .text(datapoint => datapoint);
  }

  render() {
    return <div ref="canvas" style={{ marginTop: "5%" }} />;
  }
}

export default BarChart;
