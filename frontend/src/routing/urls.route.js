import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import UrlsPage from "../pages/UrlsPage";

export const urlsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/urls',
    component: UrlsPage
})
