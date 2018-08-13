import React, {Component} from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import Search from "./Search";
import SearchResult from "./SearchResult";

class UserAddress extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div style={styles.container}>
                <div style={styles.innerContainer}>
                    <Search />
                    {/*<SearchResult searchResult={this.state.searchResults}/>*/}
                    {/*<div style={styles.mapContainer}>*/}
                        {/*<Map userNumber={this.props.userNumber} style={styles.map}/>*/}
                    {/*</div>*/}
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

UserAddress.propTypes = {
    // The unique identifying number for this particular instance
    userNumber: PropTypes.number.isRequired
};

function mapStateToProps({keyword, searchResult}){
    return{
        ...keyword,
        ...searchResult
    }
}

export default connect(mapStateToProps)(UserAddress);