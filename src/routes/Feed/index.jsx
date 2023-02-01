import SpottedCard from '../../components/SpottedCard';
import { 
    Flex, 
  } from '@chakra-ui/react';

export default function Feed(){
  
    return(
        <Flex align="center" gap={4} margin={5} justifyContent="center" flexDirection="column">
            <SpottedCard/>
            <SpottedCard/>
            <SpottedCard/>
            <SpottedCard/>
        </Flex>
    )
}