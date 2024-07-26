import { useState } from "react";


export const fileExtensionMappings ={
    "csx":".csv",
    "xlsx":".xlsx",
    "pdf":".pdf",
}
interface DownloadFileProps {
  readonly onStart?: () => void;
  readonly onEnd?: () => void;
  readonly onError: () => void;
  readonly getFileName: () => string;
}



interface DownloadedFileInfo {
  readonly downloadAction: (path: string) => Promise<void>;
  readonly downloadLoading: boolean;
}

const useDownloadFile = ({
  onStart,
  onEnd,
  onError,
  getFileName,
}: DownloadFileProps): DownloadedFileInfo => {
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);

  const downloadAction = async (path: string) => {
    try {
      onStart?.();
      setDownloadLoading(true);
      const link = document.createElement("a");
      link.href = path;
      link.setAttribute("download", getFileName());
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      onEnd?.();
      setDownloadLoading(false);
    } catch (error) {
      setDownloadLoading(false);
      onError();
    }
  };

  return { downloadAction, downloadLoading };
};

export default useDownloadFile;