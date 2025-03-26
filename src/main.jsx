import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { FilterProvider } from "./store/context.jsx";
import { AuthProvider } from "./store/authContext.jsx";
import { HelmetProvider } from "react-helmet-async"; // Import HelmetProvider
import "./i18n.jsx";

createRoot(document.getElementById("root")).render(
  <HelmetProvider> 
    <AuthProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </AuthProvider>
  </HelmetProvider>
  // <StrictMode>

  // </StrictMode>
);
