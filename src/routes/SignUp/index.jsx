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
    useColorModeValue,
  } from '@chakra-ui/react';

import { useState } from 'react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';

import { registerUser } from '../../services/Api';
  
export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [infoBox, setInfoBox] = useState(<></>);

  const navigate = useNavigate();

  const infoBoxComponent = ({status, message}) => {
    return(
      <Alert status={status}>
        <AlertIcon />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Email: ${email} & Password: ${password}`);
    setInfoBox(infoBoxComponent({status:'info', message:'Aguardando o servidor...'}))
    try {
      const response = await registerUser({email, username, password})
      setInfoBox(infoBoxComponent({status: 'success', message: 'Conta criada com sucesso!'}))
      navigate('/emailsent');
    } catch(error) {
      setInfoBox(infoBoxComponent({status: 'error', message: 'Erro no servidor'}))
    }
  };

  return (
    <Flex
      minH={'80vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Criar conta</Heading>
          <Text fontSize={'lg'}>
            Vamos criar uma conta novinha para você
          </Text>
        </Stack>  
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
                type="email"
                onChange={event => setEmail(event.currentTarget.value)} />
            </FormControl>
            <FormControl isRequired id="username">
              <FormLabel>Usuário</FormLabel>
              <Input 
                focusBorderColor='yellow.400'
                placeholer='Digite seu usuário'
                type="text"
                onChange={event => setUsername(event.currentTarget.value)} />
            </FormControl>
            <FormControl isRequired id="password">
              <FormLabel>Senha do spotted</FormLabel>
              <Input
                focusBorderColor='yellow.400'
                placeholder='Digite sua senha'
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