import * as React from "react";

import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import "../../MainPage/MainPageTable/MainPageTable.css";
import { Machine } from "./Tabs/Machine";
import { Maintenance } from "./Tabs/Maintenance";
import { Complaints } from "./Tabs/Complaints";

const DetailTable = (props) => {
    
    const [value, setValue] = React.useState(0);

    const tabChange = (e, newContent) => {
        setValue(newContent);
    };

    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <div>{children}</div>
                    </Box>
                )}
            </div>
        );
    }

    CustomTabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`,
        };
    }


    return (
        <>
        <div style={{display: "flex", justifyContent: "space-evenly", margin: '30px 0'}}>
        <h3>Модель техники - {props.machine.success ? props.machine.data.machine[0].machine.modelOfMachine.title : 'Загрузка'}</h3>
        <h3>Зав. № Техники - {props.machine.success ? props.machine.data.machine[0].machine.factoryNumberOfMachine : 'Загрузка'}</h3>
        </div>
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs variant="fullWidth" value={value} onChange={tabChange}>
                    <Tab label="Общая Информация" {...a11yProps(0)} />
                    <Tab label="ТО" {...a11yProps(1)} />
                    <Tab label="Рекламация" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Machine machine={props} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Maintenance maintenance={props} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Complaints complaints={props} />
            </CustomTabPanel>
        </Box>
        </>
    );
};

export { DetailTable };
