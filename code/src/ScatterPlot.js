import React from 'react';

class ScatterPlot extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            width: 800,
            height: 300,
            padding: 30,
            data: [[1,2],[3,4],[5,6],[7,8],[9,10]]
        };
    }

    render(props) {
        return (
            <p>Scatter Plot</p>
        );
    }
};

export default ScatterPlot;