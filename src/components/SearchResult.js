import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from "reactstrap";

export default class SearchResult extends Component {

    render(){
        const searchResultItem = this.props.searchResult && this.props.searchResult.locations.map((location) =>
            (
            <ListGroupItem key={location.id} style={styles.card}>
                <ListGroupItemHeading style={styles.mainText}>{location.place_name}</ListGroupItemHeading>
                <ListGroupItemText style={styles.subText}>{location.address_name}</ListGroupItemText>
                <ListGroupItemText style={styles.subText}>{location.road_address_name}</ListGroupItemText>
            </ListGroupItem>
            )
        );

        if(!searchResultItem){
            return null;
        }
        else {
            // More than 4 cards, then it will overflow.
            const scrollBar = this.props.searchResult.locations.length > 4 ? {...styles.container, ...styles.scrollerActive} : styles.container ;

            return (
                <div>
                    <div style={scrollBar}>
                        <ListGroup>
                            {searchResultItem}
                        </ListGroup>
                    </div>
                    <div style={styles.footer}>
                    </div>
                </div>
            )
        }
    }

}

const styles = {
    scrollerActive:{
        overflowY: 'scroll'
    },
    container:{
        backgroundColor: '#FFF7E2',
        maxHeight: 300,
        marginTop: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    card: {
        paddingTop: 10,
        paddingBottom: 10
    },
    mainText:{
        fontSize: 15
    },
    subText:{
        fontSize: 11,
        margin: 0,
    },
    footer:{
        backgroundColor: 'white',
        height: 35
    }
};

SearchResult.propTypes = {
    // The result array the Search Result will render; Can be empty when there's no result.
    searchResult: PropTypes.object
};