import React, { useState } from 'react';
import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogFooter,
    AlertDialogBody,
    Center,
    Button,
    ButtonText,
    Heading,
    Icon,
    ButtonGroup,
    CloseIcon,
} from "@gluestack-ui/themed"

import { Text, View } from 'react-native';

const AlertComponent = ({
    alert,
    closeSetAlert
}) => {
    const { text, subText, show } = alert

    return (
        <Center h={300}>
            <AlertDialog
                isOpen={show}
                onClose={closeSetAlert}
            >
                <AlertDialogBackdrop />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <Heading size="lg">{text}</Heading>
                        <AlertDialogCloseButton>
                            <Icon as={CloseIcon} />
                        </AlertDialogCloseButton>
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        <Text size="sm">
                            {subText}
                        </Text>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <ButtonGroup space="lg">
                            <Button
                                variant="outline"
                                action="secondary"
                                onPress={closeSetAlert}
                            >
                                <ButtonText>Cancel</ButtonText>
                            </Button>
                            <Button
                                bg="$error600"
                                action="negative"
                                onPress={closeSetAlert}
                            >
                                <ButtonText>Deactivate</ButtonText>
                            </Button>
                        </ButtonGroup>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Center>
    )
}

export default AlertComponent;
