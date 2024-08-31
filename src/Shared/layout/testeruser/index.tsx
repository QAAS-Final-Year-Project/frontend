import { FC, Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import TesterUserNavbar from "./nav";
import { useQuery } from "@tanstack/react-query";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import { checkTesterUserAuth } from "./duck/fetch";
import { AxiosError } from "axios";
import { clearAuth, setMe } from "Shared/utils/auth";
import FullScreenLoader from "Shared/components/suspense/page-loader";
import TesterUserSidebar from "./sidebar";
import { useCookies } from "react-cookie";

const TesterUserLayout: FC = () => {
  const [cookies, setCookies, removeCookies] = useCookies(["user", "token"], {
    doNotParse: true,
  });  
  const parsedUser = cookies.user ? JSON.parse(cookies.user) : null;
  const { data, isLoading, isError, isFetched } = useQuery({
    queryKey: ["checkTesterUser"],
    queryFn: () => checkTesterUserAuth(),
    throwOnError: (error: AxiosError | any) => {
      formatAndShowAxiosError(error);
      return false;
    },
  });

  useEffect(() => {
    if (isFetched) {
      if (data?.data && !isError) {
        setMe({ ...data?.data, accountType: "TesterUser" });
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
          <TesterUserSidebar />
        </aside>
        <main className='flex flex-1 flex-col  bg-gray-100 '>
          <nav className='shadow-md z-10 sticky top-0'>
            <TesterUserNavbar />
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

export default TesterUserLayout;
