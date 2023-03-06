import {
    Text,
    HStack,
    Image
} from '@chakra-ui/react'

import { Link as RouteLink } from 'react-router-dom';

export default function Logo(){
    return(
        <HStack flexDirection='row' spacing={3}>
            <Image boxSize='40px' objectFit='cover' src="caaso.png" fallbackSrc='https://via.placeholder.com/150' alt='CAASO'/>
            <RouteLink to="/">
            <HStack spacing={0} align="center">
                <Text fontSize='lg'>spotted</Text>
                <Text as='b' fontSize='lg'>CAASO</Text> 
            </HStack>
            </RouteLink>
        </HStack>
    )
}