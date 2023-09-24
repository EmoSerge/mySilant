import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailTable } from "./DetailTable/DetailTable";
import { useDispatch, useSelector } from "react-redux";
import { DetailedData } from "../../Store/Slicers/DetailedSlicer";
import { Button } from "@mui/material";
import { CustomContainer } from "../CustomComponents/CustomContainer/CustomContainer";

const MachineDetailPage = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const machine = useSelector((state) => state.detailed);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(DetailedData(params.id));
    }, [dispatch, params.id]);

    
    return (
        <CustomContainer>
            <DetailTable machine={machine} />
            <Button onClick={() => {navigate('/')}}>Назад</Button>
        </CustomContainer>
    );
};

export { MachineDetailPage };
