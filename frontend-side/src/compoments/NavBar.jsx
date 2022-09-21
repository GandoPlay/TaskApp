import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  Text,
  useColorModeValue,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Routes } from "../Constant";
import { useRef, useState } from "react";
import useStore from "../appStore";

function removeTokens() {
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
}
const NavLink = ({ title, url }) => (
  <Link
    px={2}
    onClick={url === "/" ? removeTokens : () => {}}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={url}
  >
    {title}
  </Link>
);

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const username = useStore((state) => state.username);

  const [color, setColor] = useState(useColorModeValue("gray.100", "gray.900"));

  if (window.location.pathname !== "/") {
    return (
      <>
        <Box bg={color} px={4}>
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <Avatar
              size={"md"}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Hatal.png/180px-Hatal.png"
            />

            <HStack spacing={8} alignItems={"center"}>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {Object.keys(Routes).map((key) =>
                  key == "/" ? (
                    <>
                      <Button onClick={onOpen} fontWeight={'normal'}>התנתק</Button>
                      <AlertDialog
                        motionPreset="slideInBottom"
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                        isOpen={isOpen}
                        isCentered
                        
                      >
                        <AlertDialogOverlay />
                        <AlertDialogContent>
                          <AlertDialogHeader dir="rtl">
                            התנתק
                          </AlertDialogHeader>
                          <AlertDialogCloseButton />
                          <AlertDialogBody dir="rtl">
                            האם הנך בטוח שהנך רוצה להתנתק
                          </AlertDialogBody>
                          <AlertDialogFooter>
                          <Button onClick={onClose}>
                          <NavLink key={key} title={Routes[key]} url={key}>yes</NavLink>
                            </Button>
                            <Button ref={cancelRef} onClick={onClose}>
                              השאר
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  ) : (
                    <NavLink key={key} title={Routes[key]} url={key}></NavLink>
                  )
                )}
              </HStack>
            </HStack>
            <Flex alignItems={"center"}>
              <Text color="green" w="250px" h="50px" fontSize="200%">
                {username} שלום{" "}
              </Text>

              <Avatar size={"md"} src={require("./zroa.png")} />
            </Flex>
          </Flex>
        </Box>
      </>
    );
  }
}
