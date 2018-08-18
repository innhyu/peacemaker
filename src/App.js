import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Container, Row, Col, Button} from 'reactstrap';

import './App.css';
import UserAddress from "./components/UserAddress";
import {findMidpoint} from "./store/reducer_map";
import SearchResult from "./components/SearchResult";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            searchResult: null,
            showMidpoint: false
        };
    }

    componentDidMount() {
        this.addUser();
        this.addUser();
    }

    componentDidUpdate() {
        if (this.state.showMidpoint) {
            this.buildMidpointMap();
        }
    }

    /**
     * Finds the midpoint and shows the midpoint map
     */
    findMidpoint = () => {
        this.props.findMidpoint();

        // Searching some categorical stuff

        const lat = this.props.midPoint.newLat;
        const lon = this.props.midPoint.newLon;

        const callback = (result, status) => {
            if (status === window.daum.maps.services.Status.OK) {
                console.log(result);
                this.setState({
                    searchResult: {locations: result}
                })
            }
        };

        const search = new window.daum.maps.services.Places();
        search.categorySearch('CE7', callback, {
            location: new window.daum.maps.LatLng(lat, lon)
        });

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

        // Creating new bound
        const bounds = new window.daum.maps.LatLngBounds();

        // Creating markers
        Object.values(this.props.maps).forEach(map => {
            let markerPosition = new window.daum.maps.LatLng(map.y, map.x);
            let marker = new window.daum.maps.Marker({
                position: markerPosition,
                opacity: 0.6
            });
            marker.setMap(midpointMap);
            bounds.extend(markerPosition);
        });

        let midMarker = new window.daum.maps.Marker({
            position: new window.daum.maps.LatLng(lat, lon)
        });
        midMarker.setMap(midpointMap);

        // Extending map to show all markers
        midpointMap.setBounds(bounds);
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

        console.log(this.state);
        console.log(this.props);

        const midPointMap = (<Col style={styles.mapContainer} xs='12' md={{size: 12}}>
            <div id='midPoint' style={styles.midpointMap}/>
        </Col>);

        const resultArray = (<Col xs='12' md={{size: 12}}>
            <SearchResult userId= {0} searchResult = {this.state.searchResult} />
        </Col>);

        const buttons = (<Col style={styles.buttons} xs='12' md={{size: 12}}>
            <Button style={styles.button} size='lg' color="secondary"
                    onClick={() => this.addUser()}>친구
                추가하기</Button>
            <Button style={styles.button} size='lg' color="primary"
                    onClick={() => this.findMidpoint()}>중간지점
                찾기</Button>
        </Col>);

        return (
            <Container>
                <Row>
                    {this.state.showMidpoint ? midPointMap : Object.values(this.state.users)}
                    {!this.state.showMidpoint ? buttons: resultArray}
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