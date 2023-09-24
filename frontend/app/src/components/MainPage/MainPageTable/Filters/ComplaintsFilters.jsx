import { useMediaQuery, useTheme } from "@mui/material";
import * as React from "react";

const ComplaintsFilters = () => {
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
        <div style={{ display: "flex", flexDirection: query_md ? "column" : "row", justifyContent: "space-evenly" }}>
            <label>
                Узел отказа
                <br />
                <input
                    type="text"
                    placeholder="Узел отказа"
                    id={"nodeOfFailure"}
                    onClick={() => {
                        clearOtherInputs();
                    }}
                    onChange={() => {
                        filter("4", "nodeOfFailure");
                    }}
                    style={{ margin: "10px 0", width: "100%" }}
                />
            </label>
            <label>
                Способ Восстановления
                <br />
                <input
                    type="text"
                    placeholder="Способ Восстановления"
                    id={"recoveryMethod"}
                    onClick={() => {
                        clearOtherInputs();
                    }}
                    onChange={() => {
                        filter("6", "recoveryMethod");
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
                        filter("10", "serviceCompany");
                    }}
                    style={{ margin: "10px 0", width: "100%" }}
                />
            </label>
        </div>
    );
};

export { ComplaintsFilters };
