import React, {Component} from 'react';
import {Input, InputGroup, InputGroupAddon} from "reactstrap";
import PropTypes from 'prop-types';

import SearchResult from "./SearchResult";

export default class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            search: null,
            keyword: '',
            searchResult: null
        };

        this.callback = this.callback.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        const search = new window.daum.maps.services.Places();
        this.setState({
            search: search
        })
    }

    componentDidUpdate() {
        if (this.state.keyword.length > 1) {
            console.log("Search: Keyword Searching with " + this.state.keyword);
            this.state.search.keywordSearch(this.state.keyword, this.callback)
        }
    }

    callback(locations, status, pagination) {
        if (status === window.daum.maps.services.Status.OK) {
            console.log("Search: Keyword Search Success");
            this.setState({
                searchResult: {locations, pagination}
            });
        }
        else {
            console.log("Search: Keyword Search Failure");
            // Do something with failure
        }
    }

    handleChange(evt) {
        this.setState({
            input: evt.target.value
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        const keyword = this.state.input;
        if (keyword.length > 1) {
            const search = new window.daum.maps.services.Places();
            search.keywordSearch(keyword, this.callback);
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">주소</InputGroupAddon>
                        <Input onChange={this.handleChange} placeholder="예) 서울시 상암동"/>
                    </InputGroup>
                </form>
                <SearchResult userId={this.props.userId} searchResult={this.state.searchResult}/>
            </div>
        )
    }

}

Search.propTypes = {
    // Unique Id of the user
    userId: PropTypes.string.isRequired
};