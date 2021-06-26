import React from 'react'
import { Layout, Menu } from 'antd';
import { makeStyles } from '@material-ui/styles';
import './App.css';

/*components*/
import Contentview from './view/Contentview'

const { Header, Content, Footer } = Layout;
const style = makeStyles({
  content: {
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
      <Layout>
        <Header>
          <Menu theme="white" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key={1}>Calendar</Menu.Item>
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
