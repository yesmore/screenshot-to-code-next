"use client";

import { BsGithub } from "react-icons/bs";

export default () => {
  return (
    <header>
      <div className="bg-white flex items-center p-2 pl-4 border-b-[1px] border-r-[1px] fixed left-0 lg:w-96 z-[49]">
        <img src="/logo.png" width="30" height="30" alt="logo" />
        <h1 className="ml-2 text-2xl font-semibold bg-gradient-to-r from-slate-600 via-slate-500 to-slate-400 bg-clip-text text-transparent">
          Codify.ICU
        </h1>
      </div>
    </header>
  );
};
