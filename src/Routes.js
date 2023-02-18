import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Components/Layout";
import Auth from "./pages/Auth";

const routes =
    createBrowserRouter(
        [
            {
                path: '/',
                element: <Layout />,
                children: [
                    { index: true, element: <Home /> }
                ]
            },

            {
                path: '/login',
                element: <Auth type="login" />,
            }
            , {
                path: '/register',
                element: <Auth type="register" />
            }
            ,

        ]


    )


export default routes;