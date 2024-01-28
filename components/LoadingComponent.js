import { Spinner, Text, HStack, Center } from '@gluestack-ui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const LoadingComponent = ({
    text,
}) => (
    <View style={s.loader}>
        <Center>
        <HStack space="md">
            <Spinner />
            <Text size="md">{text}</Text>
        </HStack>
        </Center>
    </View>
);

export default LoadingComponent;

const s = StyleSheet.create({
    loader: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
});