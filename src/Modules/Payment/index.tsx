import PrimaryButton from "Shared/components/buttons/primary-button";
import { TableComponent } from "Shared/components/tables";
import { wrapClick } from "Shared/utils/ui";
import { FC } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useUrlState from "Shared/hooks/use-url-state";
import ActionButton from "Shared/components/buttons/action-button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import moment from "moment";
import AppConfig from "config";
import YesNoDialog from "Shared/components/overlays/yes-no-dialog";
// import CalendarPicker from "Shared/components/input/calendar-picker";
import useDownloadFile, {
  fileExtensionMappings,
} from "Shared/utils/use-download-file";
import toast from "react-hot-toast";
import { showToast } from "Shared/utils/alert";
import Avatar from "Shared/components/media/avatar";
import { getPayments, getPaymentsExportUrl } from "./duck/fetch";
import useTableData from "Shared/utils/use-table-data";
import MakeDepositContainer from "./deposit";
import StatusChip, { StatusType } from "Shared/components/chips/status-chip";
import PaystackPop, { PopupTransaction } from "@paystack/inline-js";
import numeral from "numeral";
import { useCookies } from "react-cookie";
import { isValidJSON } from "Shared/utils/data-structures";
import SecondaryButton from "Shared/components/buttons/secondary-button";
import InitiateWithdrawalContainer from "./withdrawal";
import PaymentEmptyIcon from "Shared/components/icons/payment-empty-icon";
import Header from "Shared/components/layout/header";

