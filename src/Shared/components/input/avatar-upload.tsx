import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import config from "config";
import _ from "lodash";
import { wrapClick, wrapImage } from "Shared/utils/ui";
import { uploadFileToFirebase } from "Shared/utils/files";

//TODO: Implement file upload

interface AvatarUploadProps {
  id: string;
  maxSize?: number;
  minSize?: number;
  disabled?: boolean;
  label?: string;
  values: any;
  setFieldValue: any;
  setFieldTouched?: any;
  setFieldError?: any;
  errors?: any;
  touched?: any;
  required?: boolean;
}

interface Upload extends File {
  preview: string;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  maxSize = 1024 * 1024,
  minSize = 1,
  errors,
  values,
  setFieldValue,
  touched,
  id,
  label,
  setFieldTouched,
  setFieldError,
  required = false,
}) => {
  const [files, setFiles] = useState<Upload[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      // upload image to server and return url
      if (acceptedFiles.length) {
        setLoading(true);
        const file = acceptedFiles[0];
        await uploadFileToFirebase("profileImages/", file)
          .then((fileUrl) => {
            if (fileUrl) {
              setFieldValue?.(id, fileUrl as string);
              setFieldTouched?.(id, false, true);
            }
          })
          .catch((err) => {
            setFieldError?.(id, err.message);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [id, setFieldValue]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
    maxSize,
    minSize,
    noClick: true,
    noKeyboard: true,
    disabled: loading,
  });

  useEffect(
    () => () => {
      // Make sure to revoke the Object URL to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file?.preview));
    },
    [files]
  );

  return (
    <>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
        {label} {required ? <span className='text-red-500'>*</span> : ""}
      </label>
      <div {...getRootProps({ className: "mt-1 flex items-center" })}>
        <input
          {...getInputProps()}
          required={required}
          id='file'
          name='file'
          type='file'
          className='sr-only'
        />
        {!(files?.[0]?.preview || _.get(values, id)) ? (
          <span className='inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100'>
            <svg
              className='h-full w-full text-gray-300'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
            </svg>
          </span>
        ) : (
          wrapImage(
            <img
              className='inline-block  object-cover object-center h-12 w-12 overflow-hidden rounded-full bg-gray-100'
              src={files?.[0]?.preview || _.get(values, id)}
              alt='avatar'
            />
          )
        )}
        <button
          type='button'
          onClick={wrapClick(open)}
          disabled={loading}
          className='ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
        >
          {loading ? "Uploading..." : "Change"}
        </button>
      </div>
      {_.get(errors, id) && _.get(touched, id) ? (
        <p className='mt-2 text-sm text-red-600' id={`${id}-error`}>
          {_.get(errors, id)}
        </p>
      ) : null}
    </>
  );
};

export default AvatarUpload;
