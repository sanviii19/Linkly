import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./root.route"
import AuthPage from "../pages/AuthPage"

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: AuthPage,
  validateSearch: (search) => {
    return {
      mode: search.mode || 'login'
    }
  }
})