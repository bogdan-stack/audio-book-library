"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { useRouter, redirect } from "next/navigation";
import { useUser } from "@/hooks/useUserAuth";

import useDebounce from "@/hooks/useDebounce";

import Input from "./Input";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500);
  const user = useUser();

  if (user === null) {
    redirect('/');
  }


  useEffect(() => {
    const query = {
      denumire: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: '/search',
      query
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      placeholder="Ce vrei să asculți?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default SearchInput;