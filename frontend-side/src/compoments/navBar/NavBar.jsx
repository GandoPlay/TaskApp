import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import Routes from '../../Constant'

const NavLink = ({ title,url }) => (
  <Link
    px={2}
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
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
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