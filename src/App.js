import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Container, Row, Col, Button} from 'reactstrap';

import './App.css';
import UserAddress from "./components/UserAddress";
import {findMidpoint} from "./store/reducer_map";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            showMidpoint: false
        };
    }

    componentDidMount() {
        this.addUser();
        this.addUser();
    }

    componentDidUpdate() {
        if(this.state.showMidpoint){
            this.buildMidpointMap();
        }
    }

    /**
     * Finds the midpoint and shows the midpoint map
     */
    findMidpoint = () => {
        this.props.findMidpoint();
        this.setState({
            showMidpoint: true
        });
    };

    /**
     * Builds the midpoint map object and puts it on the map
     */
    buildMidpointMap = () => {

        // Creating a map
        const container = document.getElementById('midPoint');

        const lat = this.props.midPoint.newLat;
        const lon = this.props.midPoint.newLon;
        const options = {
            center: new window.daum.maps.LatLng(lat, lon),
            level: 5
        };

        const midpointMap = new window.daum.maps.Map(container, options);

        // Creating markers
        Object.values(this.props.maps).forEach(map => {
            let marker = new window.daum.maps.Marker({
                position: new window.daum.maps.LatLng(map.y, map.x),
                opacity: 0.3
            });
            marker.setMap(midpointMap);
        });

        let midMarker = new window.daum.maps.Marker({
            position: new window.daum.maps.LatLng(lat, lon)
        });
        midMarker.setMap(midpointMap);
    };

    /**
     * Renders the UserAddress and adds it to the user list
     */
    addUser() {
        const user = (<Col xs='12' md={{size: 6}}>
            <UserAddress/>
        </Col>);

        const userList = this.state.users;
        userList.push(user);

        this.setState({
            users: userList
        });
    };

    render() {

        const midPointMap = (<Col style={styles.mapContainer} xs='12' md={{size: 12}}>
            <div id='midPoint' style={styles.midpointMap}/>
        </Col>);

        return (
            <Container>
                <Row>
                    {this.state.showMidpoint ? midPointMap : Object.values(this.state.users)}

                    {!this.state.showMidpoint
                        ? (
                            <Col style={styles.buttons} xs='12' md={{size: 12}}>
                                <Button style={styles.button} size='lg' color="secondary"
                                        onClick={() => this.addUser()}>친구
                                    추가하기</Button>
                                <Button style={styles.button} size='lg' color="primary"
                                        onClick={() => this.findMidpoint()}>중간지점
                                    찾기</Button>
                            </Col>
                        )
                        : null}
                </Row>
            </Container>
        );
    }
}

const styles = {
    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 15
    },
    button: {
        flex: 1
    },
    mapContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: 20
    },
    midpointMap: {
        width: 500,
        height: 500,
        backgroundColor: '#00D4FF',
        padding: 20
    }
};

function mapStateToProps({maps: {maps, midPoint}}) {
    return {
        maps: maps,
        midPoint
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({findMidpoint: findMidpoint}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);