import React from 'react';
import { View, Text } from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import { useSelector, useDispatch } from 'react-redux';
import { app, db, getFirestore, collection, addDoc } from '../firebase/firebase'
import { getDateTimeNow } from '../util/date';
import { updateBookingID } from '../store/redux/appSlice';

const LocationForm = ({ navigation }) => {
    const { ORIGIN, DESTINATION } = useSelector((s) => s.app.BOOKING)
    const { EMAIL } = useSelector((s) => s.app.USER)
    const dispatch = useDispatch()

    const handleButton = (e) => {
        let isOrigin = e === 'ORIGIN' ? true : false
        navigation.navigate('Map', { isOrigin: isOrigin })
    }

    const handleBook = async() => {
        try {
            const docref = await addDoc(collection(db, "bookings"),{
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
        } catch(e) {
            console.log('error')
        }

        navigation.navigate('BookingProgress')
    }

    return (
        <View>
            <Text>ORIGIN</Text>
            <Text>{ORIGIN.ADD}</Text>
            <Text>{ORIGIN.LANDMARK}</Text>
            <ButtonComponent
                handler={handleButton.bind(this, 'ORIGIN')}
                variant={"solid"}
                label={"Pin Origin"}
            />
            <Text>DESTINATION</Text>
            <Text>{DESTINATION.ADD}</Text>
            <Text>{DESTINATION.LANDMARK}</Text>
            <ButtonComponent
                handler={handleButton.bind(this, 'DESTINATION')}
                variant={"solid"}
                label={"Pin Destination"}
            />

            <Text>...</Text>
            <ButtonComponent
                handler={handleBook}
                variant={"outline"}
                label={"BOOK"}
            />
        </View>
    )
}

export default LocationForm;
