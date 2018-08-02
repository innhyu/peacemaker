import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { searchSuccess } from "../store/reducer_search";

class Search extends Component{

    constructor(props){
        super(props);

        this.state = {
            search: null
        }
    }

    componentDidMount(){
        const search = new window.daum.maps.services.Places();
        this.setState({
            search: search
        })
    }

    componentDidUpdate(){
        if(this.props.keyword.length > 1){
            this.state.search.keywordSearch(this.props.keyword, this.callback)
        }
    }

    callback(locations, status, pagination){
        console.log(a);
        console.log(c);
        console.log(b);
    }

    render(){
        return (
            <div></div>
        )
    }

}

Search.propTypes = {
    // Keyword to search with
    keyword: PropTypes.string.isRequired
};

function mapDispatchToProps(dispatch){
    return {
        searchSuccess: bindActionCreators(searchSuccess, dispatch)
    }
}

export default connect(mapDispatchToProps)(Search)