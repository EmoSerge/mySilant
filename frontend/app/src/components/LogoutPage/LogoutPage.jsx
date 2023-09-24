import React from "react";
import { CustomContainer } from "../CustomComponents/CustomContainer/CustomContainer";
import { Button, ThemeProvider } from "@mui/material";
import { theme } from "../../Theme/Theme";
import { useDispatch } from "react-redux";
import { logout } from "../../Store/Slicers/AuthSlicer";
import { useNavigate } from "react-router-dom";
import { complaintsClear } from "../../Store/Slicers/ComplaintsSlicer";
import { detailedClear } from "../../Store/Slicers/DetailedSlicer";
import { handbookClear } from "../../Store/Slicers/HandbookSlicer";
import { machineClear } from "../../Store/Slicers/MachineSlicer";
import { maintenanceClear } from "../../Store/Slicers/MaintenanceSlicer";
import { userInfoClear } from "../../Store/Slicers/UserInfoSlicer";

const LogoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <CustomContainer>
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h3>Вы Уверены, что хотите выйти ?</h3>
                <ThemeProvider theme={theme}>
                    <Button
                        onClick={() => {
                            dispatch(logout());
                            dispatch(complaintsClear());
                            dispatch(detailedClear());
                            dispatch(handbookClear());
                            dispatch(machineClear());
                            dispatch(maintenanceClear());
                            dispatch(userInfoClear());
                            navigate("/");
                        }}
                    >
                        Выйти
                    </Button>
                </ThemeProvider>
            </div>
        </CustomContainer>
    );
};

export { LogoutPage };
