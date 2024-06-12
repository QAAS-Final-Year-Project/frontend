import moment from "moment";

export const sampleTask = {
    code: "T12345",
    notes: "This is a brief note about the task.",
    description: "This task involves developing the frontend components for the user dashboard. Ensure the design matches the provided wireframes and the components are reusable.",
    deadlineDate: moment().add(7, 'days').format("YYYY-MM-DD"), // Assuming the deadline is 7 days from now

};