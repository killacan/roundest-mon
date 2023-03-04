import * as trpcNext from '@trpc/server/adapters/next';
// import { appRouter } from '../../../backend/router/_app';
import { appRouter } from '../../../backend/router/index'

// export API handler
// @see https://trpc.io/docs/api-handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});