import React from 'react';
import d3 from 'd3';
import allData from './data.CSV';
import cb from './codebook.CSV';
import Tooltip from './Tooltip.js';
import Axis from './Axis.js';

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

            return <circle className={coords[2]} onMouseOver={this.showTooltip} onMouseOut={this.hideTooltip} data-value={coords[1].toFixed(2) +'%'} data-group={coords[3]} {...circleProps}/>;
        };
    };

    pullInfo() {
        var d3 = require('d3');

        d3.csv(allData, function(data) {
            for(var i=0; i<data.length; i++) {
                if(data[i].year === this.state.value && data[i].location === 'USA') {
                    var currState = this.state.data;
                    
                    currState.push(
                        [
                            data[i].age_start,
                            data[i].mean*100,
                            data[i].metric,
                            data[i].age_group
                        ]
                    );
                }
            }

            this.setState({
                year: this.state.value
            })
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
        this.setState({
            tooltip:{
                display:true,
                value:e.target.getAttribute('data-value'),
                group: e.target.getAttribute('data-group'),
                metric: e.target.getAttribute('class'),
                pos:{
                    x:e.target.getAttribute('cx'),
                    y:e.target.getAttribute('cy')
                }
            }
        });
    }

    hideTooltip(e){
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
                <h1>Obesity Prevalence as Percent in the USA by Year</h1>
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

                    <Axis xScale={this.xScale(0,true)} yScale={this.yScale(0,true)} height={this.state.height} width={this.state.width} padding={this.state.padding} />
                    
                </svg>
            </div>
        );
    }
};

export default Chart;