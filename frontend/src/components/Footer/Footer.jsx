import * as React from "react";

const Footer = () => {
    return (
        <>
            <div style={{height: '81px'}}></div>
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
                        justifyContent: "space-evenly", margin: '0 auto'
                    }}
                >
                    <p>+7-8352-20-12-09, telegram </p>
                    <p>Мой Силант 2023</p>
                </div>
            </div>
        </>
    );
};

export { Footer };
