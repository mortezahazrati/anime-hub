"use client";

import { FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

import { SubmitButton } from "./SubmitButton";
import { checkUser } from "@/app/signin/actions";

export const SigninForm = ({
  userInfoFromCookie,
}: {
  userInfoFromCookie?: { username: string; jobTitle: string };
}) => {
  const router = useRouter();

  const [error, dispatch] = useFormState(checkUser, undefined);

  if (error === false) {
    router.push("/");
    return null;
  }

  return (
    <form action={dispatch}>
      <VStack
        alignItems="flex-start"
        padding={{ base: 4, lg: 8 }}
        spacing={{ base: 4, lg: 8 }}
      >
        <FormControl as="fieldset" isRequired>
          <FormLabel as="legend">Enter your username:</FormLabel>
          <Input
            autoFocus
            name="username"
            placeholder="User name"
            defaultValue={userInfoFromCookie?.username}
          />
        </FormControl>
        <FormControl as="fieldset" isRequired>
          <FormLabel as="legend">Enter your job title:</FormLabel>

          <Input
            name="jobTitle"
            placeholder="Job title"
            defaultValue={userInfoFromCookie?.jobTitle}
          />
        </FormControl>

        <SubmitButton label={userInfoFromCookie ? "Update" : "Submit"} />
      </VStack>
    </form>
  );
};
