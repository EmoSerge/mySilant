import * as React from "react";
import { Unauthorized } from "./Unauthorized";
import { Authorized } from "./Authorized";
import { useSelector } from "react-redux";

const MainPage = () => {
    const logged = useSelector((state) => state.login);
    
    return (
        <>
            {(logged.is_Auth && logged.success) || localStorage.getItem('Authenticated')? (
                <>
                    <Authorized />
                </>
            ) : (
                <>
                    <Unauthorized />
                </>
            )}
        </>
    );
};

export { MainPage };
