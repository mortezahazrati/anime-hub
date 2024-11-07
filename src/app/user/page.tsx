import { cookies } from "next/headers";

import { SigninForm } from "@/components/SigninForm";

const UserPage = () => {
  const userInCookie = cookies().get("user-information")?.value;
  const userInfoFromCookie = userInCookie
    ? JSON.parse(userInCookie)
    : { username: "", jobTitle: "" };

  return <SigninForm userInfoFromCookie={userInfoFromCookie} />;
};

export default UserPage;
