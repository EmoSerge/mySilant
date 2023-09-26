import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { EngineData} from "../../Store/Slicers/EngineSlicer";
import { MainBridgeData} from "../../Store/Slicers/MainBridgeSlicer";
import { SteerableBridgeData} from "../../Store/Slicers/SteerableBridgeSlicer";
import { TransmissionData} from "../../Store/Slicers/TransmissionSlicer";
import { FailureTypeData} from "../../Store/Slicers/FailureTypeSlicer";
import { RecoveryMethodData } from "../../Store/Slicers/RecoveryMethodSlicer";
import { TypeOfTOData} from "../../Store/Slicers/TypeOfTOSlicer";
import { UsersData} from "../../Store/Slicers/UsersSlicer";
import { CustomContainer } from "../CustomContainer/CustomContainer";
import { Button, ThemeProvider } from "@mui/material";
import { theme } from "../../Theme/Theme";

const DataB = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const key = Object.keys(params)[0];
    const id = Object.values(params)[0];
    const datab = useSelector((state) => state.datab);

    const user = useSelector((state) => state.user);

    React.useEffect(() => {
        if (key === "engine") {
            dispatch(EngineData(id));
        }

        if (key === "transmission") {
            dispatch(TransmissionData(id));
        }

        if (key === "mainbridge") {
            dispatch(MainBridgeData(id));
        }

        if (key === "steerablebridge") {
            dispatch(SteerableBridgeData(id));
        }

        if (key === "typeofto") {
            dispatch(TypeOfTOData(id));
        }

        if (key === "nodeoffailure") {
            dispatch(FailureTypeData(id));
        }

        if (key === "recoverymethod") {
            dispatch(RecoveryMethodData(id));
        }

        if (key === "servicecompany" || key === "client") {
            dispatch(UsersData(id));
        }
    }, [key, dispatch, id, user, navigate]);

    return (
        <CustomContainer style={{ textAlign: "center" }}>
            {datab.success && key === "engine" ? (
                <>
                    <h1>{datab.engine.title}</h1>
                    <h3>{datab.engine.description}</h3>
                </>
            ) : datab.success && key === "transmission" ? (
                <>
                    <h1>{datab.transmission.title}</h1>
                    <h3>{datab.transmission.description}</h3>
                </>
            ) : datab.success && key === "mainbridge" ? (
                <>
                    <h1>{datab.mainbridge.title}</h1>
                    <h3>{datab.mainbridge.description}</h3>
                </>
            ) : datab.success && key === "steerablebridge" ? (
                <>
                    <h1>{datab.steerablebridge.title}</h1>
                    <h3>{datab.steerablebridge.description}</h3>
                </>
            ) : datab.success && key === "typeofto" ? (
                <>
                    <h1>{datab.typeofto.title}</h1>
                    <h3>{datab.typeofto.description}</h3>
                </>
            ) : datab.success && key === "nodeoffailure" ? (
                <>
                    <h1>{datab.failuretype.title}</h1>
                    <h3>{datab.failuretype.description}</h3>
                </>
            ) : datab.success && key === "recoverymethod" ? (
                <>
                    <h1>{datab.recoverymethod.title}</h1>
                    <h3>{datab.recoverymethod.description}</h3>
                </>
            ) : datab.success &&
            (key === "servicecompany" || key === "client") ? (
                <>
                    <h1>{datab.users.username}</h1>
                    <h3>{datab.users.role}</h3>
                </>
            ) : (
                <></>
            )}
            <ThemeProvider theme={theme}>
                <Button
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Назад
                </Button>
            </ThemeProvider>
        </CustomContainer>
    );
};

export { DataB };