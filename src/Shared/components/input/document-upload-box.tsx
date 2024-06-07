import React, { useCallback, useEffect, useState } from "react";
import { useDropzone, Accept, FileRejection } from "react-dropzone";
import config from "config";
import _ from "lodash";
import {
  ArrowUpTrayIcon,
  DocumentPlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "Shared/utils/ui";
import LoadingSpinner from "../suspense/loading-spinner";
import { Icon } from "@iconify/react";
import { uploadFileToFirebase } from "Shared/utils/files";

interface UploadBoxProps {
  id: string;
  maxFiles?: number;
  maxSize?: number;
  minSize?: number;
  accept?: Accept;
  disabled?: boolean;
  label?: string;
  values: any;
  setFieldValue: any;
  setFieldError: any;
  setFieldTouched: any;
  handleBlur: any;
  errors?: any;
  touched?: any;
  className?: string;
  required?: boolean;
}

interface Upload extends File {
  path: any;
  preview: string;
}

const DocumentUploadBox: React.FC<UploadBoxProps> = ({
  maxFiles = 1,
  maxSize = 1024 * 1024 * 5,
  minSize = 1,
  accept = {
    "image/*": [".png", ".jpeg", ".jpg"],
    "application/pdf": [".pdf"],
    "application/msword": [".doc", ".docx"],
  },
  errors,
  values,
  setFieldValue,
  setFieldError,
  setFieldTouched,
  touched,
  id,
  label,
  // className = "aspect-w-3 aspect-h-2 w-full",
  required,
}) => {
  const [files, setFiles] = useState<Upload[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const extensionIcon = (ext: string): string => {
    switch (ext) {
      case "pdf":
        return "vscode-icons:file-type-pdf2";
      case "doc":
      case "docx":
        return "vscode-icons:file-type-word";
      case "png":
      case "jpeg":
      case "jpg":
        return "vscode-icons:file-type-image";
      default:
        return "vscode-icons:default-file";
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setFieldTouched(false);
      if (!acceptedFiles.length) {
        setFieldError(
          id,
          _.chain(rejectedFiles)
            .map("errors")
            .flatten()
            .map("code")
            .map(_.startCase)
            .join(", ")
            .value()
        );
        return;
      }

      setFiles((prev) =>
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            // preview: new Blob([file], {type: file?.type})
          })
        )
      );
      setLoading(true);
      setShowLoader(true);
      // upload image to server and return url
      const data = new FormData();
      const file = acceptedFiles[0];
      data.append("file", file);
     await uploadFileToFirebase("verificationDocuments/", file)
        .then((fileUrl) => {
          if (data) setFieldValue?.(id, fileUrl as string);
        })
        .catch((err) => {})
        .finally(() => {
          setLoading(false);
          setTimeout(() => {
            setShowLoader(false);
          }, 3000);
        });
    },
    [
      // files,
      id,
    ]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    accept,
    maxSize,
    minSize,
    noClick: false,
    disabled: loading,
  });

  useEffect(
    () => () => {
      // Make sure to revoke the Object URL to avoid memory leaks
      // files.forEach((file) => URL.revokeObjectURL(file?.preview));
    },
    [files]
  );

  return (
    <>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
        {label} {required ? <span className='text-red-500'>*</span> : ""}
      </label>
      <div
        {...getRootProps()}
        id={id}
        className={classNames(
          "shadow-sm block w-full sm:text-sm rounded-md placeholder:font-light placeholder:text-xs h-[38px] border  mt-1 font-light"
        )}
      >
        {files.length ? (
          <div className='h-full flex gap-x-3 items-center justify-between px-4'>
            <div className='flex gap-x-3 items-center'>
              {showLoader ? (
                <LoadingSpinner />
              ) : (
                <Icon
                  icon={extensionIcon(
                    files?.[0]?.name?.split(".")?.pop()?.toLowerCase()
                  )}
                  className='w-5 h-5'
                />
              )}
              <span className='text-ellipsis text-primary-500'>
                {files?.[0]?.name}
              </span>
            </div>
            <TrashIcon className='w-5 h-5 text-gray-500' />
          </div>
        ) : (
          <div className='h-full flex gap-x-3 items-center px-4'>
            {/* <DocumentPlusIcon className='w-5 h-5' /> */}
            <DocumentPlusIcon className='w-5 h-5 [&>svg]:stroke-1.5' />
            <span className=''>Drag and drop a file here or click</span>
          </div>
        )}
      </div>
      {_.get(errors, id) && _.get(touched, id) ? (
        <p className='mt-2 text-sm text-red-600' id={`${id}-error`}>
          {_.get(errors, id)}
        </p>
      ) : null}
    </>
  );
};

export default DocumentUploadBox;
