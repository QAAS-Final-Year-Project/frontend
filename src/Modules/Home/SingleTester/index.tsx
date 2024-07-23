import { FC } from "react";
import TesterDetailsHeader from "./components/tester-details-header";
import Container from "Shared/components/layout/container";
import TesterDetailsMain from "./components/tester-details-main";
import TaskDetailsSide from "./components/task-details-side";
import { getSingleHomeTask, getSingleTester } from "../duck/fetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useUrlState from "Shared/hooks/use-url-state";
import { AxiosError } from "axios";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import Loader from "Shared/components/suspense/loader";
import { isValidJSON } from "Shared/utils/data-structures";
import useCookies from "Shared/hooks/cookies";
import CancelBidContainer from "./cancel-bid";

const SingleTesterPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modal, setModal] = useUrlState("modal");
  const [current, setCurrent] = useUrlState("current");

  const [user, setUser] = useCookies("user");

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const currentUser = isValidJSON(user) ? JSON.parse(user) : undefined;

  const query = useQuery({
    queryKey: ["home-single-tester", id],
    queryFn: () =>
      getSingleTester(
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
            <TesterDetailsHeader data={query?.data?.data} />
            <Container className=' pt-[65px] pb-[75px]'>
              <div className='grid grid-cols-3 gap-x-[45px]'>
                <div className='col-span-2'>
                  <TesterDetailsMain data={query?.data?.data} />
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
export default SingleTesterPage;
