import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Assignment {
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
    assignments: [],
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setAssignments: (state, { payload }: PayloadAction<Assignment[]>) => {
            state.assignments = payload;
        },
        addAssignment: (state, { payload }: PayloadAction<Assignment>) => {
            state.assignments = [...state.assignments, payload];
        },
        deleteAssignment: (state, { payload }: PayloadAction<string>) => {
            state.assignments = state.assignments.filter(
                (a) => a._id !== payload
            );
        },
        updateAssignment: (state, { payload }: PayloadAction<Assignment>) => {
            state.assignments = state.assignments.map((a) =>
                a._id === payload._id ? payload : a
            );
        },
    },
});

export const {
    setAssignments,
    addAssignment,
    deleteAssignment,
    updateAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;