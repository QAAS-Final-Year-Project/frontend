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

interface TaskOverViewProps {
  data: any;
}

const sampleNotes = [
  { note: "This is a high priority note.", priority: "high" },
  { note: "This is a medium priority note.", priority: "medium" },
  { note: "This is a low priority note.", priority: "low" },
];

const TaskAttachments: FC<TaskOverViewProps> = ({ data }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modal, setModal] = useUrlState("modal");
  const [current, setCurrent] = useUrlState("current");

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
              {data?.supportingDocumentUrls?.map((attachment) => (
                <AttachmentCard {...attachment} />
              ))}
            </div>
            <div className='col-span-2 flex gap-x-5 items-center'>
              <OutlinedButton
                text='Upload files'
                size='md'
                // loading={mutation.isPending}
                type='button'
              />
              <div className='text-zinc-500 text-sm font-normal leading-snug'>
                Maximum file size: 10 MB
              </div>{" "}
            </div>
          </div>
        </CardSectionWrapper>
        <CardSectionWrapper
          className='col-span-1'
          title='Notes'
          icon={"ic:outline-edit-note"}
        >
          <div className='py-6 px-6 w-full'>
            <div>
              {sampleNotes.map((noteData, index) => (
                <NoteCard
                  key={index}
                  note={noteData.note}
                  priority={noteData.priority}
                />
              ))}
            </div>
            <div className='w-full'>
              <PrimaryButton
                text='Add Note'
                size='md'
                className='w-full'
                onClick={() => dispatchAction("asdfsdf", "add")}
              />
            </div>
          </div>
        </CardSectionWrapper>
      </div>
      {current && (
        <AddNoteContainer
          open={modal === "add"}
          setOpen={(val: boolean) => setModal(val ? "add" : undefined)}
          refetch={() => {}}
        />
      )}
    </>
  );
};

export default TaskAttachments;
