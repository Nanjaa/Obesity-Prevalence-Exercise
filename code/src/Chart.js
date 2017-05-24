import React from 'react';
import d3 from 'd3';
import ScatterPlot from './ScatterPlot.js';

class Chart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            width: 800,
            height: 300,
            padding: 30,
            data: [[1,2],[3,4],[5,6],[7,8],[9,10]],
            xScale: undefined,
            yScale: undefined
        };
    }

    xMax(data) {
        var d3 = require('d3');
        return d3.max(data, (d) => d[0]);
    }
    yMax(data) {
        var d3 = require('d3');
        return d3.max(data, (d) => d[1]);
    }

    renderCircles() {
        var d3 = require('d3');

        var yScale = d3.scaleLinear()
                .domain([0, this.yMax(this.state.data)])
                .range([this.state.height - this.state.padding, this.state.padding]);

        var xScale = d3.scaleLinear()
                .domain([0, this.xMax(this.state.data)])
                .range([this.state.padding, this.state.width - this.state.padding * 2]);

        return (coords, index) => {
            const circleProps = {
                cx: xScale(coords[0]),
                cy: yScale(coords[1]),
                r: 2,
                key: index
            };
            return <circle {...circleProps}/>;
        };
    };

    render(props) {
        return (
            <div>
                <h1>Chart Below:</h1>
                <svg width={this.state.width} height={this.state.height}>
                    <g>
                        {this.state.data.map(this.renderCircles())}
                    </g>
                </svg>
            </div>
        );
    }
};

export default Chart;