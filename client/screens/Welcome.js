import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import {
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  WelcomeContainer,
  WelcomeImage,
  Avatar,
} from '../components/styles';

const Welcome = ({ navigation, route }) => {
  const { name, email } = route.params;
  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage
          resizeMode="cover"
          source={require('../assets/img/nubelson-fernandes--Xqckh_XVU4-unsplash.jpg')}
        />
        <WelcomeContainer>
          <PageTitle welcome={true}>Welcome Buddy</PageTitle>
          <SubTitle welcome={true}>{name || 'soniya'}</SubTitle>
          <SubTitle welcome={true}>
            {email || 'soniyasonu0703@gmail.com'}
          </SubTitle>
          <StyledFormArea>
            <Avatar
              resizeMode="cover"
              source={require('../assets/img/profile.png')}
            />
            <Line />
            <StyledButton onPress={() => navigation.navigate('Login')}>
              <ButtonText>LogOut</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;
