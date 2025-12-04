import { createSlice } from "@reduxjs/toolkit";

export interface Enrollment {
    _id: string;
    user: string;
    course: string;
}

interface EnrollmentsState {
    enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
    enrollments: [],
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        setEnrollments: (state, { payload }) => {
            state.enrollments = payload;
        },
        enrollCourse: (
            state,
            { payload }: { payload: Enrollment }
        ) => {
            const already = state.enrollments.some(
                (e) => e.user === payload.user && e.course === payload.course
            );
            if (already) return;
            state.enrollments.push(payload);
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

export const { setEnrollments, enrollCourse, unenrollCourse } =
    enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;