import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "./client";

interface AccountState {
    currentUser: UserType | null;
}

const initialState: AccountState = {
    currentUser: null,
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<UserType | null>) => {
            state.currentUser = action.payload;
        },
    },
});

export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;