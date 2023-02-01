import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  FormControl,
  FormLabel,
  Switch,
  HStack,
  Text,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Textarea,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';

import { BiUser } from 'react-icons/bi';

import { 
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  ChatIcon,
  SettingsIcon,
  SunIcon,
  MoonIcon,
  Icon,
  EditIcon,
  SmallCloseIcon
} from '@chakra-ui/icons';
import Logo from '../Logo'

import { Link as RouteLink } from 'react-router-dom';

const Links = [['Feed', 'feed']];

const NavLink = (props) => (
  <Button
    size={'sm'}
    mr={4}
    colorScheme={'yellow'}
    rounded={'md'}
    >
    <RouteLink to={props.children[1]}>{props.children[0]}</RouteLink>
  </Button>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen: isCreatorOpen, onOpen: onCreatorOpen, onClose: onCreatorClose } = useDisclosure();

  const getThemeIcon = (theme) => {
    if(theme === 'light'){
      return (<MoonIcon/>)
    }
    else{
      return(<SunIcon/>)
    }
  };

  return (
    <>
      <Box bg={useColorModeValue('yellow.200', 'yellow.600')} px={4} boxShadow='sm'>

        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Abrir menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Logo/>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button onClick={toggleColorMode}
              variant={'solid'}
              colorScheme={'yellow'}
              size={'sm'}
              mr={4}
            >
              {getThemeIcon(colorMode)}
            </Button>
            <Button
              variant={'solid'}
              colorScheme={'yellow'}
              size={'sm'}
              mr={4}
              onClick={onCreatorOpen}
              leftIcon={<AddIcon />}>
              Criar
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  name={'Test User'}
                  src={
                    'anonymous.jpg'
                  }
                />
              </MenuButton>
              <MenuList>
                <RouteLink to="/profile">
                  <MenuItem>
                    <HStack spacing={2}><Icon as={BiUser}/><Text>Perfil</Text></HStack>
                  </MenuItem>
                </RouteLink>
                <RouteLink to="/my">
                  <MenuItem>
                    <HStack spacing={2}><EditIcon/><Text>Meus spotteds</Text></HStack>
                  </MenuItem>
                </RouteLink>
                <RouteLink to="/messages">
                  <MenuItem>
                    <HStack spacing={2}><ChatIcon/><Text>Mensagens</Text></HStack>
                  </MenuItem>
                </RouteLink>
                <MenuDivider />
                <RouteLink to="/settings">
                  <MenuItem>
                    <HStack spacing={2}><SettingsIcon/><Text>Configurações</Text></HStack>
                  </MenuItem>
                </RouteLink>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Modal onClose={onCreatorClose} isOpen={isCreatorOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
            <ModalHeader bg={useColorModeValue('yellow.200', 'yellow.600')}>Criar novo Spotted <ModalCloseButton /></ModalHeader>
          <ModalBody>
            <Flex flexDirection="column" gap={4} pt={4}>
              <Textarea placeholder='Digite aqui algo bem curioso...' />
              <FormControl display='flex' alignItems='center'>
                <FormLabel htmlFor='is-anonymous' mb='0'>
                  Mensagem anônima
                </FormLabel>
                <Switch id='is-anonymous' />
              </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter>
          <Flex gap={4} flexDirection="row" justify="space-between">
            <Button onClick={onCreatorClose}>
              <Flex align="center" flexDirection="row" gap={2}>
                <SmallCloseIcon/>
                <Text>Fechar</Text>
              </Flex>
            </Button>
            <Button>
              <Flex align="center" flexDirection="row" gap={2}>
              <EditIcon/>
              <Text>Enviar</Text>
              </Flex>
            </Button>
          </Flex>
          </ModalFooter>
      </ModalContent>
      </Modal>
    </>
  );
}