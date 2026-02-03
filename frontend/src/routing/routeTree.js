import { homePageRoute } from "./homepage.route"
import { authRoute } from "./auth.route"
import { dasboardRoute } from "./dashboard.route"
import { googleCallbackRoute } from "./googleCallback.route"
import { urlsRoute } from "./urls.route"
import { protectedLinkRoute } from "./protectedLink.route"
import { rootRoute } from "./root.route"
import { linkNotActiveRoute } from "./linkNotActive.route"

// Root route definition is now in root.route.js

export const routeTree = rootRoute.addChildren([
    homePageRoute,
    authRoute,
    dasboardRoute,
    googleCallbackRoute,
    urlsRoute,
    protectedLinkRoute,
    linkNotActiveRoute
])