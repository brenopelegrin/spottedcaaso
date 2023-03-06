import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    Alert,
    AlertIcon,
    AlertDescription,
    FormErrorMessage,
    useColorModeValue,
  } from '@chakra-ui/react';

import { useState } from 'react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';

import { registerUser } from '../../services/Api';

import DummyBox from '../../components/DummyBox';
  
export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [infoBox, setInfoBox] = useState(<></>);

  const navigate = useNavigate();

  const infoBoxComponent = ({status, message, key}, props) => {
    return(
      <Alert key={key ? key : null} status={status} borderRadius={15}>
        <AlertIcon />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setInfoBox(infoBoxComponent({status:'info', message:'Aguardando o servidor...'}))
    try {
      const response = await registerUser({email, name, username, password})
      setInfoBox(infoBoxComponent({status: 'success', message: 'Conta criada com sucesso!'}))
      navigate('/emailsent');
    } catch(error) {
      const errorBoxes = [];
      if(error.response.data.hasOwnProperty('errors')){
        const errors = error.response.data.errors;
        errors.map( (error, index) => {
          if(error.hasOwnProperty('rule') && error.rule === 'unique'){
            if(error.field === 'email'){
              errorBoxes.push(infoBoxComponent({key: index, status: 'error', message: 'Já existe uma conta com esse email'}))
            }
            if(error.field === 'username'){
              errorBoxes.push(infoBoxComponent({key: index, status: 'error', message: 'Já existe uma conta com esse nome de usuário'}))
            }
          }
        })
      }
      setInfoBox(
        <Flex direction="column" gap={4}>
          {errorBoxes}
        </Flex>)
    }
  };

  return (
    <Flex
      minH={'80vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <DummyBox>
        <Stack align={'center'}>
          <Heading fontSize={'3xl'}>🚀 Criar conta</Heading>
          <Text fontSize={'md'}>
            Vamos criar uma conta novinha para você 
          </Text>
        </Stack>  
        </DummyBox>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>  
          <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            {infoBox}
            <FormControl isRequired id="email">
              <FormLabel>Email USP</FormLabel>
              <Input 
                focusBorderColor='yellow.400'
                placeholer='Digite seu email'
                background={useColorModeValue('gray.100', 'blackAlpha.300')}
                type="email"
                onChange={event => setEmail(event.currentTarget.value)} />
            </FormControl>
            <FormControl isRequired id="name">
              <FormLabel>Seu nome</FormLabel>
              <Input 
                focusBorderColor='yellow.400'
                placeholer='Digite seu nome'
                background={useColorModeValue('gray.100', 'blackAlpha.300')}
                type="text"
                onChange={event => setName(event.currentTarget.value)} />
            </FormControl>
            <FormControl isRequired id="username">
              <FormLabel>Usuário</FormLabel>
              <Input 
                focusBorderColor='yellow.400'
                placeholer='Digite seu usuário'
                background={useColorModeValue('gray.100', 'blackAlpha.300')}
                type="text"
                onChange={event => setUsername(event.currentTarget.value)} />
            </FormControl>
            <FormControl isRequired id="password">
              <FormLabel>Senha do spotted</FormLabel>
              <Input
                focusBorderColor='yellow.400'
                placeholder='Digite sua senha'
                background={useColorModeValue('gray.100', 'blackAlpha.300')}
                type="password"
                onChange={event => setPassword(event.currentTarget.value)}/>
            </FormControl>
            <Stack spacing={4}>
              <Button
                bg={'yellow.500'}
                color={'white'}
                type="submit"
                _hover={{
                  bg: 'yellow.600',
                }}>
                Criar
              </Button>
              <Text fontSize={'md'}>
                Já tem uma conta? <Link color={useColorModeValue('yellow.600', 'yellow.400')}><RouteLink to="/login">Fazer login</RouteLink></Link>
              </Text>
            </Stack>
          </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}