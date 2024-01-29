import { useContext, useState } from 'react'
import { Button, ButtonText, Center, VStack, Box, ChevronsRightIcon, Text, Image, InfoIcon, } from '@gluestack-ui/themed';

import {
  View,
  StyleSheet
} from 'react-native';

export default function WelcomeScreen({ navigation }) {
  const handleSignIn = () => {
    navigation.navigate('Login')
  }

  const handleSignUpButton = () => {
    navigation.navigate('Sign Up')
  }

  const renderBtns = () => {
    return (
      <Box ml="$10" mr="$10" mt={100}>
        <Button h={'auto'} style={s.btnMain} onPress={handleSignIn}>
          <ButtonText color='#DA3738' style={s.textSize} padding={'$4.5'}>Sign In</ButtonText>
        </Button>
        <Button variant="link" mt="$2" size="lg" onPress={handleSignUpButton}>
          <ButtonText color={'white'} style={s.textSize2} >No Account Yet?</ButtonText>
        </Button>
      </Box>
    )
  }

  return (
    <View style={s.loginScreen}>
      <View style={s.half1}>
        <Image source={require('../assets/ninonglogo.png')} style={s.imageLogo} resizeMode="contain" alt="logo" />
      </View>
      <View style={s.half2}>
        {renderBtns()}
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  loginScreen: {
    flex: 1,
    backgroundColor: '#DA3639',
  },
  half1: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  half2: {
    flex: 1
  },
  imageLogo: {
    width: 500,
    height: 350,
    marginTop: 100
  },
  btnMain: {
    borderRadius: 100,
    backgroundColor: "white"
  },
  textSize: {
    fontSize: 30
  },
  textSize2: {
    fontSize: 20
  }
});