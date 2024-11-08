import { Box } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";

import UserProfile from "./UserProfile";

const NavBar = () => {
  return (
    <Box padding="10px" display="flex" justifyContent="space-between">
      <Box>
        <Link href="/">
          <Image
            src="/leonardo.svg"
            width={48}
            height={48}
            alt="leonardo-icon"
          />
        </Link>
      </Box>
      <UserProfile />
    </Box>
  );
};

export default NavBar;
