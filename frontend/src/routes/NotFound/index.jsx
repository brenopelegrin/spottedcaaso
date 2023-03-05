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

import { Link as RouteLink } from 'react-router-dom';
  
export default function NotFoundPage() {

  return (
    <Flex
      minH={'80vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Página não encontrada</Heading>
          <Text fontSize={'lg'}>
            Voltar à <Link color={useColorModeValue('yellow.600', 'yellow.400')}><RouteLink to="/">página inicial</RouteLink></Link>
          </Text>
        </Stack>  
      </Stack>
    </Flex>
  );
}