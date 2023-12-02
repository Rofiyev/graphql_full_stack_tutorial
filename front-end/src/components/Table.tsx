import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { IResData } from "../interface";
import { LOAD_USERS } from "../graphql/Queries";
import { useState, useEffect } from "react";

const Table = () => {
  const [users, setUsers] = useState([]);
  const { data, error, loading } = useQuery(LOAD_USERS);

  useEffect(() => {
    data && setUsers(data.getAllUsers);
  }, [data]);

  console.log(error);

  return (
    <>
      <Box w={"90%"} margin={"5rem auto"}>
        {loading ? (
          <Flex w="full" align={"center"} justify={"center"}>
            <Spinner />
          </Flex>
        ) : (
          <TableContainer maxW={"full"} margin={"1rem auto 0"}>
            <ChakraTable variant="simple">
              <Thead>
                <Tr>
                  <Th fontFamily={"inherit"}>ID</Th>
                  <Th fontFamily={"inherit"}>First Name</Th>
                  <Th fontFamily={"inherit"}>Last Name</Th>
                  <Th fontFamily={"inherit"}>Email</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((item: IResData) => (
                  <Tr key={item.id}>
                    <Td fontFamily={"inherit"}>{item.id}</Td>
                    <Td fontFamily={"inherit"}>{item.firstName}</Td>
                    <Td fontFamily={"inherit"}>{item.lastName}</Td>
                    <Td fontFamily={"inherit"}>{item.email}</Td>
                  </Tr>
                ))}
              </Tbody>
            </ChakraTable>
          </TableContainer>
        )}
      </Box>
    </>
  );
};

export default Table;
