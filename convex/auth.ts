import { convexAuth } from '@convex-dev/auth/server'
import Github from '@auth/core/providers/github'
export const { auth, isAuthenticated, signIn, signOut, store } = convexAuth({ providers: [Github] })