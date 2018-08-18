import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Container, Row, Col, Button} from 'reactstrap';

import './App.css';
import UserAddress from "./components/UserAddress";
import {findMidpoint} from "./store/reducer_map";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            showMidpoint: false
        };
    }

    componentDidMount() {
        this.addUser();
        this.addUser();
    }

    /**
     * Finds the midpoint and shows the midpoint map
     */
    findMidpoint = () => {
        this.props.findMidpoint();
        this.setState({
            showMidpoint: true
        });
    };

    /**
     * Renders the UserAddress and adds it to the user list
     */
    addUser() {
        const user = (<Col xs='12' md={{size: 6}}>
            <UserAddress/>
        </Col>);

        const userList = this.state.users;
        userList.push(user);

        this.setState({
            userList
        });
    };

    render() {

        return (
            <Container>
                <Row>
                    {this.state.showMidpoint ? null : Object.values(this.state.users)}
                    <Col style={styles.buttons} xs='12' md={{size: 12}}>
                        <Button style={styles.button} size='lg' color="secondary" onClick={() => this.addUser()}>친구 추가하기</Button>
                        <Button style={styles.button} size='lg' color="primary" onClick={() => this.findMidpoint()}>중간지점 찾기</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const styles = {
    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 15
    },
    button: {
        flex: 1
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({findMidpoint: findMidpoint}, dispatch);
}

export default connect(null, mapDispatchToProps)(App);