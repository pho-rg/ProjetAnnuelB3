import './style/App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AdminRouter from "./components/AdminRouter";
import Login from "./pages/Login";
import {ThemeProvider} from "@mui/material";
import medicalTheme from "./medicalTheme";

function App() {
  return (
    <ThemeProvider theme={medicalTheme}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/*" element={<AdminRouter/>}/>
            </Routes>
          </BrowserRouter>
        </div>
    </ThemeProvider>
  );
}

export default App;
