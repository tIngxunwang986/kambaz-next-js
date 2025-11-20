import axios from "axios";
import type { Course } from "./reducer";
import type { Module } from "./[cid]/Modules/reducer";
import type { Assignment } from "./[cid]/Assignments/reducer";
import type { Enrollment } from "../Enrollments/reducer";

const axiosWithCredentials = axios.create({ withCredentials: true });

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const COURSES_API = `${HTTP_SERVER}/api/courses`;
export const USERS_API = `${HTTP_SERVER}/api/users`;
export const MODULES_API = `${HTTP_SERVER}/api/modules`;
export const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;
export const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;

export const fetchAllCourses = async (): Promise<Course[]> => {
    const { data } = await axios.get<Course[]>(COURSES_API);
    return data;
};

export const findMyCourses = async (): Promise<Course[]> => {
    const { data } = await axiosWithCredentials.get<Course[]>(
        `${USERS_API}/current/courses`
    );
    return data;
};

export const createCourse = async (course: Course): Promise<Course> => {
    const { data } = await axiosWithCredentials.post<Course>(
        `${USERS_API}/current/courses`,
        course
    );
    return data;
};

export const deleteCourse = async (id: string): Promise<number> => {
    const { status } = await axios.delete(`${COURSES_API}/${id}`);
    return status;
};

export const updateCourse = async (course: Course): Promise<Course> => {
    const { data } = await axiosWithCredentials.put<Course>(
        `${COURSES_API}/${course._id}`,
        course
    );
    return data;
};

export const findModulesForCourse = async (
    courseId: string
): Promise<Module[]> => {
    const { data } = await axios.get<Module[]>(
        `${COURSES_API}/${courseId}/modules`
    );
    return data;
};

export const createModuleForCourse = async (
    courseId: string,
    module: Partial<Module>
): Promise<Module> => {
    const { data } = await axios.post<Module>(
        `${COURSES_API}/${courseId}/modules`,
        module
    );
    return data;
};

export const deleteModule = async (moduleId: string): Promise<number> => {
    const { status } = await axios.delete(`${MODULES_API}/${moduleId}`);
    return status;
};

export const updateModule = async (module: Module): Promise<Module> => {
    const { data } = await axios.put<Module>(
        `${MODULES_API}/${module._id}`,
        module
    );
    return data;
};

export const findAssignmentsForCourse = async (
    courseId: string
): Promise<Assignment[]> => {
    const { data } = await axios.get<Assignment[]>(
        `${COURSES_API}/${courseId}/assignments`
    );
    return data;
};

export const createAssignmentForCourse = async (
    courseId: string,
    assignment: Partial<Assignment>
): Promise<Assignment> => {
    const { data } = await axios.post<Assignment>(
        `${COURSES_API}/${courseId}/assignments`,
        assignment
    );
    return data;
};

export const updateAssignmentOnServer = async (
    assignment: Assignment
): Promise<Assignment> => {
    const { data } = await axios.put<Assignment>(
        `${ASSIGNMENTS_API}/${assignment._id}`,
        assignment
    );
    return data;
};

export const deleteAssignmentOnServer = async (
    assignmentId: string
): Promise<number> => {
    const { status } = await axios.delete(
        `${ASSIGNMENTS_API}/${assignmentId}`
    );
    return status;
};


export const fetchMyEnrollments = async (): Promise<Enrollment[]> => {
    const { data } = await axiosWithCredentials.get<Enrollment[]>(
        ENROLLMENTS_API
    );
    return data;
};

export const enrollInCourseOnServer = async (
    userId: string,
    courseId: string
): Promise<Enrollment> => {
    const { data } = await axiosWithCredentials.post<Enrollment>(
        ENROLLMENTS_API,
        { user: userId, course: courseId }
    );
    return data;
};

export const unenrollFromCourseOnServer = async (
    enrollmentId: string
): Promise<number> => {
    const { status } = await axiosWithCredentials.delete(
        `${ENROLLMENTS_API}/${enrollmentId}`
    );
    return status;
};