import React, { useState } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { app, db, getFirestore, collection, addDoc, onSnapshot, doc, query, where, getDocs } from '../firebase/firebase'
import { useSelector } from 'react-redux';
import { useEffect } from "react";

export default function BookingProgress({ navigation }) {
    const { ID } = useSelector((s) => s.app.BOOKING)
    const [isConfirm, setIsConfirm] = useState(false)

    useEffect(() => {
        console.log('ID',ID)
        const q = query(doc(db, "bookings", ID));
        console.log('q')

        const unsubscribe = onSnapshot(q, (snapshot) => {
            console.log("New city: ", snapshot.data().STATUS);
            if(snapshot.data().STATUS === 'CONFIRM BOOKING'){
                setIsConfirm(true)
            }
        });

        // Stop listening for updates when no longer required
        return unsubscribe
    }, [ID]);

    return (
        <View style={s.container}>
            {
                !isConfirm ? 
                <Text>LOADING... {ID}</Text> : 
                <Text>BOOKING CONFIRMED DRIVER IS ON THE WAY{ID}</Text>
            }

        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
})