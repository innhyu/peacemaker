import React, {Component} from 'react';
import {Container, Row, Col, Button} from 'reactstrap';

import './App.css';
import UserAddress from "./components/UserAddress";

export default class App extends Component {
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
                        <Button size='lg' color="secondary" onClick={() => {}}>Find Something</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const styles = {};