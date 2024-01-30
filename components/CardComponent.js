import { Box, Image, VStack, Text, Heading, HStack, Avatar, Button, ButtonText, Badge, BadgeText, BadgeIcon } from '@gluestack-ui/themed';
import { ArrowUpCircle, CarFrontIcon, CarTaxiFrontIcon, GlobeIcon } from 'lucide-react-native';
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
            bg='#ffffff'
            $dark-borderColor="$borderDark800"
        >

            <VStack px="$3" pt="$5" pb="$5" padding="$1">
                <Badge size="sm" variant="outline" borderRadius="$full" action="success" mb={'$5'}>
                    <BadgeText>On going</BadgeText>
                    <BadgeIcon as={CarTaxiFrontIcon} ml="$2" />
                </Badge>
                <ProfileCard />
                <Box flexDirection='row' ml={-30} mt={20}>
                    <Image source={require('../assets/locicon.png')} style={s.imgIcon} resizeMode="contain" alt="locic" />

                    <Box flexDirection='column' w={290}>
                        <Heading $dark-color="$textLight200" size="sm">
                            184 Lecheria Calamba Laguna
                        </Heading>
                        <Text $dark-color="$textLight200" fontSize="$sm" my="$1.5">
                            Origin
                        </Text>
                        <Heading $dark-color="$textLight200" size="sm">
                            SM Calamba Laguna
                        </Heading>
                        <Text $dark-color="$textLight200" fontSize="$sm" my="$1.5">
                            Destination
                        </Text>
                    </Box>
                </Box>
            </VStack>
            <Button
                backgroundColor='#DA3639'
                color='#ffffff'
            >
                <ButtonText>Manage your Trip</ButtonText>
            </Button>
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