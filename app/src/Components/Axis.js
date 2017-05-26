import React from 'react';
import * as d3 from 'd3';

class Axis extends React.Component {

    constructor(props) {
        super(props);

        this.renderAxis=this.renderAxis.bind(this);
        this.translateAxis=this.translateAxis.bind(this);
    }


    renderAxis(orient, scale) {
        var xNode = this.refs.xAxis;
        var xAxis = d3.axisBottom()
                .scale(this.props.xScale);

        var yNode = this.refs.yAxis;
        var yAxis = d3.axisLeft()
                .scale(this.props.yScale);

        d3.select(xNode).call(xAxis);
        d3.select(yNode).call(yAxis);
    }

    translateAxis(xy) {
        var translate;
        if(xy === 'x') {
            translate = `translate(0, ${this.props.height - this.props.padding})`;
            return translate;
        }
        else {
            translate = `translate(${this.props.padding}, 0)`;
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
                <text className="xAxis" textAnchor="left" x={(this.props.width-this.props.padding) / 2} y={this.props.height-5}>Age Start</text>

                <g className="axis" ref="yAxis" transform={this.translateAxis('y')}></g>
                <text className="yAxis" textAnchor="left" x={((this.props.height + this.props.padding) / 2) * -1} y="15" transform= "rotate(-90)">Prevalence as Percent</text>
            </g>
        );
    }
};

export default Axis;