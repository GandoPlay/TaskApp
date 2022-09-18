import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {Routes} from '../Constant'
import { useState } from 'react';
import useStore from '../appStore';



function removeTokens(){
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('accessToken')
}
const NavLink = ({ title,url }) => (
  <Link
    px={2}
    onClick = {url==='/'?removeTokens: ()=>{}}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    
    href={url}>
    {title}
  </Link>

);


export default function NavBar() {
  const username = useStore(state=> state.username)

  const [color, setColor] = useState(useColorModeValue('gray.100', 'gray.900'))

  if(window.location.pathname!=='/'){
  return (
    <>
      <Box bg={color} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Avatar
                  size={'md'}
                  src= 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Hatal.png/180px-Hatal.png'
                  />
          
          <HStack spacing={8} alignItems={'center'}>
            
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Object.keys(Routes).map((key) => (
                <NavLink key={key} title = {Routes[key]} url = {key}></NavLink>
              ))} 
            </HStack>

          </HStack>
          <Flex alignItems={'center'}> 
          <Text color={'blueviolet'}>{username} שלום </Text>   

                <Avatar
                  size={'md'}
                  src={require("./zroa.png")}
                  />
                  
          </Flex>
        </Flex>
      </Box>

    </>
  );
}
}