// import AddPaymentContainer from "./add";
const PaymentsPage: FC = () => {
  const navigate = useNavigate();
  const [page] = useUrlState<number>("page", 1);
  const [pageSize] = useUrlState<number>("pageSize", 10);

  const [cookies, setCookies, removeCookies] = useCookies(["user", "token"], {
    doNotParse: true,
  });  
  const currentUser = cookies.user ? JSON.parse(cookies.user) : null;

  const [search, setSearch] = useUrlState<string>("search", "");
  const [fromDate] = useUrlState<any>("fromDate");
  const [toDate] = useUrlState<any>("toDate");
  const [exportType, setExportType] = useUrlState<string>("exportType");
  const [current, setCurrent] = useUrlState("current");
  const [searchParams, setSearchParams] = useSearchParams();
  const [modal, setModal] = useUrlState("modal");

  const dispatchAction = (id: string, action: "delete" | "add") => {
    if (action) searchParams.set("modal", action);
    if (id) searchParams.set("current", id);

    setSearchParams(searchParams);
  };

  const {
    data: queryData,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ["payments", page, pageSize, search, fromDate, toDate],
    queryFn: () =>
      getPayments({
        page,
        pageSize,
        search,
        fromDate,
        toDate,
        searchFields: ["ref", "code"],
      }),
    throwOnError: (error: AxiosError | any) => {
      formatAndShowAxiosError(error);
      return false;
    },
  });

  const { downloadAction, downloadLoading } = useDownloadFile({
    onError: () => {
      toast(
        JSON.stringify({
          type: "error",
          title: "An error occurred downloading file",
        })
      );
    },
    getFileName: () =>
      new Date().toISOString() +
      `_Payments.${fileExtensionMappings?.[exportType]}`,
  });

  const {
    data: exportData,
    isPending: exportLoading,
    mutate: createDataExport,
  } = useMutation({
    mutationKey: ["payments-export", fromDate, toDate, exportType],
    mutationFn: (exportType: string) =>
      getPaymentsExportUrl({
        fromDate,
        toDate,
        exportType: exportType,
      }),
    onSuccess: (response) => {
      setExportType(undefined);
      if (response?.data) {
        showToast({
          type: "success",
          title: "File exported successfully",
        });
        downloadAction(`${response?.data}`);
      } else {
        toast(
          JSON.stringify({ type: "error", title: "Could not export file" })
        );
      }
    },
    onError: (error) => formatAndShowAxiosError(error),
  });

  const data = useTableData({
    rows: queryData?.data?.rows || [],
    count: queryData?.data?.total || 0,
  });

  function getStatusType(data): StatusType {
    //Expiry if 30 days has past
    if (data?.status == "Completed") return "success";
    if (data?.status == "Failed") return "danger";
    if (moment(data?.createdAt).isBefore(moment().subtract(1, "days")))
      return "danger";
    if (data?.status === "Pending") return "warning";
  }

  function getStatusText(data) {
    if (data?.status == "Completed") return "Completed";
    if (data?.status == "Failed") return "Failed";
    if (moment(data?.createdAt).isBefore(moment().subtract(1, "days")))
      return "Expired";
    if (data?.status === "Pending") return "Pending";
  }

  return (
    <div className='flex flex-col '>
      {/* <h3 className={" text-lg my-2 text-gray-600 flex items-center"}>
        <div className={"h-2 w-2 bg-yellow-500  rounded-full mr-1"} /> Filter
      </h3> */}
       {/* <div className='p-2.5'>
        <Header
          title={`Payments`}
          breadCrumps={[
            {
              title: "Home",
              to: "/",
            },
            {
              title: "Payments",
              to: "/dashboard/payments",
            },
          ]}
        />
        </div> */}
      <h3
        className={
          "text-lg flex justify-end items-center text-gray-600  mb-4 gap-x-2.5"
        }
      >
        {currentUser?.accountType == "DeveloperUser" && (
          <PrimaryButton
            text={"Deposit funds"}
            icon={"ic:outline-add-card"}
            onClick={wrapClick(() => dispatchAction(undefined, "add"))}
          />
        )}
        <SecondaryButton
          text={"Withdraw funds"}
          icon={"ic:outline-arrow-circle-down"}
          onClick={wrapClick(() => dispatchAction(undefined, "delete"))}
        />
      </h3>
      <div className='min-h-[70vh]  flex flex-col bg-red-950'>
        <TableComponent
          refetch={refetch}
          onExportClicked={(value) => {
            setExportType(value);
            createDataExport(value);
          }}
          hasSearch={false}
          emptyTitle='No payments made'
          emptyIcon={<PaymentEmptyIcon />}
          title={` Balance: GHS ${numeral(
            currentUser?.balance || 0
          ).format("0,0.00")} ( Escrow: GHS ${numeral(
            currentUser?.escrowBalance || 0
          ).format("0,0.00")} 
        )`}
          isRefetching={isRefetching}
          loading={isLoading}
          data={data}
          hideExportButtons={true}
          exportDownloading={
            exportLoading ? (exportType as "excel" | "csv" | "pdf") : undefined
          }
          columns={[
            "#",
            "Code",
            "Amount (GHS)",
            "Reference",
            "Reason",
            "Method",
            "Payment Account",
            "Date",
            "Status",
            "",
          ]}
          loaders={[
            "single",
            "single",
            "single",
            "single",
            "single",
            "single",
            "single",
            "single",
            "action",
          ]}
          fields={[
            (item, idx) => <td className='px-4 text-center'>{idx + 1}</td>,
            "code",
            "amount",
            "reference",
            "reason",
            (item, idx) => (
              <td className='px-4 text-center '>
                {item?.paymentMethod || "N/A"}
              </td>
            ),
            (item, idx) => (
              <td className='px-4 text-center '>
                {item?.paymentAccount
                  ? item?.paymentMethod == "Card"
                    ? `Card Ending ${item?.paymentAccount}`
                    : item?.paymentAccount
                  : "N/A"}
              </td>
            ),
            (item, idx) => (
              <td className='px-4 text-center '>
                {moment(item?.createdAt).format("DD/MM/YYYY hh:mm A")}
              </td>
            ),
            (item, idx) => (
              <td className='px-4 text-center '>
                <StatusChip
                  type={getStatusType(item)}
                  info={getStatusText(item)}
                />
              </td>
            ),
            (item, idx) => (
              <div className='flex gap-x-2 items-center py-4 px-4 justify-center'>
                {!moment(data?.createdAt).isBefore(
                  moment().subtract(1, "days")
                ) &&
                  item?.status == "Pending" &&
                  item?.reason == "Deposit" && (
                    <ActionButton
                      tooltip='Complete payment'
                      action='completePay'
                      onClick={() => {
                        window.open(
                          "https://checkout.paystack.com/" + item?.accessCode
                        );
                      }}
                      className='!bg-primary-500'
                      iconClassName='!text-white'
                    />
                  )}
                {item?.status == "Completed" && (
                  <ActionButton
                    action='viewInvoice'
                    className='!bg-slate-500'
                    iconClassName='!text-white'
                    tooltip='view invoice'
                    onClick={() => navigate(`/dashboard/invoice/${item?._id}`)}
                  />
                )}
              </div>
            ),
          ]}
        />
      </div>
      <MakeDepositContainer
        open={modal === "add"}
        setOpen={(val: boolean) => setModal(val ? "add" : undefined)}
        refetch={refetch}
      />
      <InitiateWithdrawalContainer
        open={modal === "delete"}
        setOpen={(val: boolean) => setModal(val ? "delete" : undefined)}
        refetch={refetch}
      />
    </div>
  );
};

export default PaymentsPage;
