import { Box, Image, VStack, Text, Heading, HStack, Avatar } from '@gluestack-ui/themed';
import { ArrowUpCircle } from 'lucide-react-native';
import React from 'react';
import MapSample from '../assets/map-sample.png';
import { StyleSheet } from 'react-native';
import ButtonComponent from './ButtonComponent';

const CardComponent = ({
}) => {
    const ProfileCard = () => {
        return (
            <>
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
                            <Heading size="sm" style={s.name}>Jap Dorado</Heading>
                            <Text size="xs" style={s.subName}>NEM6898</Text>
                        </VStack>
                    </HStack>
                </HStack>
            </>
        );
    };

    return (
        <Box
            maxWidth="$full"
            borderColor="$borderLight200"
            borderRadius="$lg"
            borderWidth="$1"
            my="$1"
            overflow="hidden"
            $base-mx="$5"
            $dark-bg="$backgroundDark900"
            $dark-borderColor="$borderDark800"
        >
            <Box opacity="$70">
                <Image
                    h={"$20"}
                    width={"$full"}
                    alt="map"
                    source={MapSample}
                />
            </Box>
            <VStack px="$3" pt="$5" pb="$5" padding="$1">
                <ProfileCard />
                <Text>
                    Pickup Date: 12th December 2024
                </Text>
                <Text>
                    Pickup Time: 5:00 PM
                </Text>
                <Text>
                    Pickup Location: 12th December 2024
                </Text>
                <Text>
                    Driver Contact Number: +639568177614
                </Text>
            </VStack>
            <ButtonComponent
                label="Manage your trip"
                
            />
        </Box>
    )
}

export default CardComponent;

const s = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    },
    hstack1: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: "space-between",
        marginTop: -45,
        marginBottom: 15
    },
    hstack2: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: "flex-start",
    },
    name: {
        marginLeft: 20,
        marginBottom: 0
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