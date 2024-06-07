import Header from "Shared/components/layout/header";
import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { FC } from "react";
import TaskRow from "./components/task-row";
import { StatusType } from "Shared/components/chips/status-chip";

const TasksPage: FC = () => {
    const sampleTask = {
        id:"test",
        taskName: "Design a Landing Page",
        status: "Expiring",
        statusType: "warning" as StatusType,
        timeLeft: "23 hours left",
        biddersCount: 3,
        avgBid: 22,
        hourlyRate: "$15 - $30",
        onDelete: () => console.log("Delete action"),
        onUpdate: () => console.log("Update action"),
      };
    
    
  return (
    <section>
      <div className='p-2.5 mb-8'>
        <Header
          title='Manage Tasks'
          breadCrumps={[
            {
              title: "Home",
              to: "/",
            },
            {
              title: "Dashboard",
              to: "/",
            },
            {
              title: "Manage Task",
              to: "#",
            },
          ]}
        />
      </div>
      <div className='space-y-[30px]'>
        <CardSectionWrapper
          icon={"ic:outline-create-new-folder"}
          title='My Tasks'
        >
          <TaskRow {...sampleTask}/>
        </CardSectionWrapper>
      </div>
    </section>
  );
}


export default TasksPage;
