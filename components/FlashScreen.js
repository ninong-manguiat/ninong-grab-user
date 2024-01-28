import { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { fetchData, storeData } from '../util/http';

export default function FlashScreen() {

  const [data, setData] = useState({
    amount: '0',
    name: '',
    currency: ''
  });

  const [fetchedData, setFetchedData] = useState([])

  function inputHandlers(id, value) {
    setData((cur)=>{
      return {
        ...cur,
        [id]: value
      };
    });
  }

  function sendDataHandler(){
    storeData(data)    
    // console.log(data)
  }

  useEffect(() => {
    async function getData(){
        const d = await fetchData()
        setFetchedData(d)
    }

    getData()
  },[])

  useEffect(()=>{
    console.log('fetchedData',fetchedData)
  },[])

    return (
        <View>
        <View style={s.half1}>
            <Image source={require('../assets/manguiat-logo.png')} style={s.imageLogo} resizeMode="contain"/>
            <Text style={s.header}>NINONG</Text>
            <Text style={s.subHeader}>CALAMBA GRAB TRANSPORT</Text>
        </View>
{/* 
        <TextInput
            keyboardType = 'decimal-pad'
            onChangeText = {inputHandlers.bind(this, 'amount')}
            value = {data.amount}
        /> 
        <Button title={'Send Data'} onPress={sendDataHandler}></Button> */}
        </View>
    )
}

const s = StyleSheet.create({
    container: {
      flex: 1
    },
    half1:{
      borderBottomStartRadius : 70,
      borderBottomEndRadius : 70,
      overflow : 'hidden',
      backgroundColor: '#DA3639',
      alignItems : 'center',
      justifyContent : 'center',
    },
    imageLogo:{
      paddingTop: 350,
      width: 200,
      height: 200,
    },
    header:{
      color: '#fff',
      fontSize: 50,
      fontFamily: 'josefinB'
    },
    subHeader:{
      color: '#fff',
      fontSize: 15,
      fontFamily: 'josefinL',
      textAlign: 'center',
      paddingBottom: 150
    }
});

