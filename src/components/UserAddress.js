import React, {Component} from 'react';
import { connect } from "react-redux";
import { Input, InputGroup, InputGroupAddon } from "reactstrap";

import Map from "./Map";
import Search from "./Search";
import SearchResult from "./SearchResult";

class UserAddress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',
            keyword: ''
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
        evt.preventDefault();
        this.setState({
            keyword: this.state.input
        })
    }

    render() {

        console.log(this.props);
        return (
            <div style={styles.container}>
                <div style={styles.innerContainer}>
                    <form onSubmit={this.handleSubmit}>
                        <InputGroup style={styles.inputContainer}>
                            <InputGroupAddon addonType="prepend">주소</InputGroupAddon>
                            <Input onChange={this.handleChange} placeholder="예) 서울시 상암동"/>
                        </InputGroup>
                    </form>
                    <SearchResult searchResult={this.props.searchResult}/>
                    <Search keyword={this.state.keyword}/>
                    <div style={styles.mapContainer}>
                        <Map style={styles.map}/>
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
    inputContainer: {
        // flex: 0.2
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

function mapStateToProps({keyword, searchResult}){
    return{
        ...keyword,
        ...searchResult
    }
}

export default connect(mapStateToProps)(UserAddress);