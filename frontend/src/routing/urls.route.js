import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import UrlsPage from "../pages/UrlsPage";

export const urlsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/urls',
    component: UrlsPage
})
