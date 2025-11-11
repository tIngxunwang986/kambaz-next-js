import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";

export interface Enrollment {
    _id: string;
    user: string;
    course: string;
}

interface EnrollmentsState {
    enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
    enrollments: enrollments as Enrollment[],
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        enrollCourse: (
            state,
            { payload }: { payload: { user: string; course: string } }
        ) => {
            const alreadyEnrolled = state.enrollments.some(
                (e) => e.user === payload.user && e.course === payload.course
            );
            if (alreadyEnrolled) {
                return;
            }
            const newEnrollment: Enrollment = {
                _id: uuidv4(),
                user: payload.user,
                course: payload.course,
            };
            state.enrollments = [...state.enrollments, newEnrollment];
        },
        unenrollCourse: (
            state,
            { payload }: { payload: { user: string; course: string } }
        ) => {
            state.enrollments = state.enrollments.filter(
                (e) => !(e.user === payload.user && e.course === payload.course)
            );
        },
    },
});

export const { enrollCourse, unenrollCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;