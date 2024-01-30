import MapView, { Marker } from 'react-native-maps'

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import InputComponent from '../components/InputComponent';
import { getAddress } from '../util/location';
import FabComponent from '../components/FabComponent';
import ConfirmPinASComponent from '../components/ConfirmPinASComponent';
import { useDispatch, useSelector } from 'react-redux';
import { appendOriginBooking, appendDestinationBooking } from '../store/redux/appSlice'
import ButtonComponent from '../components/ButtonComponent';
import { Button, ButtonText, VStack, Text } from '@gluestack-ui/themed';

const Map = ({
    route,
    navigation
}) => {
    const [selectedLoc, setSelectedLoc] = useState('')
    const [openAS, setAS] = useState(false)
    const dispatch = useDispatch()

    const region = {
        latitude: 14.2042,
        longitude: 121.1546,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    const { isOrigin } = route.params;

    const selectLocationHandler = async (e) => {
        const lat = e.nativeEvent.coordinate.latitude
        const lng = e.nativeEvent.coordinate.longitude
        let add = await getAddress(lat, lng)

        setSelectedLoc({
            lat: lat,
            lng: lng,
            add: add
        })

        if (isOrigin) {


            dispatch(appendOriginBooking({
                LAT: lat,
                LNG: lng,
                ADD: add
            }))
        } else {
            dispatch(appendDestinationBooking({
                LAT: lat,
                LNG: lng,
                ADD: add
            }))
        }
    }

    const handleConfirmPinnedLoc = () => {
        setAS(!openAS)
    }

    return (
        <View style={s.mapScreen}>
            <MapView
                initialRegion={region}
                style={s.map}
                onPress={selectLocationHandler}
            >
                {
                    selectedLoc && (
                        <>
                            <Marker
                                title={'Picked Location'}
                                coordinate={{
                                    latitude: selectedLoc.lat,
                                    longitude: selectedLoc.lng
                                }}
                            />
                            <Button
                                onPress={handleConfirmPinnedLoc}
                                size='lg'
                                bg='#DA3639'
                                color={"white"}
                                style={s.buttonCallout}
                                w={'$80'}
                                h={70}
                            >
                                <ButtonText color={'$white'}>
                                    <VStack>
                                    <Text style={s.confirmPinHeader}>Confirm Pinned Location</Text>
                                    <Text style={s.confirmLocSubHeader}>{selectedLoc.add}</Text>
                                    </VStack>
                                </ButtonText>
                            </Button>
                        </>
                    )
                }

            </MapView>
            <ConfirmPinASComponent
                open={openAS}
                isOrigin={isOrigin}
                handleAS={handleConfirmPinnedLoc}
                navigation={navigation}
            />
        </View>
    )
}

export default Map;

const s = StyleSheet.create({
    mapScreen: {
        flex: 1,
        flexDirection: 'column'
    },
    buttonCallout: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        textAlign: 'center',
        alignSelf: "center",
        marginLeft: 10
    },
    map: {
        width: "100%",
        height: "100%"
    },
    confirmPinHeader: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 5
    },
    confirmLocSubHeader:{
        fontSize: 12,
        textAlign: 'center',
        color: 'white'
    }
})