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
            this.state.search.keywordSearch(this.props.keyword, this.callback)
        }
    }

    callback(locations, status, pagination){
        if(status === window.daum.maps.services.Status.OK){
            this.props.searchSuccess({locations, pagination});
        }
        else{
            // Do something with failure
        }
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
    return bindActionCreators({searchSuccess: searchSuccess}, dispatch);
}

export default connect(null, mapDispatchToProps)(Search)