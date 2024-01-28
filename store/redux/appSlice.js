import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: 'appSlice',
    initialState: {
        USER: {
            EMAIL: '',
            PASS: '',
            TOKEN: ''
        },
        BOOKING: {
            ORIGIN: {
                LAT: '',
                LNG: '',
                ADD: '',
                LANDMARK: ''
            },
            DESTINATION: {
                LAT: '',
                LNG: '',
                ADD: '',
                LANDMARK: ''
            },
            ID: ''
        }
    },
    reducers: {
        appendUser: (state, action) => {
            state.USER = {
                ...action.payload
            }
        },
        appendOriginBooking: (state, action) => {
            state.BOOKING = {
                ...state.BOOKING,
                ORIGIN: action.payload
            }
        },
        appendDestinationBooking: (state, action) => {
            state.BOOKING = {
                ...state.BOOKING,
                DESTINATION: action.payload
            }
        },
        updateBookingID: (state, action) => {
            state.BOOKING = {
                ...state.BOOKING,
                ID: action.payload
            }
        },
    }
})

export const appendUser = appSlice.actions.appendUser;
export const appendOriginBooking = appSlice.actions.appendOriginBooking;
export const appendDestinationBooking = appSlice.actions.appendDestinationBooking;
export const updateBookingID = appSlice.actions.updateBookingID;

export default appSlice.reducer;

