import * as React from "react";
import { CustomContainer } from "../CustomComponents/CustomContainer/CustomContainer";
import {
    Button,
    IconButton,
    ThemeProvider,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { theme } from "../../Theme/Theme";
import { useDispatch, useSelector } from "react-redux";
import { UserData } from "../../Store/Slicers/UserInfoSlicer";
import { logout } from "../../Store/Slicers/AuthSlicer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryTheme = useTheme();
    const query_md = useMediaQuery(queryTheme.breakpoints.down("md"));
    const userInfo = useSelector((state) => state.user);
    const logged = useSelector((state) => state.login);
    const [menuOpen, setMenuOpen] = React.useState("none");
    
    React.useEffect(() => {
        if (logged.is_Auth || localStorage.getItem("accessToken")) {
            dispatch(UserData(localStorage.getItem("accessToken")));
        }
        if (!userInfo.success && localStorage.getItem("is_Authenticated")) {
            dispatch(logout());
            navigate("/");
        }
    }, [dispatch, userInfo.success, logged, navigate]);

    const Menu = (
        <div
            style={{
                display: menuOpen,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "var(--bg_color)",
                zIndex: 1000,
            }}
        >
            <IconButton
                sx={{
                    position: "absolute",
                    top: "10px",
                    left: "16px",
                    height: "51px",
                }}
                onClick={() => {
                    setMenuOpen("none");
                }}
            >
                <CloseIcon fontSize="large" />
            </IconButton>
            <div
                style={{
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    flexDirection: "column",
                    padding: "10px 0",
                    margin: "0 auto",
                }}
            >
                <div style={{ width: "100%", textAlign: "center" }}>
                    <a href="/">
                        <img
                            src="http://127.0.0.1:8000/static/images/logo.png"
                            alt="Logo"
                            style={{ width: "150px" }}
                        />
                    </a>
                </div>

                {localStorage.getItem("Authenticated") &&
                userInfo.status !== "BAD" ? (
                    <div
                        style={{
                            columnGap: "20px",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <p style={{ fontSize: "18px" }}>
                            {!userInfo.loading && userInfo.success
                                ? userInfo.data[0].first_name
                                : "Загрузка"}{" "}
                        </p>

                        <ThemeProvider theme={theme}>
                            <Button
                                onClick={() => {
                                    setMenuOpen("none");
                                    navigate("/logout");
                                }}
                                >
                                Выйти
                            </Button>
                        </ThemeProvider>
                    </div>
                ) : (
                    <div
                        style={{
                            columnGap: "20px",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <ThemeProvider theme={theme}>
                            <Button
                                onClick={() => {
                                    setMenuOpen("none");
                                    dispatch(logout());
                                    navigate("/login");
                                }}
                            >
                                Авторизация
                            </Button>
                        </ThemeProvider>
                    </div>
                )}
                <div style={{ display: "block" }}>
                    <p>+7-8352-20-12-09, telegram</p>
                </div>
            </div>
        </div>
    );

    return (
        <CustomContainer style={{ backgroundColor: "var(--bg_color)" }}>
            {Menu}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 0",
                }}
            >
                <IconButton
                    sx={{ display: query_md ? "inline-flex" : "none" }}
                    onClick={() => {
                        setMenuOpen("flex");
                    }}
                >
                    <MenuIcon fontSize="large" />
                </IconButton>
                <div
                    style={{
                        width: query_md ? "100%" : "auto",
                        textAlign: "center",
                    }}
                >
                    <a href="/">
                        <img
                            src="http://127.0.0.1:8000/static/images/logo.png"
                            alt="Logo"
                            style={{ width: query_md ? "150px" : "300px" }}
                        />
                    </a>
                </div>
                <div style={{ display: query_md ? "none" : "block" }}>
                    <p>+7-8352-20-12-09, telegram</p>
                </div>
                {localStorage.getItem("Authenticated") &&
                userInfo.status !== "BAD" ? (
                    <div
                        style={{
                            columnGap: "20px",
                            alignItems: "center",
                            display: query_md ? "none" : "flex",
                        }}
                    >
                        <p style={{ fontSize: "18px" }}>
                            {!userInfo.loading && userInfo.success
                                ? userInfo.data[0].first_name
                                : "Загрузка"}{" "}
                        </p>

                        <ThemeProvider theme={theme}>
                            <Button
                                onClick={() => {
                                    navigate("/logout");
                                }}
                            >
                                Выйти
                            </Button>
                        </ThemeProvider>
                    </div>
                ) : (
                    <div>
                        <ThemeProvider theme={theme}>
                            <Button
                                onClick={() => {
                                    dispatch(logout());
                                    navigate("/login");
                                }}
                            >
                                Авторизация
                            </Button>
                        </ThemeProvider>
                    </div>
                )}
            </div>
        </CustomContainer>
    );
};

export { Header };
