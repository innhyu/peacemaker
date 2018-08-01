import React, {Component} from 'react';
import {Input, InputGroup, InputGroupAddon} from "reactstrap";

import Map from "./Map";
import Search from "./Search";
import { connect } from "react-redux";

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
        console.log(this.props.keyword);

        return (
            <div style={styles.container}>
                <div style={styles.innerContainer}>
                    <form onSubmit={this.handleSubmit}>
                        <InputGroup style={styles.smallContainer}>
                            <InputGroupAddon addonType="prepend">주소</InputGroupAddon>
                            <Input onChange={this.handleChange} placeholder="예) 서울시 상암동"/>
                        </InputGroup>
                    </form>
                    <Search keyword={this.state.keyword}/>
                    <Map style={styles.mapContainer}/>
                </div>
            </div>
        )
    }

}

const styles = {
    container: {
        padding: 30,
        height: 600,
    },
    innerContainer: {
        padding: 30,
        width: '100%',
        height: '100%',
        background: '#6ECBFF',
    },
    smallContainer: {
        // flex: 0.2
    },
    mapContainer: {
        marginTop: '20%',
        width: '100%',
        height: '70%'
    }

};

function mapStateToProps(state){
    return{
        keyword: state.keyword
    }
}

export default connect(mapStateToProps)(UserAddress);