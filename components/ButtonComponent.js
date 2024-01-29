import { Button, ButtonText } from '@gluestack-ui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const ButtonComponent = ({
    handler,
    variant,
    label,
    color
}) => (
    <View>
        <Button
            size="lg"
            variant={variant}
            isDisabled={false}
            isFocusVisible={false}
            onPress={handler}
            style={variant === 'solid' ? s.btnBg : s.btnColor}
        >
            <ButtonText color={color}>{label} </ButtonText>
        </Button>
    </View>
);

export default ButtonComponent;

const s = StyleSheet.create({
    btnBg: {
        backgroundColor: '#DA3639'
    },
    btnColor: {
        color: '#DA3639'
    }
})