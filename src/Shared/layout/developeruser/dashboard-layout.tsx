import { FC, Suspense, useEffect } from "react";
import DeveloperUserSidebar from "../sidebar";
import { Outlet } from "react-router-dom";
import DeveloperUserNavBar from "./nav";
import { useQuery } from "@tanstack/react-query";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import { AxiosError } from "axios";
import { clearAuth, setMe } from "Shared/utils/auth";
import FullScreenLoader from "Shared/components/suspense/page-loader";
import { checkDeveloperUserAuth } from "./duck/fetch";

const DeveloperUserDashboardLayout: FC = () => {
  const { data, isLoading, isError, isFetched } = useQuery({
    queryKey: ["checkDeveloperUser"],
    queryFn: () => checkDeveloperUserAuth(),
    throwOnError: (error: AxiosError | any) => {
      formatAndShowAxiosError(error);
      return false;
    },
  });

  useEffect(() => {
    if (isFetched) {
      if (data?.data && !isError) {
        setMe({ ...data?.data, accountType: "DeveloperUser" });
      } else {
        clearAuth();
        window.location.replace("/login");
      }
    }
  }, [data?.data]);

  if (isLoading) {
    return (
      <Suspense>
        <FullScreenLoader />
      </Suspense>
    );
  }
  return (
    <>
      <div className='bg-gray-200  w-screen h-screen flex overflow-hidden'>
        <aside
          className=' md:flex   md:flex-col  shadow bg-white sticky top-0 left-0'
          style={{
            transition: "all 300ms ease-in-out",
            width: "288px",
          }}
        >
          <DeveloperUserSidebar />
        </aside>
        <main className='flex flex-1 flex-col  bg-gray-100 '>
          <nav className='shadow-md z-10 sticky top-0'>
            <DeveloperUserNavBar />
          </nav>
          <div className='p-8 overflow-y-auto'>
            <Outlet />
          </div>
        </main>
        <footer></footer>
      </div>
    </>
  );
};

export default DeveloperUserDashboardLayout;
