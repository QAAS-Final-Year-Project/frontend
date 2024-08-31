//TODO: add firebase messaging
import { FC, PropsWithChildren, useEffect } from "react";
import { isSupported, MessagePayload } from "firebase/messaging";
import toast from "react-hot-toast";
import Toaster from "./toaster";
import { getPushToken, onMessageListener } from "./utils";
import useMyCookies from "../../hooks/cookies";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkTesterUserAuth } from "../testeruser/duck/fetch";
import { AxiosError } from "axios";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import { useCookies } from "react-cookie";
import { checkDeveloperUserAuth } from "../developeruser/duck/fetch";
import { setMe } from "Shared/utils/auth";

const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [pushToken, setPushToken] = useMyCookies("push-token");
  const [cookies, setCookies, removeCookies] = useCookies(["user", "token"], {
    doNotParse: true,
  });
  const updatePaymentMutation = useMutation({
    mutationKey: ["update-payment"],
    mutationFn: () =>
      cookies.user
        ? JSON.parse(cookies.user)?.accountType == "TesterUser"
          ? checkTesterUserAuth()
          : checkDeveloperUserAuth()
        : null,
    onSuccess: (response) => {
      if (response.data) {
        console.log("here")
        setMe({ ...response.data,accountType:JSON.parse(cookies.user)?.accountType });
      }
    },
  });
  const queryClient = useQueryClient();
  useEffect(() => {
    isSupported().then((hasSupport) => {
      if (hasSupport) {
        getPushToken().then((token: string) => {
          // Track the token -> client mapping, by sending to backend server
          // show on the UI that permission is secured
          console.log("token is token", token);
          setPushToken(token);
        });
      }
    });
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        const payload = event.data;
        if (
          ["ASSESSMENT_UPDATE", "VERIFICATION_UPDATE"].includes(
            payload?.notification?.title
          )
        ) {
          window.location.reload();
        } else if (payload?.notification?.title == "TASK_UPDATE") {
          queryClient.invalidateQueries({ queryKey: ["tasks"] });
          queryClient.invalidateQueries({ queryKey: ["task"] });
          queryClient.invalidateQueries({ queryKey: ["bids"] });
          queryClient.invalidateQueries({ queryKey: ["bid"] });
          queryClient.invalidateQueries({ queryKey: ["my-tasks"] });
        } else if (payload?.notification?.title == "PAYMENT_UPDATE") {
          updatePaymentMutation.mutate();
        }
      });
    }
  }, []);

  onMessageListener()
    .then((payload: MessagePayload) => {
      if (
        ["ASSESSMENT_UPDATE", "VERIFICATION_UPDATE"].includes(
          payload?.notification?.title
        )
      ) {
        window.location.reload();
      } else if (payload?.notification?.title == "TASK_UPDATE") {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        queryClient.invalidateQueries({ queryKey: ["task"] });
        queryClient.invalidateQueries({ queryKey: ["bids"] });
        queryClient.invalidateQueries({ queryKey: ["bid"] });
        queryClient.invalidateQueries({ queryKey: ["my-tasks"] });
      } else if (payload?.notification?.title == "PAYMENT_UPDATE") {
        updatePaymentMutation.mutate();
      }

      // toast(
      //   JSON.stringify({
      //     type: "notification",
      //     title: payload.notification?.title,
      //     description: payload.notification?.body,
      //   })
      // );
    })
    .catch((err) => {});

  useEffect(() => {
    document.getElementById("root").click();
  }, []);

  return (
    <div>
      {children}

      <Toaster />
    </div>
  );
};

export default NotificationProvider;
