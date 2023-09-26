import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AddMachine } from "./AddMachine";
import { Button } from "@mui/material";
import { AddMaintenance } from "./AddMaintenance";
import { AddComplaints } from "./AddComplaints";
import { CustomContainer } from "../CustomComponents/CustomContainer/CustomContainer";

const DataInsertPage = () => {
    const navigate = useNavigate();
    const params = useParams();

    return (
        <CustomContainer>
            {params.type === "machine" ? (
                <AddMachine />
            ) : params.type === "maintenance" ? (
                <AddMaintenance />
            ) : params.type === "complaints" ? (
                <AddComplaints />
            ) : (
                <></>
            )}
            <Button
                onClick={() => {
                    navigate("/");
                }}
            >
                Назад
            </Button>
        </CustomContainer>
    );
};

export { DataInsertPage };
