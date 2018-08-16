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
            marker: null
        };

    }

    componentDidMount() {
        this.setupMapAndMarker();
        this.props.mapLoad(this.props.userId);
    }

    /**
     * Function that return (renders really, but no work with rendering here) the map container
     * after doing some pre-processes
     */
    renderMapContainer = () => {
        this.moveMapAndMark();
        return (<div id={this.props.userId} style={this.props.style}/>);
    };

    /**
     * Function that sets up the map div and saves the actual object to the state
     */
    setupMapAndMarker = () => {
        const container = document.getElementById(this.props.userId);
        const options = {
            center: new window.daum.maps.LatLng(33.450701, 126.570667),
            level: 4
        };
        // Creating a map
        const map = new window.daum.maps.Map(container, options);

        // Creating a marker and hooking it up to the map
        const marker = new window.daum.maps.Marker({
            position: new window.daum.maps.LatLng(33.450701, 126.570667)
        });
        marker.setMap(map);

        this.setState({
            map: map,
            marker: marker
        });

    };

    /**
     * Moves map's center location to newly updated, and set up a marker
     */
    moveMapAndMark = () => {
        const selfMap = this.props.maps[this.props.userId];
        if(selfMap) {
            const x = selfMap.x;
            const y = selfMap.y;
            const coords = new window.daum.maps.LatLng(y, x);

            this.state.map.setCenter(coords);
            this.state.marker.setPosition(coords);
        }
    };

    render() {
        return this.renderMapContainer();
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