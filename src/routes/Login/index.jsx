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
    useColorModeValue,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react';

import { useState, useContext } from 'react';
import { Link as RouteLink } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
  
export default function LoginPage(nextpage) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [infoBox, setInfoBox] = useState(<></>);

  const { signed, Login } = useAuth();
  async function handleLogin({email, password}) {
    setInfoBox(infoBoxComponent({status:'info', message:'Aguardando o servidor...'}))
    const {status, message} = await Login({
      email: email,
      password: password,
    });
    return({status, message})
  }

  const handleSubmit = event => {
    event.preventDefault();
    console.log(`Email: ${email} & Password: ${password}`);
  };

  const infoBoxComponent = ({status, message}) => {
    return(
      <Alert status={status}>
        <AlertIcon />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    )
  }
  return (
    <Flex
      minH={'80vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Entre na sua conta</Heading>
          <Text fontSize={'lg'}>
            Ainda não tem uma conta? <Link color={useColorModeValue('yellow.600', 'yellow.400')}><RouteLink to="/signup">Clique para criar uma</RouteLink></Link> ✌️
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
            <FormControl isRequired id="password">
              <FormLabel>Senha do spotted</FormLabel>
              <Input
                focusBorderColor='yellow.400'
                placeholder='Digite sua senha'
                type="password"
                onChange={event => setPassword(event.currentTarget.value)}/>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox colorScheme='yellow'>Lembrar</Checkbox>
                <Link color={useColorModeValue('yellow.600','yellow.400')}>Esqueci minha senha</Link>
              </Stack>
              <Button
                bg={'yellow.500'}
                color={'white'}
                type="submit"
                onClick={async () => {
                  const {status, message} = await handleLogin({email: email, password: password});
                  setInfoBox(infoBoxComponent({status, message}))
                }}
                _hover={{
                  bg: 'yellow.600',
                }}>
                Entrar
              </Button>
            </Stack>
          </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}