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
    AddIcon,
    Icon
} from '@chakra-ui/icons';

import { BiUser, BiUpArrowAlt, BiFlag, BiLike, BiShare, BiChat, BiCheckShield } from 'react-icons/bi';

import { useState } from 'react';

export default function SpottedCard({id, user_id, text, created_at, updated_at, image, user, comments}){
    const name = String(user.name);
    const username = String(user.username);
    const userId = String(user.id);
    const isActivated = Boolean(user.is_activated);

    const [showComments, setShowComments] = useState(false);
    const [commentButtonBody, setCommentButtonBody] = useState(<><Icon boxSize={4} as={BiChat} /> <Text>Comentários</Text></>);

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

    const getVerifiedIcon = (isActivated) => {
        if(isActivated){
            return(
                <Icon boxSize={4} color={useColorModeValue('green.600', 'green.400')} as={BiCheckShield}/>
            )
        }
    }

    const getUserAvatar = (user) => {
        if(user.avatar){
            return(
                <Avatar boxSize="24px" name={user.name} src='anonymous.jpg' />
            )
        }
        else{
            return(
                <Avatar boxSize="24px" name={user.name} src='anonymous.jpg' />
            )
        }
    }

    const spottedComment = ({id, text, user}) => {
        return(
                    <Box
                        padding="0.5em"
                        borderRadius={15}
                        margin="2%"
                        fill="red"
                        background={useColorModeValue('yellow.400', 'yellow.800')}
                    >
                        <Flex 
                            direction="row"
                            verticalAlign="middle"
                            gap={2}
                            paddingX="0.5em"
                            alignItems="center"
                        >
                            {getUserAvatar(user)}
                            <Text>{user.name}</Text>{getVerifiedIcon(true)}
                        </Flex>
                        <Box 
                            align="left"
                            marginTop="10px"
                            marginX="0.5em"
                            padding="0.5em"
                            borderRadius={15}
                            background={useColorModeValue('yellow.300', 'yellow.700')}
                        >
                            <Text marginLeft="2px">{text}</Text>
                        </Box>
                    </Box>
        )
    }

    const createComments = (comments) => {
        console.log('called createComments')
        if(comments.length > 0){
            console.log(comments)
            const loadedComments = comments.map( (comment) => {
                return(
                    <Box
                        padding="0.5em"
                        borderRadius={15}
                        margin="2%"
                        width="full"
                        background={useColorModeValue('yellow.300', 'yellow.800')}
                    >
                        <Flex 
                            direction="row"
                            verticalAlign="middle"
                            gap={2}
                            paddingX="0.5em"
                            alignItems="center"
                        >
                            {getUserAvatar(comment.user)}
                            <Text>{user.name}</Text>{getVerifiedIcon(true)}
                        </Flex>
                        <Box 
                            align="left"
                            marginTop="10px"
                            marginX="0.5em"
                            padding="0.5em"
                            borderRadius={15}
                            background={useColorModeValue('yellow.200', 'yellow.700')}
                        >
                            <Text marginLeft="2px">{comment.text}</Text>
                        </Box>
                    </Box>
                )         
            })

            return(loadedComments)
        }
        else{
            return(
                <Box
                    padding="0.5em"
                    borderRadius={15}
                    width="full"
                    background={useColorModeValue('yellow.400', 'yellow.800')}
                >
                    <Text>Esse post ainda não tem comentários.</Text>
                </Box>

            )
        }
    }

    const handleCommentButton = (e) => {
        if(showComments){
            setCommentButtonBody(<><Icon boxSize={4} as={BiChat} /> <Text>Comentários</Text></>)
            
        } else {
            setCommentButtonBody(<><Icon boxSize={5} as={BiUpArrowAlt} /> <Text>Comentários</Text></>)
        }
        setShowComments((prev) => !prev);
    }

    return(
        <Card maxW='md' size='xm' bg={useColorModeValue('yellow.200', 'yellow.800')} borderRadius={15}>
        <Stack divider={<StackDivider borderColor={useColorModeValue('blackAlpha.200', 'whiteAlpha.200')} />} margin={3}>
            <Flex spacing={2}>
                <Flex flex='1' gap={3} alignItems='center' flexWrap='wrap'>
                    <Avatar name='Anônimo' src='anonymous.jpg' />
                    <Box>
                    <Flex direction="row" gap={1} align="center">
                        <Heading size='sm'>{name}</Heading>{getVerifiedIcon(isActivated)}
                    </Flex>
                    <Text align='left'>{username}</Text>
                    </Box>
                </Flex>
                <IconButton
                    variant='ghost'
                    colorScheme='yellow'
                    aria-label='Reportar'
                    icon={<Icon as={BiFlag} />}
                />
            </Flex>

            <Text>
                {text}
            </Text>
            {getImage(image)}

        <Flex align="center" justify="space-between" flexDirection="row" gap={2}>
            <Button colorScheme="yellow" size='sm' variant='ghost' leftIcon={<Icon boxSize={4} as={BiLike} />}>
            Gostei
            </Button>
            <Button gap={2} onClick={(e) => handleCommentButton(e)} colorScheme="yellow" size='sm' variant='ghost'>
                {commentButtonBody}
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
        {showComments ? <Card maxW='md' size='xm' bg={useColorModeValue('yellow.500', 'yellow.400')} borderRadius={15}>
                <Box
                    background={useColorModeValue('yellow.100', 'yellow.600')}
                    marginTop="2%"
                    borderRadius={15}
                >
                <Flex 
                    direction="column"
                    marginY="4%"
                    marginX="2%"
                    alignItems="center"
                    gap={4}    
                >
                    {createComments(comments)}

                    <Button isDisabled borderRadius={15} size="sm" width="50%" align="center" gap={2} colorScheme="yellow">
                        <AddIcon/>
                        <Text>Criar comentário</Text>
                    </Button>

                </Flex>
                </Box>
            </Card> : null }

        </Card>
    );
}