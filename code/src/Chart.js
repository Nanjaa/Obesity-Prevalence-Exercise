import React from 'react';
import d3 from 'd3';
import allData from './data.CSV';
import cb from './codebook.CSV';
import Tooltip from './Tooltip.js';

class Chart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            width: 800,
            height: 500,
            padding: 30,
            data: [],
            year: 'Loading',
            allYears: [],
            value: '1990',
            tooltip: { display:false, value:''}
        };

        this.xMax=this.xMax.bind(this);
        this.yMax=this.yMax.bind(this);
        this.xScale=this.xScale.bind(this);
        this.yScale=this.yScale.bind(this);
        this.renderCircles=this.renderCircles.bind(this);
        this.renderAxis=this.renderAxis.bind(this);
        this.translateAxis=this.translateAxis.bind(this);
        this.pullInfo=this.pullInfo.bind(this);
        this.getOptions=this.getOptions.bind(this);
        this.updateYear=this.updateYear.bind(this);
        this.showTooltip=this.showTooltip.bind(this);
        this.hideTooltip=this.hideTooltip.bind(this);
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
                r: 3,
                key: index
            };

            return <circle onMouseOver={this.showTooltip} onMouseOut={this.hideTooltip} data-value={coords[0] + ', ' + coords[1].toFixed(2) +'%'} {...circleProps}/>;
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
        if(xy === 'x') {
            var translate = `translate(0, ${this.state.height - this.state.padding})`;
            return translate;
        }
        else {
            var translate = `translate(${this.state.padding}, 0)`;
            return translate;
        }
        
    }

    pullInfo() {
        var d3 = require('d3');

        d3.csv(allData, function(data) {
            for(var i=0; i<data.length; i++) {
                if(data[i].year === this.state.value && data[i].location === 'USA') {
                    var currState = this.state.data;
                    
                    currState.push([data[i].age_start, data[i].mean*100]);
                }
            }

            this.setState({
                year: this.state.value
            })
            this.renderAxis();
        }.bind(this))
    }

    getOptions() {
        var d3 = require('d3');
        d3.csv(cb, function(data) {
            var allYears = data[3][ 'Value Coding' ];
            allYears = allYears.split('; ');

            this.setState({
                allYears: allYears
            });
        }.bind(this));
    }

    updateYear(event) {
        this.setState({
            value: event.target.value,
            year: 'Loading',
            data: []
        });


        this.pullInfo();
    }

    showTooltip(e){
        e.target.setAttribute('fill', '#FFFFFF');
     
        this.setState({
            tooltip:{
                display:true,
                value:e.target.getAttribute('data-value'),
                pos:{
                    x:e.target.getAttribute('cx'),
                    y:e.target.getAttribute('cy')
                }
     
            }
        });
    }

    hideTooltip(e){
        e.target.setAttribute('fill', '#7dc7f4');
        this.setState({
            tooltip:{ display:false, value:''}
        });
    }

    componentDidMount() {
        this.pullInfo();
        this.getOptions();
    }

    render(props) {
        return (
            <div>
                <h1>Obesity Prevalence as Percent in the USA by Year and Age</h1>
                <h2>-{this.state.year}-</h2>
                <h3>Change year:</h3>
                <select value={this.state.value} onChange={this.updateYear}>
                    {this.state.allYears.map(function(val) {
                        return <option key={val} value={val}>{val}</option>
                    })}
                </select>

                <svg width={this.state.width} height={this.state.height + 50}>
                    <g ref="circles">
                        {this.state.data.map(this.renderCircles())}
                        <Tooltip tooltip={this.state.tooltip} />
                    </g>

                    <g className="axis" ref="xAxis" transform={this.translateAxis('x')}></g>
                    <text className="xAxis" textAnchor="left" x={this.state.width / 2} y={this.state.height + 10}>Age Start</text>

                    <g className="axis" ref="yAxis" transform={this.translateAxis('y')}></g>
                    <text className="yAxis" textAnchor="left" x={(this.state.height / 2) * -1} y="0" transform= "rotate(-90)">Prevalence as Percent</text>
                    
                </svg>
            </div>
        );
    }
};

export default Chart;