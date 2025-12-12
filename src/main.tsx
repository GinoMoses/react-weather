import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Bookmarks from "./pages/Bookmarks";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import { ThemeProvider } from "./components/ThemeProvider";
import "./i18n";

let router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/bookmarks",
                element: <Bookmarks />,
            },
            {
                path: "/about",
                element: <About />,
            },
        ],
    },
]);

const rootElement = document.getElementById("root");

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <React.StrictMode>
                <RouterProvider router={router} />
            </React.StrictMode>
        </ThemeProvider>
    );
}

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />

//   </StrictMode>,
// )
