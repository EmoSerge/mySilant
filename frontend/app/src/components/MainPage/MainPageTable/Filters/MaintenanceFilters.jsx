import { useMediaQuery, useTheme } from "@mui/material";
import * as React from "react";

const MaintenanceFilters = () => {
    const queryTheme = useTheme();
    const query_md = useMediaQuery(queryTheme.breakpoints.down("md"));
    function filter(id, item) {
        let _item = document.getElementById(item).value;
        const tbody = document.querySelector("tbody");
        const tr = tbody.querySelectorAll("tr");

        for (let index = 1; index < tr.length; index++) {
            const element =
                tr[index]
                    .querySelectorAll("td")
                    [id].textContent.toLowerCase() ||
                tr[index]
                    .querySelectorAll("td")
                    [id].querySelector("a")
                    .textContent.toLowerCase();

            if (!element.includes(_item.toLowerCase())) {
                tr[index].style.display = "none";
            } else {
                tr[index].style.display = "table-row";
            }
        }
    }

    function clearOtherInputs() {
        const inputs = document.querySelectorAll("input");
        inputs.forEach((item) => {
            item.value = "";
        });
    }
    return (
        <div
            style={{
                display: "flex",
                flexDirection: query_md ? "column" : "row",
                justifyContent: "space-evenly",
            }}
        >
            <label>
                Зав № техники
                <br />
                <input
                    type="text"
                    placeholder="техника"
                    id={"machine"}
                    onClick={() => {
                        clearOtherInputs();
                    }}
                    onChange={() => {
                        filter("1", "machine");
                    }}
                    style={{ margin: "10px 0", width: "100%" }}
                />
            </label>
            <label>
                Вид ТО
                <br />
                <input
                    type="text"
                    placeholder="ТО"
                    id={"TO"}
                    onClick={() => {
                        clearOtherInputs();
                    }}
                    onChange={() => {
                        filter("2", "TO");
                    }}
                    style={{ margin: "10px 0", width: "100%" }}
                />
            </label>
            <label>
                Сервисная компания
                <br />
                <input
                    type="text"
                    placeholder="Сервисная компания"
                    id={"serviceCompany"}
                    onClick={() => {
                        clearOtherInputs();
                    }}
                    onChange={() => {
                        filter("7", "serviceCompany");
                    }}
                    style={{ margin: "10px 0", width: "100%" }}
                />
            </label>
        </div>
    );
};

export { MaintenanceFilters };
