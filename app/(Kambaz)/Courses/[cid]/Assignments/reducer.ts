import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

interface Assignment {
    _id: string;
    course: string;
    title: string;
    description: string;
    points: number;
    dueDate: string;
    availableFrom: string;
    availableUntil: string;
}

interface AssignmentsState {
    assignments: Assignment[];
}

const initialState: AssignmentsState = {
    assignments: assignments as Assignment[],
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, { payload: assignment }) => {
            const newAssignment: Assignment = {
                _id: uuidv4(),
                course: assignment.course,
                title: assignment.title,
                description: assignment.description,
                points: assignment.points,
                dueDate: assignment.dueDate,
                availableFrom: assignment.availableFrom,
                availableUntil: assignment.availableUntil,
            };
            state.assignments = [...state.assignments, newAssignment];
        },
        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(
                (a: Assignment) => a._id !== assignmentId
            );
        },
        updateAssignment: (state, { payload: assignment }) => {
            state.assignments = state.assignments.map((a: Assignment) =>
                a._id === assignment._id ? { ...a, ...assignment } : a
            );
        },
    },
});

export const { addAssignment, deleteAssignment, updateAssignment } =
    assignmentsSlice.actions;
export default assignmentsSlice.reducer;