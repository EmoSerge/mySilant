import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomContainer } from "../CustomComponents/CustomContainer/CustomContainer";
import {  Input, Button, ThemeProvider } from "@mui/material";
import { theme } from "../../Theme/Theme";
import { UserLogin } from "../../Store/Slicers/AuthSlicer";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const data = useSelector((state) => state.login);

    useEffect(() => {
        if (data.is_Auth || localStorage.getItem('Authenticated')) {
            navigate("/");
        }
    }, [navigate, data.is_Auth]);

    const submit = () => {
        const username_input = document.getElementById("username").value;
        const password_input = document.getElementById("password").value;
        dispatch(
            UserLogin({ username: username_input, password: password_input })
        );
    };

    return (
        <CustomContainer>
            <form
                style={{
                    border: "1px solid var(--bg_color)",
                    padding: "30px",
                    borderRadius: "5px",
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '0 auto',
                    marginTop: "40px",
                    width: '350px'
                }}
            >
                <Input id="username" placeholder="Username" autoComplete="username" required />
                <Input
                autoComplete="current-password"
                    id="password"
                    type="password"
                    placeholder="password"
                    required
                    style={{ margin: "20px 0" }}
                />
                <ThemeProvider theme={theme}>
                    <Button
                        style={{ marginTop: "10px" }}
                        onClick={() => {
                            submit();
                        }}
                    >
                        Войти
                    </Button>
                </ThemeProvider>
            </form>
        </CustomContainer>
    );
};

export { LoginPage };
