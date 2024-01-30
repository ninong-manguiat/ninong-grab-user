import { Text, ModalContent, ModalBody, Center, Image, ModalBackdrop, Modal, Heading } from '@gluestack-ui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const LoadingComponent = ({
    text,
    loading
}) => {
    if (loading) {
        return (
            <Center h={400}>
                <Modal
                    isOpen={loading}
                    size={'xs'}
                >
                    <ModalBackdrop />
                    <ModalContent style={s.modalStyle}>
                        <ModalBody>
                            <Image source={require('../assets/loading.gif')} style={s.imageLogo} resizeMode="contain" alt="loading" />
                            {text && <Heading size="xs" color='#DA3639'>{text}</Heading>}
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Center>
        )
    } else {
        return (
            <></>
        )
    }
}

export default LoadingComponent;

const s = StyleSheet.create({
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalStyle: {
        backgroundColor: 'white',
        width: 90
    }
});


