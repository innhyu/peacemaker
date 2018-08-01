import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from "reactstrap";

export default class SearchResult extends Component {

    render(){
        const searchResultItem = this.props.resultArray ? this.props.resultArray.map((item) => <ListGroupItem>{item}</ListGroupItem>) : null;

        return (
            <ListGroup>
                {searchResultItem}
            </ListGroup>
        )
    }

}

SearchResult.propTypes = {
    // The result array the Search Result will render; Can be empty when there's no result.
    resultArray: PropTypes.object
};