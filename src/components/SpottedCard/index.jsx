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

export default function SpottedCard(){
    return(
        <Card maxW='md' size='xm' bg={useColorModeValue('yellow.200', 'yellow.800')}>
        <Stack divider={<StackDivider borderColor={useColorModeValue('blackAlpha.200', 'whiteAlpha.200')} />} margin={3}>
            <Flex spacing={2}>
                <Flex flex='1' gap={3} alignItems='center' flexWrap='wrap'>
                    <Avatar name='Anônimo' src='anonymous.jpg' />
                    <Box>
                    <Flex direction="row" gap={1} align="center">
                        <Heading size='sm'>Anônimo</Heading><Icon color={useColorModeValue('green.600', 'green.400')} as={BiCheckShield}/>
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
            With Chakra UI, I wanted to sync the speed of development with the speed
            of design. I wanted the developer to be just as excited as the designer to
            create a screen.
            </Text>

            <Image
            maxH={40}
            objectFit='cover'
            src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            alt='Chakra UI'
        />
        <Flex align="center" justify="space-between" flexDirection="row">
            <Button size='sm' flex='1' variant='ghost' leftIcon={<Icon as={BiLike} />}>
            Like
            </Button>
            <Button size='sm' flex='1' variant='ghost' leftIcon={<Icon as={BiChat} />}>
            Comment
            </Button>
            <Button size='sm' flex='1' variant='ghost' leftIcon={<Icon as={BiShare} />}>
            Share
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