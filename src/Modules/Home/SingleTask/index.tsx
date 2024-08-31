import { FC } from "react";
import TaskDetailsHeader from "./components/task-details-header";
import Container from "Shared/components/layout/container";
import TaskDetailsMain from "./components/task-details-main";
import TaskDetailsSide from "./components/task-details-side";
import { getSingleHomeTask } from "../duck/fetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useUrlState from "Shared/hooks/use-url-state";
import { AxiosError } from "axios";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import Loader from "Shared/components/suspense/loader";
import { isValidJSON } from "Shared/utils/data-structures";
import { useCookies } from "react-cookie";
import CancelBidContainer from "./cancel-bid";

const SingleTaskPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modal, setModal] = useUrlState("modal");
  const [current, setCurrent] = useUrlState("current");

  const [cookies, setCookies, removeCookies] = useCookies(["user", "token"], {
    doNotParse: true,
  });
  const currentUser = cookies.user ? JSON.parse(cookies.user) : null;

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const query = useQuery({
    queryKey: ["home-single-task", id],
    queryFn: () =>
      getSingleHomeTask(
        id,
        currentUser && {
          user: currentUser?._id,
          from: "TesterHome",
        }
      ),
    throwOnError: (error: AxiosError | any) => {
      formatAndShowAxiosError(error);
      return false;
    },
  });

  const dispatchAction = (
    id: string,
    action: "delete" | "accept" | "message"
  ) => {
    searchParams.set("modal", action);
    searchParams.set("current", id);
    setSearchParams(searchParams);
  };

  return (
    <>
      <section className=''>
        {query.isLoading ? (
          <div className='min-h-[600px] flex items-center justify-center'>
            <Loader />
          </div>
        ) : (
          <>
            <TaskDetailsHeader data={query?.data?.data} />
            <Container className=' pb-[75px]'>
              <div className='grid grid-cols-3 gap-x-[45px]'>
                <div className='col-span-2'>
                  <TaskDetailsMain data={query?.data?.data} />
                </div>
                <TaskDetailsSide
                  isRefetching={query.isRefetching}
                  refetch={query.refetch}
                  data={query?.data?.data}
                />
              </div>
            </Container>
          </>
        )}
      </section>
      {current && (
        <CancelBidContainer
          open={modal === "delete"}
          setOpen={(val: boolean) => setModal(val ? "delete" : undefined)}
          refetch={query.refetch}
        />
      )}
    </>
  );
};
export default SingleTaskPage;
