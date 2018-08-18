import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators }from 'redux';
import {Container, Row, Col, Button} from 'reactstrap';

import './App.css';
import UserAddress from "./components/UserAddress";
import { findMidpoint } from "./store/reducer_map";

class App extends Component {



    render() {
        return (
            <Container>
                <Row>
                    <Col xs='12' md={{size: 6}}>
                        <UserAddress/>
                    </Col>
                    <Col xs='12' md={{size: 6}}>
                        <UserAddress/>
                    </Col>
                    <Col xs='12' md={{size: 12}}>
                        <Button size='lg' color="secondary" onClick={() => this.props.findMidpoint()}>Find Something</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({findMidpoint: findMidpoint}, dispatch);
};

export default connect(null, mapDispatchToProps)(App);