import { FC } from "react";
import moment from "moment"; // Ensure moment.js is installed and imported
import Avatar from "Shared/components/media/avatar";
import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import AttachmentCard from "Modules/Tester/Settings/components/attachment-card";
import OutlinedButton from "Shared/components/buttons/outline-button";
import NoteCard from "./notes-card";
import { useSearchParams } from "react-router-dom";
import useUrlState from "Shared/hooks/use-url-state";
import AddNoteContainer from "../add-note";
import PrimaryButton from "Shared/components/buttons/primary-button";
import DeleteNoteContainer from "../delete-note";
import { isValidJSON } from "Shared/utils/data-structures";
import useCookies from "Shared/hooks/cookies";

interface TaskOverViewProps {
  data: any;
  refetch: () => void;
  hasExpired: boolean;
}

const TaskAttachments: FC<TaskOverViewProps> = ({
  data,
  refetch,
  hasExpired,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modal, setModal] = useUrlState("modal");
  const [current, setCurrent] = useUrlState("current");
  const [user, setUser] = useCookies("user");

  const currentUser = isValidJSON(user) ? JSON.parse(user) : undefined;

  const dispatchAction = (
    id: string,
    action: "delete" | "accept" | "message" | "add"
  ) => {
    searchParams.set("modal", action);
    searchParams.set("current", id);
    setSearchParams(searchParams);
  };
  return (
    <>
      <div className='grid grid-cols-2 '>
        <CardSectionWrapper
          className='col-span-1'
          title='Files'
          icon={"ic:baseline-attach-file"}
        >
          <div className='py-6 px-6'>
            <div className='grid grid-cols-2 '>
              {data?.supportingDocuments?.length > 0 ? (
                data?.supportingDocuments?.map((attachment) => (
                  <AttachmentCard
                    fileUrl={attachment?.url}
                    title={attachment?.name}
                  />
                ))
              ) : (
                <div className='text-center mt-4'>No notes available</div>
              )}
            </div>
            {/* <div className='col-span-2 flex gap-x-5 items-center'>
              <OutlinedButton
                text='Upload files'
                size='md'
                // loading={mutation.isPending}
                type='button'
              />
              <div className='text-zinc-500 text-sm font-normal leading-snug'>
                Maximum file size: 10 MB
              </div>{" "}
            </div> */}
          </div>
        </CardSectionWrapper>
        <CardSectionWrapper
          className='col-span-1'
          title='Notes'
          icon={"ic:outline-edit-note"}
        >
          <div className='py-6 px-6 w-full'>
            <div>
              {data?.notes?.length > 0 ? (
                data?.notes?.map((noteData, index) => (
                  <NoteCard
                    date={noteData?.createdAt}
                    key={index}
                    note={noteData?.note}
                    onDelete={
                      noteData?.createdBy == currentUser?._id
                        ? () => dispatchAction(noteData?._id, "delete")
                        : undefined
                    }                    priority={noteData?.priority}
                  />
                ))
              ) : (
                <div className='text-center mt-4'>No notes available</div>
              )}
            </div>
            {hasExpired && (
              <div className='w-full'>
                <PrimaryButton
                  text='Add Note'
                  size='md'
                  className='w-full'
                  onClick={() => dispatchAction("adding", "add")}
                />
              </div>
            )}
          </div>
        </CardSectionWrapper>
      </div>
      {current && (
        <>
          <AddNoteContainer
            open={modal === "add"}
            setOpen={(val: boolean) => setModal(val ? "add" : undefined)}
            refetch={refetch}
          />
          <DeleteNoteContainer
            open={modal === "delete"}
            setOpen={(val: boolean) => setModal(val ? "delete" : undefined)}
            refetch={refetch}
          />
        </>
      )}
    </>
  );
};

export default TaskAttachments;
