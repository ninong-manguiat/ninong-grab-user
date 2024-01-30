import { Heading, Icon, ScrollView, VStack } from "@gluestack-ui/themed";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import CardComponent from "../components/CardComponent";

export default function Trips({ navigation }) {
    return (
        <SafeAreaView style={s.container}>
            <ScrollView>
                <VStack px="$1" py="$4" space="lg" flex={1} w={'$full'}>
                    <Heading size="2xl" paddingLeft="$5">Your Trips</Heading>
                    <CardComponent />
                    <CardComponent />
                </VStack>
            </ScrollView>
        </SafeAreaView>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    },
})