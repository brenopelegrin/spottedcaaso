import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    FormControl,
    Textarea,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Input,
    Flex,
    Avatar,
    Heading,
    Alert,
    AlertIcon,
    AlertDescription,
    Box,
    Modal,
    ModalFooter,
    ModalOverlay,
    ModalHeader,
    ModalContent,
    IconButton,
    Image,
    Button,
    useColorModeValue,
    Icon,
    HStack,
    StackDivider,
    Stack,
    useDisclosure,
    ModalCloseButton,
    ModalBody,
    Text
} from '@chakra-ui/react';

import { 
    StarIcon,
    AddIcon,
    SmallCloseIcon,
    EditIcon
} from '@chakra-ui/icons';

import { BiUser, BiDotsVerticalRounded, BiUpArrowAlt, BiFlag, BiLike, BiShare, BiChat, BiCheckShield } from 'react-icons/bi';

import { AiFillLike } from 'react-icons/ai';

import { useState } from 'react';

import SendComment from '../SendComment';

import { postProtectedSpottedReport, postProtectedSpottedVote } from '../../services/Api';

export default function SpottedCard({id, user_id, text, created_at, updated_at, image, user, postVotes, comments}){
    const name = String(user.name);
    const username = String(user.username);
    const userId = String(user.id);
    const isActivated = Boolean(user.is_activated);
    const dateCreated = new Date(Date.parse(created_at));
    const dateFormatted = (dateCreated.getDate())+"/"+(dateCreated.getMonth()+1)+"/"+(dateCreated.getFullYear())+" às "+(dateCreated.getHours())+":"+(dateCreated.getMinutes())
    const spottedId = String(id);
    const commentsCount = comments.length;
    const votesCount = postVotes.length;
    var initial_alreadyVoted = false
    
    for(let vote of postVotes){
        if(vote.user_id == userId){
            initial_alreadyVoted = true;
        }
    };
    const [alreadyVoted, setAlreadyVoted] = useState(initial_alreadyVoted);
    

    const [showComments, setShowComments] = useState(false);
    const [commentButtonBody, setCommentButtonBody] = useState(<><Icon boxSize={4} as={BiChat} /> <Text>{commentsCount} Respostas</Text></>);
    const [voteButtonBody, setVoteButtonBody] = useState(<><Icon boxSize={4} as={alreadyVoted ? AiFillLike : BiLike} /> <Text>{votesCount} Up</Text></>);
    const [reportText, setReportText] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [infoBox, setInfoBox] = useState(<></>);
    const [voteInfoBox, setVoteInfoBox] = useState(null);

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
                            <Text>{user.name}</Text>{getVerifiedIcon(isActivated)}
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
        if(comments.length > 0){
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
                            <Text>{user.name}</Text>{getVerifiedIcon(isActivated)}
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
                    marginBottom={2}
                >
                    <Text>Esse post ainda não tem comentários.</Text>
                </Box>

            )
        }
    }

    const handleCommentButton = (e) => {
        if(showComments){
            setCommentButtonBody(<><Icon boxSize={4} as={BiChat} /> <Text>{commentsCount} Respostas</Text></>)
            
        } else {
            setCommentButtonBody(<><Icon boxSize={5} as={BiUpArrowAlt} /> <Text>{commentsCount} Respostas</Text></>)
        }
        setShowComments((prev) => !prev);
    }

    const serverError = () => {
        return(
          <Alert status='error' borderRadius={15}>
            <AlertIcon/>
            <AlertDescription>
                Erro no servidor!
            </AlertDescription>
          </Alert>
        )
    }

    const customError = (message) => {
        return(
          <Alert status='error' borderRadius={15}>
            <AlertIcon/>
            <AlertDescription>
                {message}
            </AlertDescription>
          </Alert>
        )
    }

    const waitingServer = () => {
        return(
            <Alert status='info' borderRadius={15}>
                <AlertIcon/>
                <AlertDescription>
                    Aguardando o servidor...
                </AlertDescription>
            </Alert>
        )
    }
    const successFlagServer = () => {
        return(
            <Alert status='success' borderRadius={15}>
                <AlertIcon/>
                <AlertDescription>
                    Denúncia enviada.
                </AlertDescription>
            </Alert>
        )
    }
    const successVoteServer = () => {
        return(
            <Alert status='success' borderRadius={15}>
                <AlertIcon/>
                <AlertDescription>
                    Voto enviado.
                </AlertDescription>
            </Alert>
        )
    }

    const handleReportSubmit = async (reportText, id) => {
        setInfoBox(waitingServer());
        var response = {}
        try {
            response = await postProtectedSpottedReport({ spottedId: spottedId, text: reportText })
            if(response.hasOwnProperty('status') && response.status == 200){
                setInfoBox(successFlagServer())
                onClose();
                setInfoBox(<></>)
            }
        } catch (error){
            if(error.response.hasOwnProperty('status') && error.response.status == 403){
                setInfoBox(customError('Você já denunciou esse spotted.'))
            } else if(error.response.hasOwnProperty('status') && error.response.status == 400){
                setInfoBox(customError('O motivo da denúncia não pode estar vazio.'))
            } else{
                setInfoBox(serverError())
            }
        }
    }

    const handleVoteClick = async (spottedId) => {
        var response = {}
        try {
            response = await postProtectedSpottedVote({ spottedId: spottedId })
            if(response.hasOwnProperty('status') && response.status == 200){
                setVoteButtonBody(<><Icon boxSize={4} as={AiFillLike} /> <Text>{votesCount+1} Up</Text></>)
                setAlreadyVoted(true);
                setVoteInfoBox(successVoteServer());
            }
        } catch (error){
            if(error.response.hasOwnProperty('status') && error.response.status == 403){
                setVoteInfoBox(customError("Você já votou nesse spotted."))
            } else{
                null
            }
        }
    }

    return(
        <>
        <Card maxW='md' size='xm' bg={useColorModeValue('yellow.200', 'yellow.800')} borderRadius={15}>
        <Stack divider={<StackDivider borderColor={useColorModeValue('blackAlpha.200', 'whiteAlpha.200')} />} margin={3}>
            <Flex spacing={2}>
                <Flex flex='1' gap={3} alignItems='center' flexWrap='wrap'>
                    <Avatar name={name} src='anonymous.jpg' />
                    <Box>
                    <Flex direction="row" gap={2} alignItems="center" justifyContent="space-between">   
                        <Heading size='sm'>{name}</Heading>
                        {getVerifiedIcon(isActivated)}
                    </Flex>
                    <Text align='left' fontSize='sm'>{username}</Text>
                    <Text color={useColorModeValue('yellow.600', 'yellow.200')} align='left' fontSize='xs'>{dateFormatted}</Text>
                    </Box>
                </Flex>
                <Menu>
                    <MenuButton
                        as={Button}
                        rounded={'full'}
                        variant={'link'}
                        cursor={'pointer'}  
                        minW={0}>
                    <IconButton
                        variant='ghost'
                        colorScheme='yellow'
                        aria-label='Opções'
                        icon={<Icon boxSize={6} as={BiDotsVerticalRounded} />}
                    />
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={onOpen}>
                            <HStack>
                                <Icon aria-label='Denunciar' as={BiFlag}/>
                                <Text>Denunciar</Text>
                            </HStack>
                        </MenuItem>
                    </MenuList>
                </Menu>

            </Flex>

            <Text>
                {text}
            </Text>
            
            {getImage(image)}
            {voteInfoBox == null ? null : voteInfoBox}

        <Flex align="center" justify="space-between" flexDirection="row" gap={2}>
            <Button isDisabled={alreadyVoted} gap={1} onClick={(e) => handleVoteClick(id)} colorScheme="yellow" size='sm' variant='ghost'>
                {voteButtonBody}
            </Button>
            <Button gap={1} onClick={(e) => handleCommentButton(e)} colorScheme="yellow" size='sm' variant='ghost'>
                {commentButtonBody}
            </Button>
            <Button isDisabled colorScheme="yellow" size='sm' variant='ghost' leftIcon={<Icon boxSize={4} as={BiShare} />}>
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
                    gap={0}    
                >
                    {createComments(comments)}
                    <SendComment spottedId={spottedId}/>
                </Flex>
                </Box>
            </Card> : null }
        </Card>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader bg={useColorModeValue('yellow.200', 'yellow.600')}>
            <HStack>
                <Icon as={BiFlag}/>
                <Text>
                    Denunciar Spotted
                </Text>
            </HStack>
            
        </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Flex flexDirection="column" gap={4} pt={4}>
              {infoBox}
              <Box padding="0.5em" flexDirection="column" align='left' borderRadius={15} background={useColorModeValue('yellow.200', 'yellow.600')}>
                <Text fontSize='xs'>Spotted ID: {id}</Text>
                <Text fontSize='xs'>Autor: {user.name}</Text>
                <Text fontSize='xs'>Username do autor: {user.username}</Text>
              </Box>
              <FormControl isRequired id="text">
                <Textarea 
                  isRequired
                  placeholder='Digite o motivo da sua denúncia' 
                  onBlur = {event => setReportText(event.currentTarget.value)}
                  />
              </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter>
          <Flex gap={4} flexDirection="row" justify="space-between">
            <FormControl>
              <Button onClick={onClose}>
                <Flex align="center" flexDirection="row" gap={2}>
                  <SmallCloseIcon/>
                  <Text>Fechar</Text>
                </Flex>
              </Button>
            </FormControl>
            <FormControl>
              <Button id="sendReport" type="submit" onClick={() => handleReportSubmit(reportText, id)}>
                <Flex align="center" flexDirection="row" gap={2}>
                <EditIcon/>
                <Text>Enviar</Text>
                </Flex>
              </Button>
            </FormControl>
          </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
    );
}