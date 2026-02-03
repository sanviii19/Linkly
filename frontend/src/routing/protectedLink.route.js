import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./root.route"
import ProtectedLinkPage from "../pages/ProtectedLinkPage"

export const protectedLinkRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/protected/$shortUrl',
    component: ProtectedLinkPage,
})
