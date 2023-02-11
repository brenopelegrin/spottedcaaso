import SpottedCard from '../../components/SpottedCard';
import { 
    Flex, 
    Spinner,
    Alert,
    Text,
    Stack,
    Box,
    AlertIcon,
    AlertDescription,
    Button,
    Icon,
    useColorModeValue,
  } from '@chakra-ui/react';

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import { getFeed } from '../../services/Api';

import { useEffect, useState } from 'react';

import { RxReload } from 'react-icons/rx';

import AuthFeed from '../../components/AuthFeed';

export default function Feed(){
    return(
        <Box 
            p={4}
            maxWidth="100%"
            margin="auto"
            align="center"  
            justifyContent="center"
            >
            <Tabs variant='soft-rounded'>
            <TabList mb='1em'>
                <Flex gap={2} align="center" justifyContent="center" margin="auto">
                    <Tab bg={useColorModeValue('blackAlpha.300', 'blackAlpha.700')} _selected={{ color: 'white', bg: 'yellow.500' }}>Autenticado</Tab>
                    <Tab isDisabled bg={useColorModeValue('blackAlpha.300', 'blackAlpha.700')} _selected={{ color: 'white', bg: 'yellow.500' }}>Anônimo</Tab>
                </Flex>
            </TabList>
            <TabPanels>
                <TabPanel pt={-2}>
                    <AuthFeed/>
                </TabPanel>
                <TabPanel>
                <p>two!</p>
                </TabPanel>
            </TabPanels>
            </Tabs>
        </Box>
    )
}