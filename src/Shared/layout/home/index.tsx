import { FC, Suspense, useEffect } from "react";
import DeveloperUserSidebar from "../developeruser/sidebar";
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import { AxiosError } from "axios";
import { clearAuth, setMe } from "Shared/utils/auth";
import FullScreenLoader from "Shared/components/suspense/page-loader";
import HomeNavBar from "./nav";
import HomeFooter from "./footer";

const HomeLayout: FC = () => {
  return (
    <>
      <HomeNavBar />
      <main>
        <Outlet />
      </main>
      <HomeFooter />
    </>
  );
};

export default HomeLayout;
