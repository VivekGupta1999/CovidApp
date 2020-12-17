import React, { Component } from 'react';
import { Container, Header, Content,Left, Body, Right, Title, Tab, Tabs } from 'native-base';
import Tab1 from './tab1';
import Tab2 from './tab2';

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
        
          
        </Tabs>
      </Container>
    );
  }
}