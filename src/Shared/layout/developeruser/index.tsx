import { FC, Suspense, useEffect } from "react";
import DeveloperUserSidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import DeveloperUserNavBar from "./nav";
import { useQuery } from "@tanstack/react-query";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import { AxiosError } from "axios";
import { clearAuth, setMe } from "Shared/utils/auth";
import FullScreenLoader from "Shared/components/suspense/page-loader";
import { checkDeveloperUserAuth } from "./duck/fetch";

const DeveloperUserLayout: FC = () => {
  return (
    <>
     <div></div>
    </>
  );
};

export default DeveloperUserLayout;
