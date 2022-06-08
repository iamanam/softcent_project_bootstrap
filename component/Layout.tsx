import Header from "./Header";
import SidBar from "./Sidebar";
import GlobalStore from "../stores/GlobalStore";
import { useSession } from "next-auth/react";
import { RenderLoadingImage } from "./ui/Loading";
import { signIn } from "next-auth/react";
import { Button } from "@chakra-ui/react";
import { observer } from "mobx-react";
import React, { ReactElement } from "react";

export default observer(function Layout({
  children,
  breadCrumb,
}: {
  children?: ReactElement;
  breadCrumb?: any;
}) {
  const { data: session, status } = useSession();

  const { isMenuCollapsed } = GlobalStore;
  // console.log(isUserPermittedForCurrentModule);
  return (
    <>
      <div className="flex w-full min-h-[100vh] flex-col">
        {status === "loading" && (
          <div className="flex w-full flex-col items-center justify-center">
            <RenderLoadingImage />
          </div>
        )}

        {status === "unauthenticated" && (
          <div className="flex w-full flex-col items-center justify-center border-[10px] border-red-500 min-h-[100vh]">
            <h2 className="text-2xl text-red-500 uppercase mb-6">
              You aren't logged in !!
            </h2>

            <Button
              colorScheme="red"
              onClick={(e) => {
                signIn();
              }}
            >
              Login
            </Button>
          </div>
        )}

        {status === "authenticated" && (
          <>
            <div className="sidebar">
              <SidBar collapsed={isMenuCollapsed} />
            </div>
            <header className="header">
              <Header breadCrumb={breadCrumb} />
            </header>

            <main
              className={`main-div sidebar ${
                isMenuCollapsed ? "sidebar-collapsed" : "sidebar-full"
              }`}
            >
              {children}
            </main>
          </>
        )}
      </div>
    </>
  );
});
