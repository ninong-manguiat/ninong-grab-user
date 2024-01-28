import MapView, { Marker } from 'react-native-maps'

import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InputComponent from '../components/InputComponent';
import { getAddress } from '../util/location';
import ButtonComponent from '../components/ButtonComponent';
import ConfirmPinASComponent from '../components/ConfirmPinASComponent';
import { useDispatch } from 'react-redux';
import { appendOriginBooking, appendDestinationBooking } from '../store/redux/appSlice'

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

        setSelectedLoc({
            lat: lat,
            lng: lng
        })

        let add = await getAddress(lat, lng)

        if(isOrigin){
            dispatch(appendOriginBooking({
                LAT: lat,
                LNG: lng,
                ADD: add
            }))
        }else{
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
        <>
            <ButtonComponent
                handler={handleConfirmPinnedLoc}
                variant={"solid"}
                label={"Confirm Pinned Location"}
            />
            <MapView
                initialRegion={region}
                style={s.map}
                onPress={selectLocationHandler}
            >
                {
                    selectedLoc && (
                        <Marker
                            title={'Picked Location'}
                            coordinate={{
                                latitude: selectedLoc.lat,
                                longitude: selectedLoc.lng
                            }}
                        />
                    )
                }
            </MapView>
            <ConfirmPinASComponent
                open={openAS}
                isOrigin={isOrigin}
                handleAS={handleConfirmPinnedLoc}
                navigation={navigation}
            />
        </>
    )

}

export default Map;

const s = StyleSheet.create({
    map: {
        width: "100%",
        height: "100%"
    }
})