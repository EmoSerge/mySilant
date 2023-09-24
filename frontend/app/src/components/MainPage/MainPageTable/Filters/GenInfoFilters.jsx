import { useMediaQuery, useTheme } from "@mui/material";
import * as React from "react";

const GenInfoFilters = () => {
    const queryTheme = useTheme();
    const query_md = useMediaQuery(queryTheme.breakpoints.down("md"));
    
    function filter(id, item) {
        let _item = document.getElementById(item).value;
        const tbody = document.querySelector("tbody");
        const tr = tbody.querySelectorAll("tr");

        for (let index = 2; index < tr.length; index++) {
            const element = tr[index]
                .querySelectorAll("td")
                [id].querySelector("a").textContent;
            if (!element.includes(_item.toUpperCase())) {
                tr[index].style.display = "none";
            } else {
                tr[index].style.display = "table-row";
            }
        }
    }

    function clearOtherInputs(id) {
        const inputs = document.querySelectorAll("input");
        
        inputs.forEach((item) => {
            if (id !== item.id) {
                item.value = null;
            }
        });
    }
    return (
        <div
            style={{
                display: "flex",
                flexDirection: query_md ? "column" : "row",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
            }}
        >
            <label>
                Модель техники
                <br />
                <input
                    type="text"
                    placeholder="техника"
                    id={"machine"}
                    onClick={(event) => {
                        clearOtherInputs(event.target.id);
                    }}
                    onChange={() => {
                        filter("1", "machine");
                    }}
                    style={{ margin: "10px 0", width: "100%" }}
                />
            </label>
            <label>
                Модель двигателя
                <br />
                <input
                    type="text"
                    placeholder="Двигатель"
                    id={"engine"}
                    onClick={(event) => {
                        clearOtherInputs(event.target.id);
                    }}
                    onChange={() => {
                        filter("3", "engine");
                    }}
                    style={{ margin: "10px 0", width: "100%" }}
                />
            </label>
            <label>
                Модель трансмиссии
                <br />
                <input
                    type="text"
                    placeholder="Трансмиссия"
                    id={"transmission"}
                    onClick={(event) => {
                        clearOtherInputs(event.target.id);
                    }}
                    onChange={() => {
                        filter("5", "transmission");
                    }}
                    style={{ margin: "10px 0", width: "100%" }}
                />
            </label>
            <label>
                Модель ведущего моста
                <br />
                <input
                    type="text"
                    placeholder="Ведущий мост"
                    id={"mainAxle"}
                    onClick={(event) => {
                        clearOtherInputs(event.target.id);
                    }}
                    onChange={() => {
                        filter("7", "mainAxle");
                    }}
                    style={{ margin: "10px 0", width: "100%" }}
                />
            </label>
            <label>
                Модель управляемого моста
                <br />
                <input
                    type="text"
                    placeholder="Управляемый мост"
                    id={"steeringAxle"}
                    onClick={(event) => {
                        clearOtherInputs(event.target.id);
                    }}
                    onChange={() => {
                        filter("9", "steeringAxle");
                    }}
                    style={{ margin: "10px 0", width: "100%" }}
                />
            </label>
        </div>
    );
};

export { GenInfoFilters };
