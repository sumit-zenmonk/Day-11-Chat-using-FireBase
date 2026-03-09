import { createSlice } from "@reduxjs/toolkit"
import { SelectedRecieverType } from "./selected_reciever_type";

const initialState: SelectedRecieverType = {
    reciever_uid: '',
}

const SelectedRecieverSlice = createSlice({
    name: "selected_reciever",
    initialState: initialState,
    reducers: {
        selectReciever(state, action) {
            state.reciever_uid = action.payload.reciever_uid
        }
    },
});

export const { selectReciever } = SelectedRecieverSlice.actions;
export default SelectedRecieverSlice.reducer;