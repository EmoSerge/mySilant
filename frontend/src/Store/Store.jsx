import { configureStore } from '@reduxjs/toolkit';
import AuthSlicer from './Slicers/AuthSlicer';
import MachineSlicer from './Slicers/MachineSlicer';
import UserInfoSlicer from './Slicers/UserInfoSlicer';
import MaintenanceSlicer from './Slicers/MaintenanceSlicer';
import ComplaintsSlicer from './Slicers/ComplaintsSlicer';
import DetailedSlicer from './Slicers/DetailedSlicer';
import HandbookSlicer from './Slicers/HandbookSlicer';

export default configureStore({
    reducer: {
        login: AuthSlicer,
        machine: MachineSlicer,
        maintenance: MaintenanceSlicer,
        complaints: ComplaintsSlicer,
        user: UserInfoSlicer,
        detailed: DetailedSlicer,
        handbook: HandbookSlicer
    }
})