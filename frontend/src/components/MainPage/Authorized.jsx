import * as React from "react";
import { CustomContainer } from "../CustomComponents/CustomContainer";
import { MainPageTable } from "./MainPageTable/MainPageTable";
import { useSelector } from "react-redux";

const Authorized = () => {

    const user = useSelector((state) => state.user)
    return (
        <CustomContainer>
            <h2 style={{textAlign: "center",color: "var(--main_color)"}}>{user.success ? user.data[0].role  : 'Загрузка...'} : {user.success ? user.data[0].first_name  : 'Загрузка...'} </h2>
            <h3 style={{textAlign: "center",color: "var(--main_color)"}}>Информация о комплектации и технических характеристиках Вашей техники</h3>
            <MainPageTable />
        </CustomContainer>
    );
};

export { Authorized };
