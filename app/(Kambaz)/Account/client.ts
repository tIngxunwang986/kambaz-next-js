import axios from "axios";

const axiosWithCredentials = axios.create({
    withCredentials: true,
});

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;

export interface CredentialsType {
    username: string;
    password: string;
}

export interface UserType {
    _id?: string;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    dob?: string;
    email?: string;
    role?: string;
}

export const signin = async (credentials: CredentialsType) => {
    const response = await axiosWithCredentials.post(
        `${USERS_API}/signin`,
        credentials
    );
    return response.data;
};

export const profile = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    return response.data;
};

export const signup = async (user: CredentialsType) => {
    const response = await axiosWithCredentials.post(
        `${USERS_API}/signup`,
        user
    );
    return response.data;
};

export const signout = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
    return response.data;
};

export const updateUser = async (user: UserType) => {
    const response = await axiosWithCredentials.put(
        `${USERS_API}/${user._id}`,
        user
    );
    return response.data;
};