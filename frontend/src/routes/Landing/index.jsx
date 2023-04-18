import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    HStack,
    Container,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Icon
  } from '@chakra-ui/react';

import { CheckCircleIcon } from '@chakra-ui/icons';

import { Link as RouteLink } from 'react-router-dom';

import { AiFillGithub } from 'react-icons/ai';

import Logo from '../../components/Logo';

import DummyBox from '../../components/DummyBox';
  
export default function LandingPage() {

  return (
    <Flex
      minH={'80vh'}
      align={'center'}
      justify={'center'}
    >
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          Uma rede social do{' '}
          <Text as={'span'} color={useColorModeValue('orange.400', 'yellow.300')}>
            CAASO
          </Text>
        </Heading>
        <Heading maxW={'3xl'} fontSize='xl' fontWeigth={500}>
          <Text as='span' color={useColorModeValue('yellow.500', 'yellow.200')}>
          Crie mensagens anônimas ou identificadas.{' '}
          </Text>
          <Text as='span' color={useColorModeValue('yellow.700', 'yellow.400')}>
          Descubra quem é seu crush do bandeco.{' '}
          </Text>
          <Text as='span' color={useColorModeValue('orange.400', 'orange.300')}>
          Reclame anonimamente.{' '}
          </Text>
          <Text as='span' color={useColorModeValue('red.500', 'red.200')}>
          Interaja com a comunidade da USP São Carlos.
          </Text>
          
        </Heading>
        <DummyBox>
          <HStack>
          <Icon as={AiFillGithub} boxSize='6'/>
          <Text as='span'>
          Um projeto de{' '}
          </Text>
            <Text as='span' color={useColorModeValue('yellow.800', 'yellow.200')}>
              <Link href="https://github.com/brenopelegrin/spottedcaaso" isExternal>código aberto</Link>
            </Text>
          <Text>
          {' '}criado por{' '}
          </Text>
            <Text as='span' color={useColorModeValue('yellow.800', 'yellow.200')}>
              <Link href="https://github.com/brenopelegrin" isExternal>brenopelegrin.</Link>
            </Text>
          </HStack>
        </DummyBox>
        <Stack spacing={6} direction={'row'}>
          <RouteLink to="/login">
          <Button
            rounded={'full'}
            px={6}
            colorScheme={'orange'}
            bg={'yellow.500'}
            _hover={{ bg: 'yellow.600' }}>
            Entrar
          </Button>
          </RouteLink>
          <RouteLink to='/signup'>
          <Button rounded={'full'} px={6}>
            Criar conta
          </Button>
          </RouteLink>
        </Stack>
      </Stack>
    </Container>
    </Flex>
  );
}