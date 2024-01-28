import { Avatar, Box, Divider, HStack, Heading, Icon, Text, Pressable, ScrollView, VStack } from "@gluestack-ui/themed";
import { SafeAreaView, StyleSheet } from "react-native";
import {
    ChevronRight,
    User,
    Settings,
    Phone
} from "lucide-react-native";
import ButtonComponent from "../components/ButtonComponent";
import { AuthContext } from "../store/auth-context";
import { useContext } from "react";
import { useSelector } from 'react-redux';

export default function Profile({ navigation }) {
    const authCtx = useContext(AuthContext);
    const user = useSelector((s) => s.app.USER)
    console.log('user',user)

    const ProfileCard = () => {
        return (
            <>
                <Heading size="lg">Profile</Heading>
                <HStack style={s.hstack1}>
                    <HStack space="md" style={s.hstack2}>
                        <Avatar bg="$blue600">
                            <Avatar.Image
                                alt="profile-img"
                                source={{
                                    uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                                }}
                            />
                        </Avatar>
                        <VStack space="md" reversed={false}>
                            <Heading size="sm" style={s.name}>{user.EMAIL}</Heading>
                            <Text size="xs" style={s.subName}>+639568177614</Text>
                        </VStack>
                    </HStack>
                </HStack>
            </>
        );
    };

    const PersonalInfoSection = () => {
        return (
            <VStack space="md">
                <HStack justifyContent="space-between" style={s.hstack1}>
                    <HStack space="md" style={s.hstack2}>
                        <Icon as={User} />
                        <Text style={s.name2}>Change Personal Info</Text>
                    </HStack>
                    <Pressable>
                        <Icon as={ChevronRight} />
                    </Pressable>
                </HStack>
                <HStack justifyContent="space-between" style={s.hstack1}>
                    <HStack space="md" style={s.hstack2}>
                        <Icon as={Settings} />
                        <Text style={s.name2}>Account Settings</Text>
                    </HStack>
                    <Pressable>
                        <Icon as={ChevronRight} />
                    </Pressable>
                </HStack>
            </VStack>
        );
    };

    const Support = () => {
        return (
            <>
                <Heading size="lg">Support</Heading>
                <HStack style={s.hstack1}>
                    <HStack justifyContent="space-between" style={s.hstack1}>
                        <HStack space="md" style={s.hstack2}>
                            <Icon as={Phone} />
                            <Text style={s.name2}>Call Support +639568177614</Text>
                        </HStack>
                    </HStack>
                </HStack>
            </>
        );
    };

    return (
        <SafeAreaView style={s.container}>
            <ScrollView>
                <VStack px="$5" py="$4" space="lg" flex={1} w={'$full'}>
                    <ProfileCard />
                    <Divider />
                    <PersonalInfoSection />
                    <Divider />
                    <Support />
                    <Divider />
                    <ButtonComponent
                        label="Logout"
                        variant="outline"
                        handler={authCtx.logout}
                    />
                    <Text size="2xs" textAlign="center">version 1.0</Text>
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
    hstack1: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: "space-between",
        marginTop: 5
    },
    hstack2: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: "flex-start",
    },
    name: {
        marginLeft: 20,
    },
    name2: {
        marginLeft: 20,
        marginBottom: 5
    },
    subName: {
        marginLeft: 20,
        marginTop: -10
    }
});