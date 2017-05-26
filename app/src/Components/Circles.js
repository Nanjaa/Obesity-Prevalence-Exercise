import React from 'react';
import Tooltip from './Tooltip.js';

class Circles extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tooltip: { display:false, value:''}
        };

        this.renderCircles=this.renderCircles.bind(this);
        this.showTooltip=this.showTooltip.bind(this);
        this.hideTooltip=this.hideTooltip.bind(this);
    }


    renderCircles() {
        return (coords, index) => {
            const circleProps = {
                cx: this.props.xScale(coords[0]),
                cy: this.props.yScale(coords[1]),
                r: 3,
                key: index
            };

            return <circle className={coords[2]} onMouseOver={this.showTooltip} onMouseOut={this.hideTooltip} data-value={coords[1].toFixed(2) +'%'} data-group={coords[3]} {...circleProps} data-sex={coords[4]} />;
        };
    };


    showTooltip(e){
        this.setState({
            tooltip:{
                display:true,
                value:e.target.getAttribute('data-value'),
                group: e.target.getAttribute('data-group'),
                metric: e.target.getAttribute('class'),
                sex: e.target.getAttribute('data-sex'),
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

    render(props) {
        return (
            <g>
                {this.props.data.map(this.renderCircles())}
                <Tooltip tooltip={this.state.tooltip} />
            </g>
        );
    }
};

export default Circles;