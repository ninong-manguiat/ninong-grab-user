import { Box, Fab, Icon, FabLabel, AddIcon } from '@gluestack-ui/themed'; 
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'lucide-react-native';
import { StyleSheet } from 'react-native';

const FabComponent = () => {
    const navigation = useNavigation()

    const handleBackToSelection = () => {
        navigation.navigate('Location Form')
    }

    return (
        <Box
            h={0}
            w={0}
            borderRadius="$md"
            style={s.fab}
        >
            <Fab
                size="sm"
                placement="top left"
                isHovered={false}
                isDisabled={false}
                isPressed={false}
                bgColor='#DA3639'
                mt={60}
                onPress={handleBackToSelection}
            >
                <Icon as={ChevronLeftIcon} mr="$1" color={'white'} />
                <FabLabel>Back</FabLabel>
            </Fab>
        </Box>
    )
}

export default FabComponent;

const s = StyleSheet.create({
    fab: {
        marginTop: 20,
    },
})