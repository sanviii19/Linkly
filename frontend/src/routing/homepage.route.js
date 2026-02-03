import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./root.route"
import HomePage from "../pages/HomePage"
import { checkAuthSilent } from "../utils/helper"

export const homePageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
  beforeLoad: checkAuthSilent,
})