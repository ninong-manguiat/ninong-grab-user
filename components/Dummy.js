import { Spinner, Text, HStack, Center } from '@gluestack-ui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Dummy = () => (
    <View style={s.loader}>
       <Text>BOOK SCHED</Text>
    </View>
);

export default Dummy;

const s = StyleSheet.create({
    loader: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
});