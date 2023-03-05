import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Flex,
    Avatar,
    Heading,
    Box,
    IconButton,
    Image,
    Button,
    useColorModeValue,
    StackDivider,
    Stack,
    Text
} from '@chakra-ui/react';

import { 
    StarIcon,
    Icon
} from '@chakra-ui/icons';

import { BiUser, BiFlag, BiLike, BiShare, BiChat, BiCheckShield } from 'react-icons/bi';

export default function SpottedCard({id, user_id, text, created_at, updated_at, image}){
    const getImage = (image) => {
        if(image){
            return(
                <Image
                maxH={40}
                objectFit='cover'
                src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                alt='Chakra UI'
                />
            )
        }
    }

    const getVerifiedIcon = (user) => {
        if(user){
            return(
                <Icon color={useColorModeValue('green.600', 'green.400')} as={BiCheckShield}/>
            )
        }
    }

    return(
        <Card maxW='md' size='xm' bg={useColorModeValue('yellow.200', 'yellow.800')} borderRadius={15}>
        <Stack divider={<StackDivider borderColor={useColorModeValue('blackAlpha.200', 'whiteAlpha.200')} />} margin={3}>
            <Flex spacing={2}>
                <Flex flex='1' gap={3} alignItems='center' flexWrap='wrap'>
                    <Avatar name='Anônimo' src='anonymous.jpg' />
                    <Box>
                    <Flex direction="row" gap={1} align="center">
                        <Heading size='sm'>Anônimo</Heading>{getVerifiedIcon(null)}
                    </Flex>
                    <Text>Curso não identificado</Text>
                    </Box>
                </Flex>
                <IconButton
                    variant='ghost'
                    colorScheme='gray'
                    aria-label='See menu'
                    icon={<Icon as={BiFlag} />}
                />
            </Flex>

            <Text>
                {text}
            </Text>
            {getImage(image)}

        <Flex align="center" justify="space-between" flexDirection="row" gap={2}>
            <Button colorScheme="yellow" size='sm' variant='ghost' leftIcon={<Icon boxSize={4} as={BiLike} />}>
            Up
            </Button>
            <Button colorScheme="yellow" size='sm' variant='ghost' leftIcon={<Icon boxSize={4} as={BiChat} />}>
            Comentar
            </Button>
            <Button colorScheme="yellow" size='sm' variant='ghost' leftIcon={<Icon boxSize={4} as={BiShare} />}>
            Enviar
            </Button>
        </Flex>
        </Stack>



        <CardFooter
            maxH={20}
            justify='space-between'
            flexWrap='wrap'
            sx={{
            '& > button': {
                minW: '136px',
            },
            }}
        >

        </CardFooter>
        </Card>
    );
}