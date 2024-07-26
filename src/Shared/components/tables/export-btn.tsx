import { FC } from "react";
import ExcelIcon from "../icons/ExcelIcon";
import CSVIcon from "../icons/CSVIcon";
import PDFIcon from "../icons/PDFIcon";
import LoadingIcon from "../icons/loading-icon";
import { classNames, wrapClick } from "Shared/utils/ui";

interface ExportButtonProps {
  type: "excel" | "csv" | "pdf";
  exportDownloading?: "excel" | "csv" | "pdf";
  onExportClicked: (type: "excel" | "csv" | "pdf") => void;
}

const renderIcon = (type: "excel" | "csv" | "pdf") => {
  switch (type) {
    case "excel":
      return <ExcelIcon className={"fill-green-800"} />;
    case "csv":
      return <CSVIcon className={"w-4 mx-2 h-4 fill-blue-600"} />;
    case "pdf":
      return <PDFIcon className={"w-4 mx-2 h-4 fill-red-600"} />;
      return;
  }
};

export const ExportButton: FC<ExportButtonProps> = ({
  type,
  exportDownloading,
  onExportClicked,
}) => {
  return (
    <button
      onClick={wrapClick(() => onExportClicked?.(type))}
      disabled={exportDownloading === type}
      className={classNames(
        "flex items-center justify-center rounded font-proximaBold text-xs border p-3 gap-2 hover:bg-gray-100",
        "h-8 border border-gray-300 dark:border-gray-500 dark:bg-[#242A38] text-gray-600"
      )}
    >
      {type}
      {renderIcon(type)}
      <LoadingIcon
        className={`animate-spin h-5 w-5 mx-2
                                            fill-gray-600 ${
                                              exportDownloading === type
                                                ? "block"
                                                : "hidden"
                                            }`}
      />
    </button>
  );
};
