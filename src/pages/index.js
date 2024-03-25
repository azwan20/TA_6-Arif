import Login from "./login/login";
import { useEffect, useState } from "react";
import { useUser } from "../../public/user";
import { useRouter } from "next/router";

export default function Home() {
  // const { email, uid } = useUser();
  // const router = useRouter();
  // useEffect(() => {
  //   if (uid) {
  //     router.push('/costumer');
  //   }
  // }, [uid]);
  return (
    <>
      <div className="">
        <Login />
        {/* <Register /> */}
      </div>
    </>
  );
}