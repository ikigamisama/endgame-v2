import {
  CharacterSearchButton,
  CharacterTextFieldSearch,
} from "@/src/styles/CharacterPick";
import {
  AccountAvatar,
  TableFeaetureButton,
  TableTextFont,
} from "@/src/styles/Settings";
import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const AccountList: React.FC = () => {
  return (
    <Box w="100%">
      <HStack my={4} gap={4}>
        <CharacterTextFieldSearch type="text" placeholder="Search Users" />
        <CharacterSearchButton>Search</CharacterSearchButton>
      </HStack>
      <TableContainer>
        <Table variant="stripped">
          <Thead>
            <Tr>
              <Th>
                <TableTextFont>Avatar</TableTextFont>
              </Th>
              <Th>
                <TableTextFont>Name</TableTextFont>
              </Th>
              <Th>
                <TableTextFont>Role</TableTextFont>
              </Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <AccountAvatar>
                  <Image
                    src={
                      "https://api.dicebear.com/6.x/adventurer/svg?seed=Baby"
                    }
                    alt="avatar"
                    width="100%"
                  />
                </AccountAvatar>
              </Td>
              <Td>
                <TableTextFont>iikigami</TableTextFont>
              </Td>
              <Td>
                <TableTextFont>GM</TableTextFont>
              </Td>
              <Td>
                <TableFeaetureButton
                  aria-label="edit-info"
                  icon={<EditIcon />}
                />
              </Td>
            </Tr>
            <Tr>
              <Td>
                <AccountAvatar>
                  <Image
                    src={
                      "https://api.dicebear.com/6.x/adventurer/svg?seed=Baby"
                    }
                    alt="avatar"
                    width="100%"
                  />
                </AccountAvatar>
              </Td>
              <Td>
                <TableTextFont>iikigami</TableTextFont>
              </Td>
              <Td>
                <TableTextFont>GM</TableTextFont>
              </Td>
              <Td>
                <TableFeaetureButton
                  aria-label="edit-info"
                  icon={<EditIcon />}
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AccountList;
