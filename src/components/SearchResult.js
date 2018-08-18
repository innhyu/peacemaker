import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from "reactstrap";

import { mapChange } from '../store/reducer_map';

class SearchResult extends Component {

    render(){
        const searchResultItem = this.props.searchResult && this.props.searchResult.locations.map((location) =>
            (
            <ListGroupItem key={location.id} style={styles.card} onClick={() => this.props.showOnMap(this.props.userId, location.x, location.y)}>
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
        backgroundColor: '#EDE6D5',
        height: 35
    }
};

SearchResult.propTypes = {
    // The result array the Search Result will render; Can be empty when there's no result.
    searchResult: PropTypes.object,
    // Store - the function to run when an result item is clicked; changes the actual map location
    showOnMap: PropTypes.func.isRequired,
    // Unique Id of the user
    userId: PropTypes.string.isRequired
};

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        showOnMap: mapChange
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchResult);

