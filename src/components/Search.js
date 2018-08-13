import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, InputGroup, InputGroupAddon } from "reactstrap";

import { searchSuccess } from "../store/reducer_search";

/** TODO Remove sample console.logs and actually do work; Good for now **/
class Search extends Component{

    constructor(props){
        super(props);

        this.state = {
            search: null
        };

        this.callback = this.callback.bind(this);
    }

    componentDidMount(){
        const search = new window.daum.maps.services.Places();
        this.setState({
            search: search
        })
    }

    componentDidUpdate(){
        if(this.props.keyword.length > 1){
            console.log("Search: Keyword Searching with " + this.props.keyword);
            this.state.search.keywordSearch(this.props.keyword, this.callback)
        }
    }

    callback(locations, status, pagination){
        if(status === window.daum.maps.services.Status.OK){
            console.log("Search: Keyword Search Success");
            // this.props.searchSuccess({locations, pagination});
        }
        else{
            console.log("Search: Keyword Search Failure");
            // Do something with failure
        }
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">주소</InputGroupAddon>
                    <Input onChange={this.handleChange} placeholder="예) 서울시 상암동"/>
                </InputGroup>
            </form>
        )
    }

}

Search.propTypes = {
    // Keyword to search with
    keyword: PropTypes.string.isRequired
};

function mapDispatchToProps(dispatch){
    return bindActionCreators({searchSuccess: searchSuccess}, dispatch);
}

export default connect(null, mapDispatchToProps)(Search)