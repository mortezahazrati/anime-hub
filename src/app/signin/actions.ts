"use server";

import { cookies } from "next/headers";

export async function checkUser(_state: unknown, formData: FormData) {
  const username = formData.get("username");
  const jobTitle = formData.get("jobTitle");

  try {
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
