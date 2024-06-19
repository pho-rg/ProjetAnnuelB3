import './style/App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AdminRouter from "./components/AdminRouter";
import Login from "./pages/Login";
import {ThemeProvider} from "@mui/material";
import administrationTheme from "./administrationTheme";
import AuthGuard from "./components/AuthGuard";

function App() {
  return (
    <ThemeProvider theme={administrationTheme}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/*" element={
                <AuthGuard>
                  <AdminRouter/>
                </AuthGuard>
              }/>
            </Routes>
          </BrowserRouter>
        </div>
    </ThemeProvider>
  );
}

export default App;
