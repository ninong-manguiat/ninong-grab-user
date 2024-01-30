import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, SafeAreaView } from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import { useSelector, useDispatch } from 'react-redux';
import { app, db, getFirestore, collection, addDoc } from '../firebase/firebase'
import { getDateTimeNow } from '../util/date';
import { updateBookingID } from '../store/redux/appSlice';
import { Box, Divider, HStack, Heading, Image, Pressable, VStack } from '@gluestack-ui/themed';
import LoadingComponent from '../components/LoadingComponent';

const LocationForm = ({ navigation }) => {
    const { ORIGIN, DESTINATION } = useSelector((s) => s.app.BOOKING)
    const { EMAIL } = useSelector((s) => s.app.USER)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const handleButton = (e) => {
        let isOrigin = e === 'ORIGIN' ? true : false
        navigation.navigate('Map', { isOrigin: isOrigin })
    }

    const handleBook = async () => {
        setLoading(true)
        try {
            const docref = await addDoc(collection(db, "bookings"), {
                DATE: getDateTimeNow().d,
                TIME: getDateTimeNow().t,
                STATUS: 'FOR DISPATCH',
                BOOKING_TYPE: 'NOW',
                USER: {
                    ID: EMAIL,
                    NAME: EMAIL
                },
                ORIGIN: ORIGIN,
                DESTINATION: DESTINATION,
            })

            dispatch(updateBookingID(docref.id))
            setLoading(false)
            navigation.navigate('BookingProgress')
        } catch (e) {
            console.log('error')
        }
    }

    return (
        <SafeAreaView style={s.container}>
            <ScrollView>
                <VStack px="$4" py="$4" space="lg" flex={1} w={'$full'}>
                    <Heading size="2xl">Book Now</Heading>
                    <Box style={s.headerStart}>
                        <Image source={require('../assets/locicon.png')} style={s.imgIcon} resizeMode="contain" alt="logo" />
                        <Box style={s.headerWhere}>
                            <Pressable onPress={handleButton.bind(this, 'ORIGIN')} style={s.pickMeButton}>
                                <Heading size="s">Pick me up at</Heading>
                                {
                                    ORIGIN.ADD ? (
                                        <>
                                            <Text>{ORIGIN.ADD}</Text>
                                            <Text style={s.landmarkDetails}>{ORIGIN.LANDMARK}</Text>
                                        </>
                                    ) : (
                                        <>
                                        <Text>{'-'}</Text>
                                        </>
                                    )
                                }
                            </Pressable>

                            <Divider mt={'$5'} mb={'$5'}></Divider>

                            <Pressable onPress={handleButton.bind(this, 'DESTINATION')}>
                                <Heading size="s">Drop me off to</Heading>
                                {
                                    DESTINATION.ADD ? (
                                        <>
                                            <Text>{DESTINATION.ADD}</Text>
                                            <Text style={s.landmarkDetails}>{DESTINATION.LANDMARK}</Text>
                                        </>
                                    ) : (
                                        <>
                                            <Text>{'-'}</Text>
                                        </>
                                    )
                                }
                            </Pressable>
                        </Box>
                    </Box>
                    <ButtonComponent
                        handler={handleBook}
                        variant={"solid"}
                        label={"BOOK NOW"}
                        color={'white'}
                        mt={50}
                    />
                </VStack>
            </ScrollView>
            <LoadingComponent 
                loading={loading}
            ></LoadingComponent>
        </SafeAreaView>
    )
}

export default LocationForm;

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    imgIcon: {
        height: 180
    },
    headerStart: {
        flexDirection: 'row'
    },
    headerWhere: {
        flexDirection: 'column',
        paddingRight: 75
    },
    pickMeButton: {
        minHeight:80,
        width: 250
    },
    landmarkDetails: {
        fontStyle: 'italic'
    }
})