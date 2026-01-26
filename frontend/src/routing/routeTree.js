import { createRootRoute } from "@tanstack/react-router"
import { homePageRoute } from "./homepage.route"
import { authRoute } from "./auth.route"
import { dasboardRoute } from "./dashboard.route"
import { googleCallbackRoute } from "./googleCallback.route"
import { urlsRoute } from "./urls.route"
import RootLayout from "../RootLayout"

export const rootRoute = createRootRoute({
    component: RootLayout
})

export const routeTree = rootRoute.addChildren([
    homePageRoute,
    authRoute,
    dasboardRoute,
    googleCallbackRoute,
    urlsRoute
])