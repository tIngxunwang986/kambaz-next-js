import axios from "axios";
import type { Enrollment } from "./reducer";

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER as string;
export const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;

export const fetchEnrollments = async (): Promise<Enrollment[]> => {
    const { data } = await axios.get<Enrollment[]>(ENROLLMENTS_API);
    return data;
};

export const enroll = async (
    enrollment: Omit<Enrollment, "_id">
): Promise<Enrollment | null> => {
    const { data } = await axios.post<Enrollment>(
        ENROLLMENTS_API,
        enrollment
    );
    return data;
};

export const unenroll = async (
    enrollmentId: string
): Promise<number> => {
    const { status } = await axios.delete(
        `${ENROLLMENTS_API}/${enrollmentId}`
    );
    return status;
};