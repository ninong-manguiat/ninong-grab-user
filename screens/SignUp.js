import { Button, ButtonText, Heading, Pressable, Text, set } from '@gluestack-ui/themed';
import { useContext, useEffect, useState } from 'react'
import {
  View,
  StyleSheet
} from 'react-native';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import { createUser } from '../util/auth';
import LoadingComponent from '../components/LoadingComponent';
import { AuthContext } from '../store/auth-context';

export default function SignUp({navigation}) {
  const [loadingAuthentication, setAuthentication] = useState(false)
  const authCtx = useContext(AuthContext);
  const [form, setForm] = useState({
    fname: 'Jap',
    lname: 'Dorado',
    email: 'test3@test.com',
    contact: '09568177614',
    pass: '123456'
  })

  const handleSubmit = async() => {
    setAuthentication(true)
    try{
      const token = await createUser(
        form.email,
        form.pass
      )
      authCtx.authenticate(token)
    }catch(e){

    }

    setAuthentication(false)
  }

  if(loadingAuthentication){
    return <LoadingComponent text="Creating User..."/>
  }

  const handleInputChange = (i, e) => {
    setForm((cur) => {
      return {
        ...cur,
        [i]: e
      }
    })
  }

  return (
    <View style={s.loginScreen}>
      <View style={s.half1}>
        <Heading size="4xl">Sign Up</Heading>
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
        />

      </View>
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
});