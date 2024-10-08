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
                    <Tab isDisabled bg={useColorModeValue('blackAlpha.300', 'blackAlpha.700')} _selected={{ color: 'white', bg: 'yellow.500' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17.06 13c-1.86 0-3.42 1.33-3.82 3.1c-.95-.41-1.82-.3-2.48-.01C10.35 14.31 8.79 13 6.94 13C4.77 13 3 14.79 3 17s1.77 4 3.94 4c2.06 0 3.74-1.62 3.9-3.68c.34-.24 1.23-.69 2.32.02c.18 2.05 1.84 3.66 3.9 3.66c2.17 0 3.94-1.79 3.94-4s-1.77-4-3.94-4M6.94 19.86c-1.56 0-2.81-1.28-2.81-2.86s1.26-2.86 2.81-2.86c1.56 0 2.81 1.28 2.81 2.86s-1.25 2.86-2.81 2.86m10.12 0c-1.56 0-2.81-1.28-2.81-2.86s1.25-2.86 2.81-2.86s2.82 1.28 2.82 2.86s-1.27 2.86-2.82 2.86M22 10.5H2V12h20v-1.5m-6.47-7.87c-.22-.49-.78-.75-1.31-.58L12 2.79l-2.23-.74l-.05-.01c-.53-.15-1.09.13-1.29.64L6 9h12l-2.44-6.32l-.03-.05Z"/></svg>   Anônimo</Tab>
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