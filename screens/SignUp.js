import { Box, Heading, Icon, Pressable, Image, ScrollView, KeyboardAvoidingView } from '@gluestack-ui/themed';
import { useContext, useState } from 'react'
import {
  View,
  StyleSheet
} from 'react-native';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import { createUser } from '../util/auth';
import LoadingComponent from '../components/LoadingComponent';
import { AuthContext } from '../store/auth-context';
import { Animated } from "react-native";
import { ChevronLeftIcon } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignUp() {
  const navigation = useNavigation()
  const [loadingAuthentication, setAuthentication] = useState(false)
  const authCtx = useContext(AuthContext);
  const [form, setForm] = useState({
    fname: 'Jap',
    lname: 'Dorado',
    email: 'test3@test.com',
    contact: '09568177614',
    pass: '123456'
  })

  const av = new Animated.Value(0);
  av.addListener(() => { return });

  const handleSubmit = async () => {
    setAuthentication(true)
    try {
      const token = await createUser(
        form.email,
        form.pass
      )
      authCtx.authenticate(token)
    } catch (e) {

    }

    setAuthentication(false)
  }

  if (loadingAuthentication) {
    return <LoadingComponent text="Creating User..." loading={loadingAuthentication} />
  }

  const handleInputChange = (i, e) => {
    setForm((cur) => {
      return {
        ...cur,
        [i]: e
      }
    })
  }

  const handleBackLogin = () => {
    navigation.navigate('WelcomeScreen')
  }

  const renderSignUp = () => {
    return (
      <>
        <InputComponent
          labelText="First Name"
          placeholder="First Name"
          pass={false}
          onChange={handleInputChange.bind(this, 'fname')}
        />
        <InputComponent
          labelText="Last Name"
          placeholder="Last Name"
          pass={false}
          onChange={handleInputChange.bind(this, 'lname')}
        />
        <InputComponent
          labelText="Email Address"
          placeholder="Email Address"
          pass={false}
          onChange={handleInputChange.bind(this, 'email')}
        />
        <InputComponent
          labelText="Contact Number"
          placeholder="Contact Number"
          pass={false}
          onChange={handleInputChange.bind(this, 'contact')}
        />
        <InputComponent
          labelText="Password"
          placeholder="Password"
          pass={true}
          onChange={handleInputChange.bind(this, 'pass')}
        />
        <ButtonComponent
          handler={handleSubmit}
          variant={'solid'}
          label={'Sign Up'}
          color={'white'}
        />
      </>
    )
  }

  return (
    <View style={s.loginScreen}>
      <KeyboardAvoidingView>
      <ScrollView>
        <View style={s.half1}>
          <Pressable onPress={handleBackLogin}>
            <Icon as={ChevronLeftIcon} color={'#DA3639'}></Icon>
          </Pressable>
          <Heading size="4xl" style={s.signInHeader} mb={'$5'} mt={'$5'}>Sign Up</Heading>
          {renderSignUp()}
          <Box style={s.logoHeader}>
            <Image source={require('../assets/crownred.png')} style={s.imageLogo} resizeMode="contain" alt="logo" />
          </Box>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
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