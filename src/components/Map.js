import React, {Component} from 'react';
import { uniqueId } from 'lodash';

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: uniqueId(),
            map: null
        }
    }

    componentDidMount() {
        const container = document.getElementById(this.state.id);
        const options = { //지도를 생성할 때 필요한 기본 옵션
            center: new window.daum.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            level: 4 //지도의 레벨(확대, 축소 정도)
        };
        const map = new window.daum.maps.Map(container, options);

        this.setState({
            map: map
        });
    }

    render() {
        return (
            <div id={this.state.id} style={this.props.style}/>
        );
    }
}