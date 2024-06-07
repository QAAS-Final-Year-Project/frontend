import React, { useCallback, useEffect, useState } from "react";
import { useDropzone, Accept, FileRejection } from "react-dropzone";
import config from "config";
import _ from "lodash";
import { classNames } from "Shared/utils/ui";
import { uploadFileToFirebase } from "Shared/utils/files";

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
  className?: string;
  required?: boolean;
}

interface Upload extends File {
  path: any;
  preview: string;
}

const UploadArea: React.FC<UploadAreaProps> = ({
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

      setFiles(
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
      if (multiple) {
        const imageUrls: string[] = [];
        for (let i = 0; i < acceptedFiles.length; i++) {
          const data = new FormData();
          const file = acceptedFiles[i];
          data.append("file", file);
          await uploadFileToFirebase("identityImages/", file)
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
        if (imageUrls.length) setFieldValue?.(id, imageUrls);
      } else {
        const data = new FormData();
        const file = acceptedFiles[0];
        data.append("file", file);
       await uploadFileToFirebase("identityImages/", file)
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

  return (
    <>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
        {label} {required ? <span className='text-red-500'>*</span> : ""}
      </label>
      <div
        {...getRootProps()}
        id={id}
        className={classNames(
          className,
          "relative group flex-1 flex border-2 mt-1 border-gray-300 border-dashed rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 asp"
        )}
      >
        <input
          {...getInputProps()}
          id={id}
          name={id}
          type='file'
          className='sr-only'
        />
        {!files.length &&
        (multiple ? !_.get(values, id)?.length : !_.get(values, id)) ? (
          !isDragActive ? (
            <div className='space-y-1 flex flex-1 flex-col items-center justify-center text-center px-6 pt-5 pb-6'>
              <svg
                className='mx-auto h-12 w-12 text-gray-400'
                stroke='currentColor'
                fill='none'
                viewBox='0 0 48 48'
                aria-hidden='true'
              >
                <path
                  d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <div className='flex text-sm justify-center text-gray-600'>
                <span className='text-center cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500'>
                  Upload a file
                </span>
              </div>
              <p className='text-xs text-gray-500'>or drag and drop</p>
            </div>
          ) : (
            <div className='space-y-1 flex flex-1 flex-col items-center justify-center text-center px-6 pt-5 pb-6'>
              <svg
                className='mx-auto h-12 w-12 text-gray-400'
                stroke='currentColor'
                fill='none'
                viewBox='0 0 48 48'
                aria-hidden='true'
              >
                <path
                  d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <p className='text-xs text-gray-500'>Drop File Here</p>
            </div>
          )
        ) : (
          <>
            {multiple ? (
              <div className='flex-1 grid-cols-3 grid gap-3 gap-y-0 p-2'>
                {(files.length ? files : _.get(values, id)).map((file: any) => (
                  <div>
                    <img
                      className='mt-0 object-cover object-top w-full h-1/2 border-2'
                      src={file?.preview || file}
                      alt='Hello'
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className='w-full'>
                {files?.[0]?.path?.split(".").pop() === "pdf" ? (
                  <embed
                    type='application/pdf'
                    className='object-cover object-top h-full w-full z-0'
                    src={
                      files?.[0]?.preview ||
                      (multiple ? _.get(values, id)?.[0] : _.get(values, id))
                    }
                  />
                ) : (
                  <img
                    className='object-cover object-top h-full w-full z-0'
                    src={
                      files?.[0]?.preview ||
                      (multiple ? _.get(values, id)?.[0] : _.get(values, id))
                    }
                    alt='Hello'
                  />
                )}
              </div>
            )}
            {!isDragActive ? (
              <div className='absolute inset-0 opacity-0 flex flex-1 flex-col items-center justify-center group-hover:opacity-75 space-y-1 z-10 text-center bg-gray-50 px-6 pt-5 pb-6 m-0'>
                <svg
                  className='mx-auto h-12 w-12 text-gray-400'
                  stroke='currentColor'
                  fill='none'
                  viewBox='0 0 48 48'
                  aria-hidden='true'
                >
                  <path
                    d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <div className='flex text-sm justify-center text-gray-600'>
                  <span className='text-center cursor-pointer  rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500'>
                    Upload a file
                  </span>
                </div>
                <p className='text-xs text-gray-700'>or drag and drop</p>
              </div>
            ) : (
              <div className='absolute inset-0 opacity-0 group-hover:opacity-75 space-y-1 z-10 text-center bg-gray-50 px-6 pt-5 pb-6'>
                <svg
                  className='mx-auto h-12 w-12 text-gray-400'
                  stroke='currentColor'
                  fill='none'
                  viewBox='0 0 48 48'
                  aria-hidden='true'
                >
                  <path
                    d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <p className='text-xs text-gray-500'>Drop File Here</p>
              </div>
            )}
          </>
        )}
        {showLoader && (
          <div className='p-3 absolute inset-x-0 top-0 z-50'>
            <div
              className={classNames(
                loading ? "bg-amber-100" : "bg-green-100",
                "rounded-full"
              )}
            >
              <div
                className={classNames(
                  loading ? "bg-amber-400" : "bg-green-400",
                  "rounded-full h-full text-white p-0.5 text-xs text-center"
                )}
              >
                {loading ? <span>Uploading</span> : <span>Uploaded</span>}
              </div>
            </div>
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

export default UploadArea;
