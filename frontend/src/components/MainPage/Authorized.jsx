import * as React from "react";
import { CustomContainer } from "../CustomComponents/CustomContainer/CustomContainer";
import { MainPageTable } from "./MainPageTable/MainPageTable";
import { useSelector } from "react-redux";

const Authorized = () => {

    const user = useSelector((state) => state.user)
    return (
        <CustomContainer>
            <h1 style={{textAlign: "center"}}>{user.success ? user.data[0].role : 'Загрузка...'} </h1>
            <h2 style={{textAlign: "center"}}>Информация о комплектации и технических характеристиках Вашей техники</h2>
            <p style={{textAlign: 'center', marginTop: '40px'}}>Таблица с данными (выдача результата)</p>
            <MainPageTable />
        </CustomContainer>
    );
};

export { Authorized };
