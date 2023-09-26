import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { MainPage } from "./components/MainPage/MainPage";
import { Login } from "./components/Login/Login";
import { Logout } from "./components/Logout/Logout";
import { MachineDetailPage } from "./components/MachineDetailPage/MachineDetailPage";
import { Handbook } from "./components/Handbook/Handbook";
import { DataInsertPage } from "./components/DataInsertPage/DataInsertPage";
import { ProtectedRoutes } from "./components/ProtectedRoutes/ProtectedRoutes";

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route element={<ProtectedRoutes />}>
                    <Route path="/logout/" element={<Logout />} />
                    <Route path="/datainsert/:type/" element={<DataInsertPage />} />
                    <Route path="/machine/:id/" element={<MachineDetailPage />} />
                    <Route path="/machinelist/:machinelist/" element={<Handbook />}/>
                    <Route path="/engine/:engine/" element={<Handbook />} />
                    <Route path="/transmission/:transmission/" element={<Handbook />}/>
                    <Route path="/mainaxle/:mainaxle/" element={<Handbook />}/>
                    <Route path="/steeringaxle/:steeringaxle/" element={<Handbook />} />
                    <Route path="/client/:client/" element={<Handbook />} />
                    <Route path="/consumer/:consumer/" element={<Handbook />} />
                    <Route path="/serviceCompany/:servicecompany/" element={<Handbook />} />
                    <Route path="/maintenance/:maintenance/" element={<Handbook />} />
                    <Route path="/typeoffailure/:nodeoffailure/" element={<Handbook />}  />
                    <Route path="/recoverymethod/:recoverymethod/" element={<Handbook />} />
                </Route>
                <Route path="/" element={<MainPage />} />
                <Route path="/login/" element={<Login />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
