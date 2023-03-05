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

import { Link as RouteLink } from 'react-router-dom';
  
export default function EmailSentPage() {

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
                <Text>Verificar identidade</Text>
            </Stack></Heading>
          <Text fontSize={'lg'}>
             Um email de verificação foi enviado.
          </Text>
          <Text fontSize={'lg'}>
            Verifique sua caixa de entrada e ative sua conta.
          </Text>
        </Stack> 
        
        <Button
            bg={'yellow.500'}
            color={'white'}
        ><RouteLink to="/feed">Ir para o feed</RouteLink></Button> 
      </Stack>
    </Flex>
  );
}