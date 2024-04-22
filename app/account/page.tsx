"use client";

import Header from "@/components/Header";
import { useState } from "react";
import AccountContent from "./components/AccountContent";
import { useUser } from "@/hooks/useUserAuth";
import { redirect } from "next/navigation";


export const revalidate = 0;

interface AccountProps {
  authToken: string;
};

const Account = () => {

const user = useUser();
if (user === null) {
  redirect('/')
}

  return (
    <div
      className="
        bg-neutral-900
        rounded-lg
        h-full
        w-full
        overflow-hidden
        overflow-y-auto
      "
    >
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-2">
          <h1 className="text-white text-3xl font-semibold">
            Profil Utilizator
          </h1>
        </div>
      </Header>
      <AccountContent/>
    </div>
  );
}

export default Account;