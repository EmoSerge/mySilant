import * as React from "react";

const Footer = () => {
    return (
        <>
            <div style={{height: '50px'}}></div>

            <div
                style={{
                    position: "fixed",
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    padding: '15px 0',
                    borderTop: '1px solid var(--bg_color)',
                    backgroundColor: "var(--main_color)",
                    color: "var(--bg_color)",

                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        margin: '0 auto',
                        alignItems: "center"
                    }}
                >

                    <p ><a style={{
                        color: "white"
                    }}
                           href="tel:+7-(8352)-20-12-00">+7-(8352)-20-12-00</a>
                    </p>
                    <p>
                    <a href="https://t.me/chzsa21">
                        <img
                            src="http://127.0.0.1:8000/static/images/telegram.svg"
                            alt="Logo"
                            style={{ width: "50px" }}
                        />
                    </a>
                    </p>
                    <p>
                        <a href="/">
                            <img
                                src="http://127.0.0.1:8000/static/images/footlogo.svg"
                                alt="Logo"
                                style={{ width: "300px" }}
                            />
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};

export { Footer };
