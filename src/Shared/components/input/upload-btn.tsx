import React, { useCallback, useEffect, useState } from "react";
import { useDropzone, Accept, FileRejection } from "react-dropzone";
import config from "config";
import _ from "lodash";
import { classNames, wrapClick } from "Shared/utils/ui";
import { uploadFileToFirebase } from "Shared/utils/files";
import OutlinedButton from "../buttons/outline-button";
import { TrashIcon } from "@heroicons/react/20/solid";
import { Icon } from "@iconify/react";
import ActionButton from "../buttons/action-button";

interface UploadAreaProps {
  id: string;
  multiple?: boolean;
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
  fileStoragePath?: string;
  className?: string;
  required?: boolean;
  placeholder?: string;
}

interface Upload extends File {
  path: any;
  preview: string;
}

const UploadButton: React.FC<UploadAreaProps> = ({
  multiple = false,
  maxFiles = 1,
  maxSize = 1024 * 1024 * 5,
  minSize = 1,
  accept = {
    "image/*": [".png", ".jpeg", ".jpg"],
  },
  errors,
  values,
  setFieldValue,
  setFieldError,
  setFieldTouched,
  touched,
  id,
  label,
  fileStoragePath,
  placeholder,
  className = "aspect-w-3 aspect-h-2 w-full",
  required,
}) => {
  const [files, setFiles] = useState<Upload[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);

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
      
      setFiles([
        ...files,
        ...acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            // preview: new Blob([file], {type: file?.type})
          })
        ),
      ]);
      setLoading(true);
      setShowLoader(true);
      // upload image to server and return url
      if (multiple) {
        const imageUrls: string[] = [];
        for (let i = 0; i < acceptedFiles.length; i++) {
          const data = new FormData();
          const file = acceptedFiles[i];
          data.append("file", file);
          await uploadFileToFirebase(fileStoragePath || "files/", file)
            .then((fileUrl) => {
              imageUrls.push(fileUrl);
            })
            .catch((err) => {
              console.log(err, "--ERROR__");
            })
            .finally(() => {
              setLoading(false);
              setTimeout(() => {
                setShowLoader(false);
              }, 3000);
            });
        }
        if (imageUrls.length) {
          setFieldValue?.(id, [...values[id], ...imageUrls]);
        }
      } else {
        const data = new FormData();
        const file = acceptedFiles[0];
        data.append("file", file);
        await uploadFileToFirebase(fileStoragePath || "files/", file)
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
      }
    },
    [
      // files,
      multiple,
      id,
    ]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    multiple,
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
  return (
    <>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
        {label} {required ? <span className='text-red-500'>*</span> : ""}
      </label>
      <div
        {...getRootProps()}
        id={id}
        className={classNames("w-full flex items-center gap-x-2")}
      >
        <div>
          <OutlinedButton
            text='Upload files'
            size='md'
            loading={showLoader}
            type='button'
            className='w-max'
          />
        </div>

        {!files.length ? (
          <div className='text-zinc-500 text-sm font-normal leading-snug'>
            {placeholder}
          </div>
        ) : (
          _.map(files, (file, index) => (
            <div className='shadow-sm w-max  w-full sm:text-sm rounded-md placeholder:font-light placeholder:text-xs h-[38px] border  mt-1 font-light col-span-2 flex gap-x-2 items-center'>
              <div className='h-full flex gap-x-3 items-center justify-between px-4'>
                <div className='flex gap-x-3 items-center'>
                  <Icon
                    icon={extensionIcon(
                      file?.name?.split(".")?.pop()?.toLowerCase()
                    )}
                    className='w-5 h-5'
                  />
                  <span className='text-ellipsis text-primary-500'>
                    {file?.name}
                  </span>
                </div>
                <ActionButton
                  action='delete'
                  onClick={() => {
                    setFiles(files.filter((_, i) => i !== index));
                    setFieldValue(
                      id,
                      values[id].filter((_, i) => i !== index)
                    );
                  }}
                />
              </div>
            </div>
          ))
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

export default UploadButton;
