import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { ThemeProvider } from "next-themes";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import { PublicRoute } from "./routes/PublicRoute";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import PublicDashboard from "./pages/PublicDashboard";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route index element={<Landing />} />
                        <Route
                            path="/signup"
                            element={
                                <PublicRoute>
                                    <Signup />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/signin"
                            element={
                                <PublicRoute>
                                    <Signin />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/brain/:shareLink"
                            element={ <PublicDashboard /> }
                        />
                        <Route
                            path="*"
                            element={ <NotFound /> }
                        />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
            <Toaster richColors />
        </ThemeProvider>
    );
}

export default App;
