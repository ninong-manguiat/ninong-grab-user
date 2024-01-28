import { Button, ButtonText } from '@gluestack-ui/themed';
import React from 'react';
import { View } from 'react-native';

const ButtonComponent = ({
    handler,
    variant,
    label
}) => (
    <View>
        <Button
            size="lg"
            variant={variant}
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            onPress={handler}
        >
            <ButtonText>{label} </ButtonText>
        </Button>
    </View>
);

export default ButtonComponent;
