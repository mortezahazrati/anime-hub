"use client";

import { signOut } from "@/app/signin/actions";
import { MenuItem } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const SingOutMenuItem = () => {
  const router = useRouter();

  return (
    <MenuItem
      onClick={async () => {
        await signOut();
        router.push("/signin");
      }}
    >
      Logout
    </MenuItem>
  );
};

export default SingOutMenuItem;
