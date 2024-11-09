"use server";

import { cookies } from "next/headers";

export async function checkUser(_state: unknown, formData: FormData) {
  const username = formData.get("username");
  const jobTitle = formData.get("jobTitle");

  try {
    // Although VSCode says this 'await' is unnecessary, this is the recommended way by next official documentation
    // See: https://nextjs.org/docs/app/api-reference/functions/cookies
    (await cookies()).set(
      "user-information",
      JSON.stringify({
        username,
        jobTitle,
      }),
      { secure: true }
    );
    return false;
  } catch (error: any) {
    return error.message as string;
  }
}

export async function signOut() {
  (await cookies()).delete("user-information");
}
