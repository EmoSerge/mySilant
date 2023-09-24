import { Button, IconButton, Link, Table, ThemeProvider } from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MaintenanceData } from "../../../../Store/Slicers/MaintenanceSlicer";
import { theme } from "../../../../Theme/Theme";
import { MaintenanceFilters } from "../Filters/MaintenanceFilters";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const Maintenance = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logged = useSelector((state) => state.user);
    const [sorted, setSorted] = React.useState('asc');
    const maintenance = useSelector((state) => state.maintenance);
    let maintenanceArray = [];

    React.useEffect(() => {
        if (!maintenance.data || !logged.data) {
            dispatch(MaintenanceData(localStorage.getItem("accessToken")));
        }
    }, [dispatch, logged.data, maintenance.data]);

    if (logged.loading && !maintenance.data) {
        return "Загрузка";
    }

    if (maintenance.data) {
        maintenanceArray = [...maintenance.data];
        maintenanceArray.sort((a, b) => {
            if (sorted === 'desc') {
                return a.dateOfMaintenance <= b.dateOfMaintenance ? -1 : 1;
            }
            if (sorted === 'asc') {
                return a.dateOfMaintenance <= b.dateOfMaintenance ? 1 : -1;;
            }
            return 0;
        });
        
    }
    return (
        <>
            {logged.success ? (
                logged.data[0].role === "Менеджер" ||
                logged.data[0].role === "Клиент" ||
                logged.data[0].role === "Сервисная компания" ? (
                    <ThemeProvider theme={theme}>
                        <Button
                            style={{ marginBottom: "20px" }}
                            onClick={() => {
                                navigate("/datainsert/maintenance/");
                            }}
                        >
                            Добавить новую запись
                        </Button>
                    </ThemeProvider>
                ) : (
                    <></>
                )
            ) : (
                <></>
            )}
            <MaintenanceFilters />

            <div style={{ overflowX: "scroll" }}>
                <Table>
                    <tbody>
                        <tr>
                            <th>№ п/п</th>
                            <th>Зав. № техники</th>
                            <th>Вид ТО</th>
                            <th>
                            <IconButton
                                    sx={{
                                        fontSize: "12px",
                                        color: "#000",
                                        fontFamily: "Astra",
                                        fontWeight: "bold",
                                    }}
                                    disableTouchRipple
                                    disableRipple
                                    disableFocusRipple
                                    onClick={() => {sorted === 'desc' ? setSorted('asc') : setSorted('desc')}}>
                                Дата проведения ТО {sorted === 'desc' ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                                </IconButton></th>
                            <th>Наработка, м/час</th>
                            <th>№ заказ-наряда</th>
                            <th>дата заказ-наряда</th>
                            <th>Организация проводившая ТО</th>
                        </tr>
                        {maintenanceArray.length <= 0 ? (
                            <tr>
                                <td>Загрузка</td>
                            </tr>
                        ) : (
                            maintenanceArray.map((value, idx) => (
                                <tr key={value.id}>
                                    <td>{idx + 1}</td>
                                    <td>
                                        {value.machine.factoryNumberOfMachine}
                                    </td>
                                    <td>
                                        <Link
                                            href={`maintenance/${value.typeOfMaintenance.id}`}
                                        >
                                            {value.typeOfMaintenance.title}
                                        </Link>
                                    </td>
                                    <td>{value.dateOfMaintenance}</td>
                                    <td>{value.operatingTime}</td>
                                    <td>{value.numberOrderWork}</td>
                                    <td>{value.dateOrderWork}</td>
                                    <td>
                                        <Link
                                            href={`serviceCompany/${value.maintenanceServiceCompany.id}`}
                                        >
                                            {
                                                value.maintenanceServiceCompany
                                                    .first_name
                                            }
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export { Maintenance };
