import React, {Component} from 'react';
import { connect } from "react-redux";
import { Input, InputGroup, InputGroupAddon } from "reactstrap";
import PropTypes from 'prop-types';

import Map from "./Map";
import Search from "./Search";
import SearchResult from "./SearchResult";

class UserAddress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',
            searchResults: {}
        };

        // Binder required because I need to bind 'this' and use evt at the same time.
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        this.setState({
            input: evt.target.value
        });
    }

    handleSubmit(evt) {
        console.log("Fired!");
        evt.preventDefault();
        const keyword = this.state.input;
        if(keyword.length > 1){
            const search = new window.daum.maps.services.Places();
            search.keywordSearch(keyword, this.callback);
        }
    }

    callback(locations, status, pagination){
        if(status === window.daum.maps.services.Status.OK){
            this.setState({
                searchResults: this.state.searchResults[this.props.userNumber] = {locations,pagination}
            });
        }
        else{
            // Do something with failure
        }
    }


    render() {

        return (
            <div style={styles.container}>
                <div style={styles.innerContainer}>
                    <form onSubmit={this.handleSubmit}>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">주소</InputGroupAddon>
                            <Input onChange={this.handleChange} placeholder="예) 서울시 상암동"/>
                        </InputGroup>
                    </form>
                    <SearchResult searchResult={this.state.searchResults}/>
                    <div style={styles.mapContainer}>
                        <Map userNumber={this.props.userNumber} style={styles.map}/>
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