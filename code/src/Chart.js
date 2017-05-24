import React from 'react';
import d3 from 'd3';

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

    xScale(num, needFunc) {
        var d3 = require('d3');
        var xNum = d3.scaleLinear()
                .domain([0, this.xMax(this.state.data)])
                .range([this.state.padding, this.state.width - this.state.padding * 2]);
        if(needFunc) {
            return xNum;
        }
        else {
            return xNum(num);
        }
    }
    yScale(num, needFunc) {
        var d3 = require('d3');
        var yNum = d3.scaleLinear()
                .domain([0, this.yMax(this.state.data)])
                .range([this.state.height - this.state.padding, this.state.padding]);
        if(needFunc) {
            return yNum;
        }
        else {
            return yNum(num)
        }
    }


    renderCircles() {
        return (coords, index) => {
            const circleProps = {
                cx: this.xScale(coords[0]),
                cy: this.yScale(coords[1]),
                r: 2,
                key: index
            };
            return <circle {...circleProps}/>;
        };
    };

    renderAxis(orient, scale) {
        var d3 = require('d3');

        var xNode = this.refs.xAxis;
        var xAxis = d3.axisBottom()
                .scale(this.xScale(0, true));

        var yNode = this.refs.yAxis;
        var yAxis = d3.axisLeft()
                .scale(this.yScale(0, true));

        d3.select(xNode).call(xAxis);
        d3.select(yNode).call(yAxis);
    }

    translateAxis(xy) {
        if(xy == 'x') {
            var translate = `translate(0, ${this.state.height - this.state.padding})`;
            return translate;
        }
        else {
            var translate = `translate(${this.state.padding}, 0)`;
            return translate;
        }
        
    }

    componentDidMount() {
        this.renderAxis();
    }

    render(props) {
        return (
            <div>
                <h1>Chart Below:</h1>
                <svg width={this.state.width} height={this.state.height}>
                    <g>
                        {this.state.data.map(this.renderCircles())}
                    </g>

                    <g className="axis" ref="xAxis" transform={this.translateAxis('x')}></g>
                    <g className="axis" ref="yAxis" transform={this.translateAxis('y')}></g>
                    
                </svg>
            </div>
        );
    }
};

export default Chart;