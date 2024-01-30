import React, { useState } from 'react';
import { Actionsheet, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, Heading, Box, ActionsheetBackdrop, ButtonText, ActionsheetItem, ActionsheetItemText, ActionsheetContent, Input, InputSlot, InputIcon, InputField } from '@gluestack-ui/themed';
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

    if (isOrigin) {
      dispatch(appendOriginBooking({
        ...booking.ORIGIN,
        LANDMARK: form.landmark
      }))
    } else {
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
      >
        <Actionsheet isOpen={open} onClose={() => handleAS()} zIndex={999}>
          <ActionsheetBackdrop />
          <ActionsheetContent h="$80" w="$full" zIndex={999} >
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            <Box>
              <Heading size="md" mt="$5">Selected Location</Heading>
              <Text>{isOrigin ? booking.ORIGIN.ADD : booking.DESTINATION.ADD}</Text>
              <Heading size="md" mt="$5">Landmark</Heading>
              <InputComponent
                pass={false}
                w={"$full"}
                onChange={handleInputChange.bind(this, 'landmark')}
                defaultValue={''}
              />
              <ButtonComponent
                handler={handleConfirm}
                variant={"solid"}
                label={"Confirm Pinned Location"}
                color="white"
              />
            </Box>
          </ActionsheetContent>
        </Actionsheet>
      </KeyboardAvoidingView>
    </View>
  )
}

export default ConfirmPinASComponent;

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    textAlign: 'left',
  },
  keyboard: {
    flex: 1,
    justifyContent: 'flex-end'
  }
})