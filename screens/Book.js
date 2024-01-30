import { StyleSheet, Alert, View, Image, Text } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { PermissionStatus, getCurrentPositionAsync, useForegroundPermissions } from "expo-location"
import { useState } from "react";
import { getRouteMap } from "../util/location";
import { NavigationContainer } from "@react-navigation/native";
import LocationForm from "./LocationForm";
import { createStackNavigator } from '@react-navigation/stack';
import Map from "./Map";
import BookingProgress from "./BookingProgress";

const Stack = createStackNavigator();

export default function Book({ navigation }) {
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions()
    const [location, setLocation] = useState(null)
    const [openAS, setOpenAS] = useState(false)

    const handleAS = () => {
        setOpenAS(!openAS)
    }

    const handlePinLocation = (params) => {
        setOpenAS(true)
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions()

        if (!hasPermission) {
            return;
        }

        const loc = await getCurrentPositionAsync()
        console.log('loc', loc)

        setLocation({
            lat: loc.coords.latitude,
            lng: loc.coords.longitude
        })
    }

    async function verifyPermissions() {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission()

            return permissionResponse.granted
        }

        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permission', 'No grant of Location to this app')

            return false;
        }

        return true
    }

    let locPreview = <Text>No location preview yet.</Text>

    if (location) {
        console.log('rampa', location)
        locPreview = (
            // <Image style={s.map} source={{ uri: getPreviewMap(location.lat, location.lng) }} />
            <Image style={s.map} source={{
                uri: getRouteMap(
                    {
                        lat: location.lat,
                        lng: location.lng
                    },
                    {
                        lat: "14.193876181510989",
                        lng: "121.15994229912758"
                    }
                )
            }} />
        )
    }

    return (

        <View style={s.book}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="Location Form"
                    component={LocationForm}
                    options={{
                        title: 'Location Form'
                    }}
                >
                </Stack.Screen>
                <Stack.Screen
                    name="Map"
                    component={Map}
                    options={{
                        title: 'Map'
                    }}
                >
                </Stack.Screen>
                <Stack.Screen
                    name="BookingProgress"
                    component={BookingProgress}
                    options={{
                        title: 'Booking Progress'
                    }}
                >
                </Stack.Screen>
            </Stack.Navigator>
        </View>
    )
}

const s = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        borderRadius: 4,
        overflow: "hidden"
    },
    book: {
        flex: 1
    },
    grp: {
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: "center"
    },
    map: {
        width: "100%",
        height: "100%",
        borderRadius: 4,
        overflow: "hidden"
    }
})
