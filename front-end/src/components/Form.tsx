import React, { useState, useRef } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { CREATE_USER_MUTATION } from "../graphql/Mutation.tsx";
import { useMutation } from "@apollo/client";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function Form() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const ref = useRef<HTMLFormElement>(null);

  const [createUser, { error }] = useMutation(CREATE_USER_MUTATION);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentRef = ref.current as HTMLFormElement;
    const { firstName, lastName, email, password } = currentRef;

    if (firstName.value && lastName.value && email.value && password.value) {
      const newData: IUser = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      };
      createUser({ variables: newData });
      currentRef.reset();
      if (error) console.log(error);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"2xl"} py={12} px={6}>
        <Box
          as="form"
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          ref={ref}
          onSubmit={handleSubmit}
        >
          <Heading fontFamily={"inherit"} textAlign={"center"} mb={2}>
            Form
          </Heading>
          <Stack spacing={4}>
            <HStack w="full">
              <Box w={"50%"}>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" name="firstName" />
                </FormControl>
              </Box>
              <Box w={"50%"}>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" name="lastName" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
