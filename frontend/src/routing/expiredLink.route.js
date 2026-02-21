import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./root.route"
import ExpiredLinkPage from "../pages/ExpiredLinkPage"

export const expiredLinkRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/link-expired',
    component: ExpiredLinkPage,
})
