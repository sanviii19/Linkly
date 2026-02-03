import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./root.route"
import LinkNotActive from "../pages/LinkNotActive"

export const linkNotActiveRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/link-not-active',
    component: LinkNotActive,
})
