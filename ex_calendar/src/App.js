import React, {useState} from 'react'
import { Layout, Menu } from 'antd';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/styles';
import { HomeOutlined } from '@ant-design/icons';
import './App.css';

/*components*/
import Contentview from './views/Contentview'

const { Header, Content, Footer } = Layout;
const style = makeStyles({
  root: {
    padding: 0,
    margin: 0,
  },
  content: {
    //height: '90vh',
    padding: 10,
  },
  footer: {
    textAlign: 'center',
    height: 30,
    padding: 0,
    paddingTop: 5,
    fontSize: 8,
  }
});

const App = () => {
  const classes = style();

  return (
      <Layout className={classes.root}>
        <Header>
          <Menu theme="light" mode="horizontal">
            <Menu.Item key={1} icon={<HomeOutlined />}><Link to="/">Calendar</Link></Menu.Item>
            <Menu.Item key={4}><Link to="/planlist">일정 확인/추가/변경</Link></Menu.Item>
            <Menu.Item key={2}><Link to="/notice">공지 사항</Link></Menu.Item>
            <Menu.Item key={3}><Link to="/status">Status Check</Link></Menu.Item>
          </Menu>
        </Header>
        <Layout></Layout>
        <Content className={classes.content}>
          <Contentview/>
        </Content>
        <Footer className={classes.footer}>
          Project #1 ©2021 Created by Jihee Jun
        </Footer>
      </Layout>
  )
}

export default App
