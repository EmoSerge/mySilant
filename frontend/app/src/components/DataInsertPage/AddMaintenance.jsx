import {
    Alert,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    ThemeProvider,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../../Theme/Theme";
import {
    AddMaintenanceData,
    MaintenanceData,
    cleanStateAfterCreated,
} from "../../Store/Slicers/MaintenanceSlicer";
import { useNavigate } from "react-router-dom";
import {
    TypeOfMaintenanceData,
    UsersData,
} from "../../Store/Slicers/HandbookSlicer";

const AddMaintenance = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const typeOfMaintenance = useSelector((state) => state.maintenance);
    const handbooksList = useSelector((state) => state.handbook);

    const machines = typeOfMaintenance.success
        ? typeOfMaintenance.data.map(
              (item) => item.machine.factoryNumberOfMachine
          )
        : [];

    const settedMachines = [...new Set(machines)];

    const [machine, setMachine] = React.useState();
    const [maintenance, setMaintenance] = React.useState();
    const [dateOfMaintenance, setDateOfMaintenance] = React.useState();
    const [operatingTime, setOperatingTime] = React.useState();
    const [numberOrderWork, setNumberOrderWork] = React.useState();
    const [dateOrderWork, setDateOrderWork] = React.useState();
    const [maintenanceServiceCompany, setMaintenanceServiceCompany] =
        React.useState();

    React.useEffect(() => {
        if (!typeOfMaintenance.data) {
            dispatch(MaintenanceData(localStorage.getItem("accessToken")));
        }

        if (!handbooksList.typeofmaintenance) {
            dispatch(TypeOfMaintenanceData());
        }

        if (!handbooksList.users) {
            dispatch(UsersData());
        }
        if (typeOfMaintenance.success && typeOfMaintenance.addmaintenance) {
            setTimeout(() => {
                dispatch(cleanStateAfterCreated());
                navigate("/");
            }, 2000);
        }
    }, [
        dispatch,
        navigate,
        typeOfMaintenance,
        handbooksList.machinelist,
        handbooksList.typeofmaintenance,
        handbooksList.users,
    ]);

    const formSubmit = (event) => {
        event.preventDefault();
        const body = JSON.stringify({
            modelOfMachine: machine,
            typeOfMaintenance: maintenance,
            dateOfMaintenance: dateOfMaintenance,
            operatingTime: operatingTime,
            dateOrderWork: dateOrderWork,
            numberOrderWork: numberOrderWork,
            serviceCompany: maintenanceServiceCompany,
        });

        dispatch(AddMaintenanceData(body));
    };

    if (
        !typeOfMaintenance.data &&
        !handbooksList.machinelist &&
        !handbooksList.typeofmaintenance &&
        !handbooksList.users
    ) {
        return "Загрузка";
    }

    return (
        <div>
            {typeOfMaintenance.addmaintenance && (
                <Alert severity="success">Запись добавлен</Alert>
            )}
            <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={formSubmit}
            >
                <FormControl
                    style={{ margin: "10px 0", width: "100%" }}
                    required
                >
                    <InputLabel>Выберите Технику</InputLabel>
                    <Select
                        value={machine || ""}
                        label="Выберите Технику"
                        onChange={(e) => setMachine(e.target.value)}
                    >
                        {settedMachines &&
                            settedMachines.map((item, idx) => (
                                <MenuItem key={idx} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>

                <FormControl
                    style={{ margin: "10px 0", width: "100%" }}
                    required
                >
                    <InputLabel>Выберите вид ТО</InputLabel>
                    <Select
                        value={maintenance || ""}
                        label="Выберите вид ТО"
                        onChange={(e) => setMaintenance(e.target.value)}
                    >
                        {handbooksList.typeofmaintenance &&
                            handbooksList.typeofmaintenance.map((item) => (
                                <MenuItem key={item.id} value={item.title}>
                                    {item.title}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>

                <FormControl
                    style={{ margin: "10px 0", width: "100%" }}
                    required
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                                value={dateOfMaintenance || ""}
                                label="Дата проведения ТО"
                                format="YYYY-MM-DD"
                                views={["year", "month", "day"]}
                                onChange={(value) => {
                                    const formattedDate = new Date(value);
                                    const date =
                                        formattedDate.getDate().toString()
                                            .length > 1
                                            ? formattedDate.getDate().toString()
                                            : `0${formattedDate.getDate()}`;
                                    const month =
                                        (
                                            formattedDate.getMonth() + 1
                                        ).toString().length > 1
                                            ? formattedDate.getMonth() + 1
                                            : `0${
                                                  formattedDate.getMonth() + 1
                                              }`;
                                    const year = formattedDate.getFullYear();
                                    setDateOfMaintenance(
                                        year + "-" + month + "-" + date
                                    );
                                }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        label="Наработка, м/час"
                        onChange={(e) => setOperatingTime(e.target.value)}
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        label="№ заказ-наряда"
                        onChange={(e) => setNumberOrderWork(e.target.value)}
                    />
                </FormControl>

                <FormControl
                    style={{ margin: "10px 0", width: "100%" }}
                    required
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                                value={dateOrderWork || ""}
                                label="Дата заказ-наряда"
                                format="YYYY-MM-DD"
                                views={["year", "month", "day"]}
                                onChange={(value) => {
                                    const formattedDate = new Date(value);
                                    const date =
                                        formattedDate.getDate().toString()
                                            .length > 1
                                            ? formattedDate.getDate().toString()
                                            : `0${formattedDate.getDate()}`;
                                    const month =
                                        (
                                            formattedDate.getMonth() + 1
                                        ).toString().length > 1
                                            ? formattedDate.getMonth() + 1
                                            : `0${
                                                  formattedDate.getMonth() + 1
                                              }`;
                                    const year = formattedDate.getFullYear();
                                    setDateOrderWork(
                                        year + "-" + month + "-" + date
                                    );
                                }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </FormControl>

                <FormControl
                    style={{ margin: "10px 0", width: "100%" }}
                    required
                >
                    <InputLabel>Сервисная компания проводивщая ТО</InputLabel>
                    <Select
                        value={maintenanceServiceCompany || ""}
                        label="Сервисная компания проводивщая ТО"
                        onChange={(e) =>
                            setMaintenanceServiceCompany(e.target.value)
                        }
                    >
                        {handbooksList.users &&
                            handbooksList.users.map(
                                (item) =>
                                    item.users.role === "SC" && (
                                        <MenuItem
                                            key={item.id}
                                            value={item.first_name}
                                        >
                                            {item.first_name}
                                        </MenuItem>
                                    )
                            )}
                        <MenuItem value={"Самостоятельно"}>
                            Самостоятельно
                        </MenuItem>
                    </Select>
                </FormControl>
                <ThemeProvider theme={theme}>
                    <Button type="submit">Добавить</Button>
                </ThemeProvider>
            </form>
        </div>
    );
};

export { AddMaintenance };
