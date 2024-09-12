// import {SignUp} from "@clerk/remix";
import {SignIn} from "@clerk/nextjs";

import React from "react";

const SignInPage = () => {
  return (
    <div className=" flex items-center justify-center w-full h-fit">
      <SignIn />
    </div>
  );
};

export default SignInPage;
