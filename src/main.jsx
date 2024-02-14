import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import "@sweetalert2/themes/Bulma/Bulma.css";
import { BrowserRouter } from "react-router-dom";
import StockProvider from "./contexts/StockContext.jsx";
import AuthProvider from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <StockProvider>
          <App />
        </StockProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
