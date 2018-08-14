import React, {Component} from 'react';
import { uniqueId } from 'lodash';

import Search from "./Search";
import Map from "./Map";

export default class UserAddress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: uniqueId()
        }
    }

    render() {

        return (
            <div style={styles.container}>
                <div style={styles.innerContainer}>
                    <Search userId={this.state.id} />
                    <div style={styles.mapContainer}>
                        <Map userId={this.state.id} style={styles.map}/>
                    </div>
                </div>
            </div>
        )
    }

}

const styles = {
    container: {
        padding: 30,
    },
    innerContainer: {
        padding: 30,
        width: '100%',
        height: '100%',
        background: '#6ECBFF',
    },
    mapContainer:{
        marginTop: 30,
        width: '100%',
        height: 500,
    },
    map: {
        width: '100%',
        height: '100%'
    }

};