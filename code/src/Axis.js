import React from 'react';
import d3 from 'd3';

class Axis extends React.Component {

    constructor(props) {
        super(props);

        this.renderAxis=this.renderAxis.bind(this);
        this.translateAxis=this.translateAxis.bind(this);
    }


    renderAxis(orient, scale) {
        var d3 = require('d3');

        var xNode = this.refs.xAxis;
        var xAxis = d3.axisBottom()
                .scale(this.props.xScale);

        var yNode = this.refs.yAxis;
        var yAxis = d3.axisLeft()
                .scale(this.props.yScale);

        d3.select(xNode).call(xAxis);
        d3.select(yNode).call(yAxis);

        console.log(yNode);
    }

    translateAxis(xy) {
        if(xy === 'x') {
            var translate = `translate(0, ${this.props.height - this.props.padding})`;
            return translate;
        }
        else {
            var translate = `translate(${this.props.padding}, 0)`;
            return translate;
        }
        
    }

    componentWillMount() {
        this.renderAxis();
    }
    componentDidUpdate() {
        this.renderAxis();
    }

    render(props) {
        return (
            <g>
                <g className="axis" ref="xAxis" transform={this.translateAxis('x')}></g>
                <text className="xAxis" textAnchor="left" x={this.props.width / 2} y={this.props.height + 10}>Age Start</text>

                <g className="axis" ref="yAxis" transform={this.translateAxis('y')}></g>
                <text className="yAxis" textAnchor="left" x={(this.props.height / 2) * -1} y="0" transform= "rotate(-90)">Prevalence as Percent</text>
            </g>
        );
    }
};

export default Axis;