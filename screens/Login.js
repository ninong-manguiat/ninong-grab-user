import { useContext, useEffect, useState } from 'react'
import { Box, Center, Divider, HStack, Heading, Icon, Image, Pressable, ScrollView, VStack } from '@gluestack-ui/themed';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import {
  View,
  StyleSheet
} from 'react-native';
import { signInUser } from '../util/auth';
import AlertComponent from '../components/AlertComponent';
import { AuthContext } from '../store/auth-context';
import { useDispatch } from 'react-redux';
import { appendUser } from '../store/redux/appSlice'
import { Animated } from "react-native";
import { ChevronLeftIcon } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation()
  const [loadingAuthentication, setAuthentication] = useState(false)
  const authCtx = useContext(AuthContext)
  const [form, setForm] = useState({
    identifier: 'test@test.com',
    pass: ''
  })
  const [alert, setAlert] = useState({
    text: '',
    subText: '',
    show: false
  })

  const av = new Animated.Value(0);
  av.addListener(() => { return });

  const dispatch = useDispatch()

  const handleForgotPassword = () => {
    return (
      <></>
    )
  }

  const handleBackLogin = () => {
    navigation.navigate('WelcomeScreen')
  }

  const handleSubmit = async () => {
    setAuthentication(true)
    try {
      const token = await signInUser(
        form.identifier,
        form.pass
      )

      // GET USER DATA IN DATABASE


      // DISPATCH USER DATA IN REDUX

      dispatch(appendUser({
        EMAIL: form.identifier,
        PASS: form.pass,
        TOKEN: token
      }))

      authCtx.authenticate(token)

    } catch (error) {
      setAlert({
        text: 'Invalid credentials',
        subText: 'Please try again',
        show: true
      })
    }

    // Redirect to user profile page
    setAuthentication(false)
  }

  const closeSetAlert = () => {
    setAlert({
      ...alert,
      show: false
    })
  }

  const handleInputChange = (i, e) => {
    setForm((cur) => {
      return {
        ...cur,
        [i]: e
      }
    })
  }

  // RENDERS
  const renderLoginComponent = () => {
    return (
      <>
        <InputComponent
          labelText="Email Address"
          placeholder="Email Address"
          onChange={handleInputChange.bind(this, 'identifier')}
          defaultValue={'test@test.com'}
        />
        <InputComponent
          labelText="Password"
          placeholder="Password"
          pass={true}
          onChange={handleInputChange.bind(this, 'pass')}
          defaultValue={'123456'}
        />
        <ButtonComponent
          handler={handleSubmit}
          variant={'solid'}
          label={'Sign in'}
          color={'white'}
        />
        <ButtonComponent
          handler={handleForgotPassword}
          variant={'link'}
          color={'#DA3639'}
          label={'Forgot Password'}
        />
      </>
    )
  }

  return (
    <View style={s.loginScreen}>
      <ScrollView>
      <View style={s.half1}>
        <Pressable onPress={handleBackLogin}>
          <Icon as={ChevronLeftIcon} color={'#DA3639'}></Icon>
        </Pressable>
        <Heading size="4xl" style={s.signInHeader} mb={'$5'} mt={'$5'}>Sign In</Heading>
        {renderLoginComponent()}
        <Box style={s.logoHeader}>
          <Image source={require('../assets/crownred.png')} style={s.imageLogo} resizeMode="contain" alt="logo" />
        </Box>
        <AlertComponent alert={alert} closeSetAlert={closeSetAlert} />
      </View>
      </ScrollView>
    </View>
  )
}

const s = StyleSheet.create({
  loginScreen: {
    flex: 1,
    backgroundColor: 'white'
  },
  logoHeader: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLogo: {
    height: 30,
    marginTop: 20
  },
  half1: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    paddingTop: 100
  },
  signInHeader: {
    color: '#DA3639'
  }
});