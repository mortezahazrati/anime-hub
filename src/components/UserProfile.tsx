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
import SingOutMenuItem from "./SingOutMenuItem";

const UserProfile = () => {
  const userInCookie = cookies().get("user-information")?.value;

  // Immediately returning null, if no user is already signed in.
  // So, no profile menu will be shown in NavBar if the user is not signed in
  if (!userInCookie) return null;

  const userInfoFromCookie: { username: string; jobTitle: string } =
    userInCookie ? JSON.parse(userInCookie) : { username: "", jobTitle: "" };
  return (
    <Menu>
      <MenuButton as="button">
        <Flex gap={4} justifyContent="center" alignItems="center">
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

      <MenuList>
        <MenuItem>
          <Link href="/user">Update Profile</Link>
        </MenuItem>
        <SingOutMenuItem />
      </MenuList>
    </Menu>
  );
};

export default UserProfile;
