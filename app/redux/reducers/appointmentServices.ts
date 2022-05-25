import { createReducer } from '@reduxjs/toolkit';
import { initialState } from '../initialState';
import { reset, setAppointmentServices } from '../actions';

export const appointmentServicesReducer = createReducer(initialState.appointmentServices, (builder) => {
  builder
    .addCase(setAppointmentServices, (state, action) => (action.payload))
    .addCase(reset, () => initialState.appointmentServices);
});
