import React from 'react';
import logo from './logo.svg';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dashboard from './pages/dashboard';
import QueuePage from './pages/queue.page';
import QueueNotFound from './pages/errors/queue.not.found';
import SignalrNotConnected from './pages/errors/signalr.not.connected';
import ExceptionSignalR from './pages/errors/exception.signalr';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


function App() {
  return (
    <Router>
    <Layout>
    <Header className="header">
      <div className="logo" />
      <div className="title">Package Mirror</div>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Layout style={{ padding: '24px 0', background: '#fff' }}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}>
              <Menu.Item key="1" >
                <Icon type="mail" />
                  Search Package
                  <Link to="/dashboard"/>
              </Menu.Item>
          </Menu>
        </Sider>

        <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/queue/:queueId">
            <QueuePage />
          </Route>
          <Route path="/SignalrNotConnected">
            <SignalrNotConnected/>
          </Route>
          <Route path="/QueueNotFound">
            <QueueNotFound/>
          </Route>
          <Route path="/ExceptionSignalR">
            <ExceptionSignalR/>
          </Route>
          <Route exact path="/">
            <Dashboard />
          </Route>
        </Switch>
        </Content>

      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Gosha LTD</Footer>
  </Layout>
  </Router>
  );
}

export default App;
