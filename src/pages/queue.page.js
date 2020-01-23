import React from 'react';
import { withRouter } from 'react-router-dom';
import { socketService } from './socket.service';
import Highlighter from 'react-highlight-words';
import { Table, Icon, Tag, Statistic,Input ,Button } from 'antd';

class QueuePage extends React.Component {
        
        state = {
                messages: [],
                loading: true,
                searchText: '',
                searchedColumn: ''
        };

        async componentDidMount() {
                try {
                        await socketService.initSocket();
                } catch (error) {
                        console.log("Could not reconnect Could not reconnect Could not reconnect Could not reconnect ")                        
                }

                socketService.connection.on("Excepion", exceptionDetails => {
                        console.log(`Excepion From Server ${exceptionDetails}`)
                        this.props.history.push('/ExceptionSignalR');

                });
          
                socketService.connection.on("MessageReceived", message => {
                        let messages = this.state.messages;
                        messages.push(JSON.parse( message ));
                        this.setState({messages: messages})
                });
          
                socketService.connection.on("PackageFound", userName => {
                        console.log("PackageFound")
                });
                
                socketService.connection.on("PackageNotFound", () => {
                        this.props.history.push('/QueuenotFound');
                });
                
                try {
                        await socketService.start();
                } catch (error) {
                        this.props.history.push('/SignalrNotConnected');
                }

                const connectionId = socketService.connection.connectionId;
                const response = await fetch('https://localhost:5001/api/QueueMessages/', {
                                method: 'POST',
                                headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                        QueueName: this.props.match.params.queueId,
                                        ConnectionId: connectionId,
                                })
                        });

                var jsonResponse = await response.json()

                try {
                        if(jsonResponse.status == "500")
                        {
                                this.props.history.push('/QueueNotFound');
        
                        }       
                } catch (error) {
                        
                }
                       
                this.setState({loading: false})
                
        }

        getColumnSearchProps = dataIndex => ({
                filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                        <div style={{ padding: 8 }}>
                        <Input
                        ref={node => {
                        this.searchInput = node;
                        }}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                        />
                        <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon="search"
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                        >
                        Search
                        </Button>
                        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                        </Button>
                        </div>
                ),
                filterIcon: filtered => (
                        <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
                ),
                onFilter: (value, record) =>
                        record[dataIndex]
                        .toString()
                        .toLowerCase()
                        .includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: visible => {
                        if (visible) {
                        setTimeout(() => this.searchInput.select());
                        }
                },
                render: text =>
                        this.state.searchedColumn === dataIndex ? (
                        <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[this.state.searchText]}
                        autoEscape
                        textToHighlight={text.toString()}
                        />
                        ) : (
                        text
                        ),
                });
                
        handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
        });
        };
        
        handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
        };


                
        render () {
                const columns = [
                        {
                          title: 'Time',
                          dataIndex: 'Time',
                          key: 'Time',
                          width: '30%',
                          ...this.getColumnSearchProps('Time'),
                        },
                        {
                          title: 'RandomNumber',
                          dataIndex: 'RandomNumber',
                          key: 'RandomNumber',
                          width: '20%',
                          ...this.getColumnSearchProps('RandomNumber'),
                        },
                        {
                          title: 'Message',
                          dataIndex: 'Message',
                          key: 'Message',
                          ...this.getColumnSearchProps('Message'),
                        },
                      ];

                return (

                        <div>
                                <Statistic
                                        title="Active"
                                        value={this.state.messages.length}
                                        precision={0}
                                        valueStyle={{ color: '#3f8600' }}
                                        prefix={<Icon type="arrow-up" />}
                                        suffix=""
                                        />
                                <br />
                                <Table loading={this.state.loading} rowKey="RandomNumber" columns={columns} dataSource={this.state.messages} />

                        </div>
                )
        }
}

export default withRouter(QueuePage);