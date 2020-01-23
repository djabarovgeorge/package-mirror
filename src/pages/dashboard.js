import React from 'react';
import { Input } from 'antd';
import { socketService } from './socket.service';
import { useHistory, withRouter } from "react-router-dom";
import { createBrowserHistory } from 'history';

const { Search } = Input;

class Dashboard extends React.Component {
        socketConnected = false;
        async componentDidMount() {

        }

        searchQueue(queueName) {
                console.log(queueName)
                this.props.history.push('/queue/' + queueName);

        }

        render () {
                if(socketService.connection != null){
                        socketService.connection.stop();
                }
                return (
                        <div>
                                <Search
                                placeholder="input search text"
                                enterButton="Search"
                                onSearch={value => this.searchQueue(value)} />
                        </div>
                )
        }
}

export default withRouter(Dashboard);