import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from "react-native";
import { app, db, getFirestore, collection, addDoc, onSnapshot, doc, query, where, getDocs } from '../firebase/firebase'
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { Box, Center, Heading, Image, Text, VStack, HStack, Avatar, Divider, ScrollView } from '@gluestack-ui/themed';

export default function BookingProgress({ navigation }) {
    const { ID } = useSelector((s) => s.app.BOOKING)
    const [isConfirm, setIsConfirm] = useState(false)
    const [confirmationDetails, setConfirmationDetails] = useState()

    useEffect(() => {
        console.log('ID', ID)
        const q = query(doc(db, "bookings", ID));
        console.log('q')

        const unsubscribe = onSnapshot(q, (snapshot) => {
            console.log("New city: ", snapshot.data().STATUS);
            if (snapshot.data().STATUS === 'CONFIRMED BOOKING') {
                setIsConfirm(true)
                setConfirmationDetails(snapshot.data())
                console.log('snpashotdata', snapshot.data())
            }
        });

        // Stop listening for updates when no longer required
        return unsubscribe
    }, [ID]);

    const renderWaitingForBooking = () => {
        return (
            <>
                <Image source={require('../assets/loading.gif')} style={s.imageLogo} resizeMode="contain" alt="loading" />
                <Heading>Waiting for your</Heading>
                <Heading>booking</Heading>
                <Heading>confirmation...</Heading>
            </>
        )
    }

    const renderBookingConfirmed = () => {
        return (
            <>
                <Image source={require('../assets/crownred.png')} style={s.imageLogo} resizeMode="contain" alt="loading" />
                <Heading>Booking Confirmed</Heading>
                <Box
                    width="$80"
                    borderColor="$borderLight200"
                    borderRadius="$lg"
                    borderWidth="$1"
                    my="$4"
                    overflow="hidden"
                    $base-mx="$5"
                    $dark-bg="$backgroundDark900"
                    $dark-borderColor="$borderDark800"
                >
                    <Box>
                        <Image
                            h={120}
                            width="100%"
                            source={require('../assets/carheader.png')}
                            alt="carh"
                        />
                    </Box>
                    <HStack space="md" style={s.hstack2}>
                        <Avatar bg="$blue600">
                            <Avatar.Image
                                alt="profile-img"
                                source={{
                                    uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                                }}
                            />
                        </Avatar>
                    </HStack>
                    <VStack px="$6" pt="$4" pb="$6">
                        <Heading $dark-color="$textLight200" size="sm">
                            {confirmationDetails ? confirmationDetails.DRIVER.DRIVER_PLATE_NO : ''}
                        </Heading>
                        <Text $dark-color="$textLight200" fontSize="$sm" my="$1.5">
                            Plate Number
                        </Text>
                        <Heading $dark-color="$textLight200" size="sm">
                            {confirmationDetails ? confirmationDetails.DRIVER.DRIVER_NAME : ''}
                        </Heading>
                        <Text $dark-color="$textLight200" fontSize="$sm" my="$1.5">
                            Driver Name
                        </Text>
                        <Heading $dark-color="$textLight200" size="sm">
                            {confirmationDetails ? confirmationDetails.DRIVER.DRIVER_CONTACT_NO : ''}
                        </Heading>
                        <Text $dark-color="$textLight200" fontSize="$sm" my="$1.5">
                            Contact No.
                        </Text>

                        <Divider></Divider>

                        <Box flexDirection='row' ml={-30} mt={20}>
                            <Image source={require('../assets/locicon.png')} style={s.imgIcon} resizeMode="contain" alt="locic" mt="$8"/>

                            <Box flexDirection='column' w={200}>

                                <Heading $dark-color="$textLight200" size="xs">
                                    {confirmationDetails ? confirmationDetails.ORIGIN.ADD : ''}
                                </Heading>
                                <Text $dark-color="$textLight200" size="xs">
                                    {confirmationDetails ? confirmationDetails.ORIGIN.LANDMARK : ''}
                                </Text>

                                <Heading $dark-color="$textLight200" size="xs" mt={'$5'}>
                                    {confirmationDetails ? confirmationDetails.DESTINATION.ADD : ''}
                                </Heading>
                                <Text $dark-color="$textLight200" size="xs">
                                    {confirmationDetails ? confirmationDetails.DESTINATION.LANDMARK : ''}
                                </Text>
                            </Box>
                        </Box>
                        <Text
                            $dark-color="$textLight200"
                            fontSize="$xs"
                            mt="$5"
                        >
                            Your driver will be arriving at your
                        </Text>
                        <Text
                            $dark-color="$textLight200"
                            fontSize="$xs"
                        >
                            origin in 20 minutes
                        </Text>
                    </VStack>
                </Box>
            </>
        )
    }

    return (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
            <ScrollView>
                <Center bg={'$white'} flex={1}>
                    {
                        !isConfirm ? renderWaitingForBooking() : renderBookingConfirmed()
                    }
                </Center>
            </ScrollView>
        </SafeAreaView>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgCar: {
        width: 500
    },
    hstack2: {
        marginTop: -30,
        marginLeft: 20
    },
})