import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';

import { MapLoad } from '../store/reducer_map';

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            map: null,
            yes: ''
        };

        this.setupMap = this.setupMap.bind(this);
    }

    componentDidMount() {
        this.setupMap();
        this.props.mapLoad(this.props.userId);
    }

    /**
     * Function that sets up the map div and saves the actual object to the state
     */
    setupMap() {
        const container = document.getElementById(this.props.userId);
        const options = { //지도를 생성할 때 필요한 기본 옵션
            center: new window.daum.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            level: 4 //지도의 레벨(확대, 축소 정도)
        };
        const map = new window.daum.maps.Map(container, options);

        this.setState({
            map: map
        });

    }

    componentDidUpdate() {
        const selfMap = this.props.maps[this.props.userId];
        const x = selfMap.x;
        const y = selfMap.y;
        const coords = new window.daum.maps.LatLng(y, x);
        this.state.map.setCenter(coords);
    }

    render() {
        return (
            <div id={this.props.userId} style={this.props.style}/>
        );
    }
}

Map.propTypes = {
    // Store - Function to run when the map component has been mounted
    mapLoad: PropTypes.func.isRequired,
    // Unique Id of the user
    userId: PropTypes.string.isRequired
};

function mapStateToProps({ maps }){
    return { ...maps };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        mapLoad: MapLoad
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);