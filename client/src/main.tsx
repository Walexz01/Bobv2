import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ColorModeScript } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import routes from "./routes.tsx";
import theme from "./theme.ts";
import { AuthContextProvider } from "./context/Auth.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <RouterProvider router={routes} />
      </ChakraProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
