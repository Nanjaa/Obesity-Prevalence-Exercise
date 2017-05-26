import React from 'react';

class Tooltip extends React.Component {
    render() {
        var visibility = 'hidden',
            transform = '',
            x = 0,
            y = 0,
            width = 200,
            height = 115,
            transformText = 'translate(' + width/2 + ',' + (height/2-5) + ')',
            transformArrow = '';

        if(this.props.tooltip.display === true) {
            var position = this.props.tooltip.pos;

            x = position.x;
            y = position.y;
            visibility = 'visible';

            if(y > height+30) {
                transform = 'translate(' + (x-width/2) + ',' + (y-height-20) + ')';
                transformArrow = 'translate(' + (width/2-20) + ',' + (height-2) + ')';
            }
            else if(y < height+30) {
                transform = 'translate(' + (x-width/2) + ',' + (Math.round(y)+20) + ')';
                transformArrow = 'translate(' + (width/2-20) + ',' + 0 + ') rotate(180,20,0)';
            }
            else {
                visibility = 'hidden';
            }


            return(
                <g transform={transform}>
                    <rect class="shadow" is width={width} height={height} rx="5" ry="5" visibility={visibility} fill="#b1afaf" opacity=".9"/>
                    <polygon is points="10,0  30,0  20,10" transform={transformArrow}
                             fill="#b1afaf" opacity=".9" visibility={visibility}/>

                    <foreignObject width={width} height={height} text-anchor="middle">
                        <div className="wrap" text-anchor="middle">
                            <div>
                                <p xmlns="http://www.w3.org/1999/xhtml">{this.props.tooltip.metric}</p>
                                <p xmlns="http://www.w3.org/1999/xhtml">{this.props.tooltip.group}</p>
                                <p xmlns="http://www.w3.org/1999/xhtml">{this.props.tooltip.sex}</p>
                                <p xmlns="http://www.w3.org/1999/xhtml">{this.props.tooltip.value}</p>
                            </div>
                        </div>
                    </foreignObject>
                </g>
            )
        }
        else {
            return(
                null
            )
        }
    }
}

export default Tooltip