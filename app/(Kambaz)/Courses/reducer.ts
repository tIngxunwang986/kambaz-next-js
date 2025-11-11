import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { courses } from "../Database";
import { v4 as uuidv4 } from "uuid";

export interface Course {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    image?: string;
    description: string;
    department?: string;
    credits?: number;
    author?: string;
}

interface CoursesState {
    courses: Course[];
}

const initialState: CoursesState = {
    courses: courses as Course[],
};

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        addNewCourse: (state, action: PayloadAction<Course>) => {
            const newCourse: Course = {
                ...action.payload,
                _id: action.payload._id === "0" ? uuidv4() : action.payload._id
            };
            state.courses.push(newCourse);
        },
        deleteCourse: (state, action: PayloadAction<string>) => {
            state.courses = state.courses.filter(
                (course) => course._id !== action.payload
            );
        },
        updateCourse: (state, action: PayloadAction<Course>) => {
            const index = state.courses.findIndex(
                (c) => c._id === action.payload._id
            );
            if (index !== -1) {
                state.courses[index] = action.payload;
            }
        },
        setCourses: (state, action: PayloadAction<Course[]>) => {
            state.courses = action.payload;
        },
    },
});

export const { addNewCourse, deleteCourse, updateCourse, setCourses } =
    coursesSlice.actions;
export default coursesSlice.reducer;