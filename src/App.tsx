import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./routes/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
          }}
        />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
