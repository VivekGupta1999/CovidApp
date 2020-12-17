import React, { Component } from 'react';
import { Container, Header, Content,Left, Body, Right, Title, Tab, Tabs } from 'native-base';
import Tab1 from './screens/tab1';
import Tab2 from './screens/tab2';
import Tab2 from './screens/tab3';

export default class TabsExample extends Component {
  render() {
    return (
      <Container>
        <Header style={{backgroundColor:'#2b3475'}} hasTabs>
            <Left/>
          <Body>
            <Title style={{color:'white'}}>News App</Title>
          </Body>
          <Right />
        </Header>
        <Tabs tabBarUnderlineStyle={{backgroundColor:'white'}}>
          <Tab tabStyle={{backgroundColor:'#2b3475'}} activeTabStyle={{backgroundColor:'#2b3475'}} textStyle={{color:'white'}} activeTextStyle={{color:'white'}} heading="General">
            <Tab1 />
          </Tab>
          <Tab tabStyle={{backgroundColor:'#2b3475'}} activeTabStyle={{backgroundColor:'#2b3475'}} textStyle={{color:'white'}} activeTextStyle={{color:'white'}} heading="Covid">
            <Tab2 />
          </Tab>
          <Tab tabStyle={{backgroundColor:'#2b3475'}} activeTabStyle={{backgroundColor:'#2b3475'}} textStyle={{color:'white'}} activeTextStyle={{color:'white'}} heading="Covid-discussions">
            <Tab3 />
          </Tab>
        
          
        </Tabs>
      </Container>
    );
  }
}