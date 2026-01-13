import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { ThemeProvider } from "next-themes";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "sonner"

function App() {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Landing />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/dashboard" element={<Dashboard />}/>
                </Routes>
            </BrowserRouter>
            <Toaster richColors/>
        </ThemeProvider>
    );
}

export default App;
