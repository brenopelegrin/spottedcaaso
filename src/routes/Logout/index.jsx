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

import { CheckCircleIcon } from '@chakra-ui/icons';

import { Link as RouteLink, useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
  
export default function LogoutPage() {
  const { signed, Logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await Logout();
    navigate('/');
  }
  return (
    <Flex
      minH={'80vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} pb={4}>
            <Stack align={'center'} flexDirection='row' gap={4}>
                <CheckCircleIcon/>
                <Text>Fazer logout</Text>
            </Stack></Heading>
          <Text fontSize={'lg'}>
             Você tem certeza que deseja sair da sua conta?
          </Text>
        </Stack> 
        
        <Button
            bg={'yellow.500'}
            color={'white'}
            onClick={handleLogout}
        >Sair</Button> 
        <Button
            bg={'yellow.500'}
            color={'white'}
            
        ><RouteLink to="/feed">Voltar para o feed</RouteLink></Button> 
      </Stack>
    </Flex>
  );
}