import {
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
import { theme } from "../../Theme/Theme";
import { useDispatch, useSelector } from "react-redux";
import {
    MethodOfRecoveryData,
    TypeOfFailureData,
    UsersData,
} from "../../Store/Slicers/HandbookSlicer";
import {
    AddComplaintsData,
    cleanStateAfterCreated,
} from "../../Store/Slicers/ComplaintsSlicer";
import { MachineData } from "../../Store/Slicers/MachineSlicer";
import { useNavigate } from "react-router-dom";

const AddComplaints = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formSubmit = (event) => {
        event.preventDefault();
        const body = JSON.stringify({
            machine: machine,
            dateOfFailure: dateOfFailure,
            operatingTime: operatingTime,
            nodeOfFailure: nodeOfFailure,
            descriptionOfFailure: descriptionOfFailure,
            recoveryMethod: recoveryMethod,
            usedSpareParts: usedSpareParts,
            dateOfRecovery: dateOfRecovery,
            serviceCompany: serviceCompany,
        });
        dispatch(AddComplaintsData(body));
    };

    const [machine, setMachine] = React.useState();
    const [dateOfFailure, setDateOfFailure] = React.useState();
    const [operatingTime, setOperatingTime] = React.useState();
    const [nodeOfFailure, setNodeOfFailure] = React.useState();
    const [descriptionOfFailure, setDescriptionOfFailure] = React.useState();
    const [recoveryMethod, setRecoveryMethod] = React.useState();
    const [usedSpareParts, setUsedSpareParts] = React.useState();
    const [dateOfRecovery, setDateOfRecovery] = React.useState();
    const [serviceCompany, setServiceCompany] = React.useState();

    const handbook = useSelector((state) => state.handbook);
    const machines = useSelector((state) => state.machine);
    const created = useSelector((state) => state.complaints);

    React.useEffect(() => {
        if (!handbook.typeoffailure) {
            dispatch(TypeOfFailureData());
        }
        if (!handbook.methodofrecovery) {
            dispatch(MethodOfRecoveryData());
        }

        if (!handbook.users) {
            dispatch(UsersData());
        }

        if (!machines.data) {
            dispatch(MachineData(localStorage.getItem("accessToken")));
        }

        if (created.addcomplaints) {
            setTimeout(() => {
                dispatch(cleanStateAfterCreated());
                navigate("/");
            }, 2000);
        }
    }, [
        dispatch,
        machines.data,
        handbook.typeoffailure,
        handbook.methodofrecovery,
        handbook.users,
        navigate,
        created,
    ]);

    const machinesMap = machines.data
        ? machines.data.map((item) => item.factoryNumberOfMachine)
        : [];

    const settedMachines = [...new Set(machinesMap)];
    if (
        !machines.data &&
        !handbook.typeoffailure &&
        !handbook.methodofrecovery
    ) {
        return "Загрузка";
    }
    return (
        <div>
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                                value={dateOfFailure || ""}
                                label="Дата отказа"
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
                                    setDateOfFailure(
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

                <FormControl
                    style={{ margin: "10px 0", width: "100%" }}
                    required
                >
                    <InputLabel>Узел отказа</InputLabel>
                    <Select
                        value={nodeOfFailure || ""}
                        label="Узел отказа"
                        onChange={(e) => setNodeOfFailure(e.target.value)}
                    >
                        {handbook.typeoffailure &&
                            handbook.typeoffailure.map((item) => (
                                <MenuItem key={item.id} value={item.title}>
                                    {item.title}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <TextField
                        required
                        label="Описание отказа"
                        onChange={(e) =>
                            setDescriptionOfFailure(e.target.value)
                        }
                    />
                </FormControl>

                <FormControl
                    style={{ margin: "10px 0", width: "100%" }}
                    required
                >
                    <InputLabel>Способ восстановления</InputLabel>
                    <Select
                        value={recoveryMethod || ""}
                        label="Способ восстановления"
                        onChange={(e) => setRecoveryMethod(e.target.value)}
                    >
                        {handbook.methodofrecovery &&
                            handbook.methodofrecovery.map((item) => (
                                <MenuItem key={item.id} value={item.title}>
                                    {item.title}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <TextField
                        label="Используемые запасные части"
                        onChange={(e) => setUsedSpareParts(e.target.value)}
                    />
                </FormControl>

                <FormControl
                    style={{ margin: "10px 0", width: "100%" }}
                    required
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                                value={dateOfRecovery || ""}
                                label="Дата восстановления"
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
                                    setDateOfRecovery(
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
                    <InputLabel>Сервисная компания</InputLabel>
                    <Select
                        value={serviceCompany || ""}
                        label="Сервисная компания"
                        onChange={(e) => setServiceCompany(e.target.value)}
                    >
                        {handbook.users &&
                            handbook.users.map((item) => (
                                <MenuItem key={item.id} value={item.first_name}>
                                    {item.first_name}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>

                <ThemeProvider theme={theme}>
                    <Button type="submit">Добавить</Button>
                </ThemeProvider>
            </form>
        </div>
    );
};

export { AddComplaints };
