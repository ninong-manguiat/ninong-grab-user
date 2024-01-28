import React, { useState } from 'react';
import { Actionsheet, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, Box, Button, ActionsheetBackdrop, ButtonText, ActionsheetItem, ActionsheetItemText, ActionsheetContent, Input, InputSlot, InputIcon, InputField } from '@gluestack-ui/themed';
import { StyleSheet, Text, KeyboardAvoidingView, View } from 'react-native';
import InputComponent from './InputComponent';
import ButtonComponent from './ButtonComponent';
import { useSelector, useDispatch } from 'react-redux';
import { appendOriginBooking, appendDestinationBooking } from '../store/redux/appSlice';

function ConfirmPinASComponent({ open, handleAS, navigation, isOrigin }) {
  const [showActionsheet, setShowActionsheet] = useState(open)
  const [form, setForm] = useState({
    landmark: ''
  })
  const booking = useSelector((s) => s.app.BOOKING)
  const dispatch = useDispatch()

  const handleConfirm = () => {
    handleAS()

    if(isOrigin){
      dispatch(appendOriginBooking({
        ...booking.ORIGIN,
        LANDMARK: form.landmark
      }))
    }else{
      dispatch(appendDestinationBooking({
        ...booking.DESTINATION,
        LANDMARK: form.landmark
      }))
    }

    navigation.navigate('Location Form')
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
    <View style={s.wrap}>
      <KeyboardAvoidingView
        behavior={"padding"}
        style={s.keyboard}
        keyboardVerticalOffset={-64}
      >
        <Actionsheet isOpen={open} onClose={() => handleAS()} zIndex={999}>
          <ActionsheetBackdrop />
          <ActionsheetContent h="$80" zIndex={999}>
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            <Text>{''}</Text>
            <Text>{isOrigin ? booking.ORIGIN.ADD : booking.DESTINATION.ADD}</Text>
            <InputComponent
              labelText="LANDMARK"
              placeholder="LANDMARK"
              pass={false}
              width={"$full"}
              onChange={handleInputChange.bind(this, 'landmark')}
              defaultValue={''}
            />
            <ButtonComponent
              handler={handleConfirm}
              variant={"solid"}
              label={"Confirm Pinned Location"}
            />
          </ActionsheetContent>
        </Actionsheet>
      </KeyboardAvoidingView>
    </View>
  )
}

export default ConfirmPinASComponent;

const s = StyleSheet.create({
  wrap: {
    flex: 1
  },
  keyboard: {
    flex: 1,
    justifyContent: 'flex-end'
  }
})