import { AlertCircleIcon, Box, FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText, Input, InputField } from '@gluestack-ui/themed';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

function InputComponent({
    labelText,
    placeholder,
    pass,
    onChange,
    defaultValue,
    isDisabled,
    width
}) {
    return (
        <View style={s.inputComponent}>
            <FormControl
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                isRequired={false}
            >
                <FormControlLabel mb="$1">
                    <FormControlLabelText>{labelText}</FormControlLabelText>
                </FormControlLabel>
                <Input variant={'outline'} isDisabled={isDisabled}>
                    <InputField
                        type={pass ? 'password' : 'text'}
                        placeholder={placeholder}
                        onChangeText={onChange}
                        autoCapitalize='none'
                        defaultValue={defaultValue}
                        w={width}
                    />
                </Input>
            </FormControl>
        </View>
    )
}

const s = StyleSheet.create({
    inputComponent: {
        marginBottom: 20,
        backgroundColor: "white"
    }
})

export default InputComponent;
