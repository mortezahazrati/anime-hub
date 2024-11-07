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
        <Flex width={170} gap={4}>
          <Avatar />
          <Box>
            <Text fontWeight="bold">{userInfoFromCookie.username}</Text>
            <Text>{userInfoFromCookie.jobTitle}</Text>
          </Box>
        </Flex>
      </MenuButton>

      <MenuList>
        <Link href="/user">
          <MenuItem>Update Profile</MenuItem>
        </Link>
        {/* TODO: Add logging out functionality */}
        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserProfile;
