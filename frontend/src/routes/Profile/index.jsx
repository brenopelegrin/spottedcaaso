import { 
    Text,
    Box,
    Flex,
    HStack,
    Heading,
    Center,
    Avatar,
    useColorModeValue,
} from '@chakra-ui/react';

export default function Profile(){
    return(
        <Center flexDirection="column" gap={4}>
        <Box
            background={useColorModeValue('yellow.400', 'yellow.800')}
            borderRadius={15}
            width="85%"
            alignItems="center"
            marginTop="2em"
            padding="1em"
        >
            <HStack marginX={4}>
            <Avatar boxSize="2em"/>
            <Text>This is your profile page.</Text>
            </HStack>
        </Box>
        <Box
            borderRadius={15}
            width="80%"
            background={useColorModeValue('yellow.400', 'yellow.800')}
            gap={6  }
            padding="1em"
        >
            <Heading size="md" marginBottom={4}>Configurações</Heading>
            <Text>This is your profile page.</Text>
            <Text>This is your profile page.</Text>
            <Text>This is your profile page.</Text>
            <Text>This is your profile page.</Text>
            <Text>This is your profile page.</Text>
        </Box>
        <Box
            borderRadius={15}
            width="80%"
            background={useColorModeValue('yellow.400', 'yellow.800')}
            gap={6  }
            padding="1em"
        >   
            <Heading size="md" marginBottom={4}>Outras opções</Heading>
            <Text>This is your profile page.</Text>
            <Text>This is your profile page.</Text>
            <Text>This is your profile page.</Text>
        </Box>
        </Center>
    )
}