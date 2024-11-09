import {
  Avatar,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { cookies } from "next/headers";

const UserProfile = () => {
  const userInCookie = cookies().get("user-information")?.value;
  const userInfoFromCookie: { username: string; jobTitle: string } =
    userInCookie ? JSON.parse(userInCookie) : { username: "", jobTitle: "" };
  return (
    <Menu>
      <MenuButton as="button">
        <Flex width={170} gap={4} justifyContent="center" alignItems="center">
          <Avatar size={{ base: "sm", sm: "md" }} />
          <Box>
            <Text fontSize={{ base: "sm", sm: "md" }} fontWeight="bold">
              {userInfoFromCookie.username}
            </Text>
            <Text fontSize={{ base: "sm", sm: "md" }}>
              {userInfoFromCookie.jobTitle}
            </Text>
          </Box>
        </Flex>
      </MenuButton>

      <MenuList zIndex="100">
        <MenuItem>
          <Link href="/user">Update Profile</Link>
        </MenuItem>

        {/* TODO: Add logging out functionality */}
        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserProfile;
