import express from 'express'
import { renderPage } from 'vite-plugin-ssr/server'
import path from 'path';
import { fileURLToPath } from 'url';

const isProduction = process.env.NODE_ENV === 'production'
console.log(process.env.NODE_ENV)

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const root = `${__dirname}/..`

// Load server build, see https://github.com/brillout/vite-plugin-import-build#manual-import
import '../../dist/frontend/server/importBuild.cjs'

startServer()

async function startServer() {
  // Create an Express.js server
  const app = express()

  // Vite integration
  if (!isProduction) {
    // We instantiate Vite's development server and integrate its middleware to our server.
    // ⚠️ We instantiate it only in development. (It isn't needed in production and it
    // would unnecessarily bloat our server in production.)
    const vite = await import('vite')
    const viteDevMiddleware = (await vite.createServer({
      root,
      server: { middlewareMode: true }
    })).middlewares
    app.use(viteDevMiddleware)
  } else {
    // In production, we need to serve our static assets ourselves.
    // (In dev, Vite's middleware serves our static assets.)
    app.use(express.static(`${root}/dist/assets`))
  }

  // ...
  // Other middlewares (e.g. some RPC middleware such as Telefunc)
  // ...

  // Vite-plugin-ssr middleware. It should always be our last middleware (because it's a
  // catch-all middleware superseding any middleware placed after it).
  app.get('*', async (req, res, next) => {
    const pageContextInit = { urlOriginal: req.originalUrl }
    const pageContext = await renderPage(pageContextInit)
    if (pageContext.httpResponse === null) return next()
    const { body, statusCode, contentType } = pageContext.httpResponse
    res.status(statusCode).type(contentType).send(body)
  })

  const port = 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}