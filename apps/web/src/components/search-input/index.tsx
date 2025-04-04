"use client";

import { Search } from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "../ui/icon-button";

export const SearchInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [onSearch, setOnSearch] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const name = searchParams.get("name") as string;

  const handleSearch = () => {
    setOnSearch(true);
  };

  const handleCloseSearch = () => {
    setOnSearch(false);
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const searchParams = new URLSearchParams();
    searchParams.set("name", inputRef.current?.value || "");
    router.push(`search?${searchParams.toString()}`);
  };

  useEffect(() => {
    if (onSearch) {
      inputRef.current?.focus();
    }

    if (name && inputRef.current) {
      setOnSearch(true);
      inputRef.current.value = name;
    }
  }, [onSearch, name]);

  return (
    <>
      {onSearch ? (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-[#F7F7F8] flex items-center justify-center cursor-pointer text-primary max-w-[180px] p-3 px-5 gap-1 transition-all duration-300"
        >
          <input
            ref={inputRef}
            type="text"
            className="w-full h-full outline-none"
            onBlur={handleCloseSearch}
          />
        </form>
      ) : (
        <IconButton onClick={handleSearch}>
          <Search />
        </IconButton>
      )}
    </>
  );
};
