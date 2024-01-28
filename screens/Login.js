import { useContext, useEffect, useState } from 'react'
import { Alert, Button, ButtonText, Heading, Pressable, Text, set } from '@gluestack-ui/themed';
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

export default function Login({ navigation }) {
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
  
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    setAuthentication(true)
    try{
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

    }catch (error) {
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

  const handleSignUpButton = () => {
    navigation.navigate('Sign Up')
  }

  return (
    <View style={s.loginScreen}>
      <View style={s.half1}>
        <Heading size="4xl">Login</Heading>
        <InputComponent
          labelText="Contact Number or Email Address"
          placeholder="Contact Number or Email Address"
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
        />
        <ButtonComponent
          handler={handleSignUpButton}
          variant={'link'}
          label={'No Account Yet?'}
        />
      </View>
      <AlertComponent alert={alert} closeSetAlert={closeSetAlert}/>
    </View>
  )
}

const s = StyleSheet.create({
  loginScreen: {
    flex: 1,
  },
  half1: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    paddingTop: 100
  }
  // loginHeader: {
  //   borderBottomStartRadius: 70,
  //   borderBottomEndRadius: 70,
  //   overflow: 'hidden',
  //   backgroundColor: '#DA3639',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // imageLogo: {
  //   width: 200,
  //   height: 200,
  // },
  // header: {
  //   color: '#fff',
  //   fontSize: 15,
  //   fontFamily: 'josefinL',
  //   textAlign: 'center',
  //   paddingBottom: 150
  // },
  // subHeader: {
  //   color: '#fff',
  //   fontSize: 15,
  //   fontFamily: 'josefinL',
  //   textAlign: 'center',
  //   paddingBottom: 150
  // },
  // btnGrp: {
  //   margin: 30
  // },
  // logInBtn: {
  //   width: 200,
  //   alignContent: 'center',
  //   alignItems: 'center',
  //   textAlign: 'center'
  // },
  // container: {
  //   flex: 1,
  // },
  // inner: {
  //   padding: 24,
  //   flex: 1,
  //   justifyContent: 'space-around',
  // },
  // header: {
  //   fontSize: 36,
  //   marginBottom: 48,
  // },
  // textInput: {
  //   height: 40,
  //   borderColor: '#000000',
  //   borderBottomWidth: 1,
  //   marginBottom: 36,
  // },
  // btnContainer: {
  //   backgroundColor: 'white',
  //   marginTop: 12,
  // },
});