import * as React from "react";
import { Button, IconButton, Link, Table, ThemeProvider } from "@mui/material";
import { ComplaintsFilters } from "../Filters/ComplaintsFilters";
import { useNavigate } from "react-router-dom";
import { theme } from "../../../../Theme/Theme";
import { useDispatch, useSelector } from "react-redux";
import { ComplaintsData } from "../../../../Store/Slicers/ComplaintsSlicer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const Complaints = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logged = useSelector((state) => state.user);
    const complaints = useSelector((state) => state.complaints);
    const [sorted, setSorted] = React.useState('asc');

    let complaintsArray = [];
    React.useEffect(() => {
        if (!complaints.data || !logged.data) {
            dispatch(ComplaintsData(localStorage.getItem("accessToken")));
        }
    }, [dispatch, logged, complaints.data]);

    if (!complaints.data) {
        return 'Загрузка';
    }

    if (complaints.data) {
        complaintsArray = [...complaints.data];
        complaintsArray.sort((a, b) => {
            if (sorted === 'desc') {
                return a.dateOfFailure <= b.dateOfFailure ? -1 : 1;
            }
            if (sorted === 'asc') {
                return a.dateOfFailure <= b.dateOfFailure ? 1 : -1;;
            }
            return 0;
        });
        
    }
    return (
        <>
            {logged.success ? (
                logged.data[0].role === "Менеджер" ||
                logged.data[0].role === "Сервисная компания" ? (
                    <ThemeProvider theme={theme}>
                        <Button
                            style={{ marginBottom: "20px" }}
                            onClick={() => {
                                navigate("/datainsert/complaints/");
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
            <ComplaintsFilters />

            <div style={{ overflowX: "scroll" }}>
                <Table>
                    <tbody>
                        <tr>
                            <th>№ п/п</th>
                            <th>Зав. № Техники</th>
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
                                    onClick={() => {sorted === 'desc' ? setSorted('asc') : setSorted('desc')}}
                                >
                                Дата отказа {sorted === 'desc' ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                                </IconButton>
                                </th>
                            <th>Наработка, м/час</th>
                            <th>Узел отказа</th>
                            <th>Описание отказа</th>
                            <th>Способ восстановления</th>
                            <th>Используемые запасные части</th>
                            <th>Дата восстановления</th>
                            <th>Время простоя техники</th>
                            <th>Сервисная компания</th>
                        </tr>
                        {complaintsArray >= 0 ? (
                            <tr>
                                <td>Загрузка</td>
                            </tr>
                        ) : (
                            complaintsArray.map((value, idx) => (
                                <tr key={value.id}>
                                    <td>{idx + 1}</td>
                                    <td>
                                        {value.machine.factoryNumberOfMachine}
                                    </td>
                                    <td>{value.dateOfFailure}</td>
                                    <td>{value.operatingTime}</td>
                                    <td>
                                        <Link
                                            href={`typeoffailure/${value.nodeOfFailure.id}`}
                                        >
                                            {value.nodeOfFailure.title}
                                        </Link>
                                    </td>
                                    <td>{value.descriptionOfFailure}</td>
                                    <td>
                                        <Link
                                            href={`recoverymethod/${value.recoveryMethod.id}`}
                                        >
                                            {value.recoveryMethod.title}
                                        </Link>
                                    </td>
                                    <td>{value.usedSpareParts}</td>
                                    <td>{value.dateOfRecovery}</td>
                                    <td>{value.downtimeOfMachine}</td>
                                    <td>{value.serviceCompany.first_name}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export { Complaints };
