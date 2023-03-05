import { Box, useColorModeValue, Flex } from '@chakra-ui/react';

export default function BoxComponent(props){
    return(
    <Box
        background="yellow.300"
        borderRadius={15}
    >
        <Box
            background={useColorModeValue('whiteAlpha.600', 'blackAlpha.700')}
            borderRadius={15}

            marginTop="2%"
            height="80%"
        >
            <Flex 
                paddingRight="1em"
                paddingLeft="1em"
                paddingTop="1em"
                paddingBottom="1em"
                direction="column"
            >
                {props.children}
            </Flex>
        </Box>
    </Box>)
}