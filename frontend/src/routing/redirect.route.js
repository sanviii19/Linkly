import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import RedirectPage from "../pages/RedirectPage";

export const redirectRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/$shortUrl',
    component: RedirectPage
});
