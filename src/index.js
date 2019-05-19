const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });
const createServer = require('./createServer');
const db = require('./db');

const { engine, server } = createServer();
const port = parseInt(process.env.PORT, 10) || 4000;

server.express.use(cookieParser());
// decode the JWT so we can get the user Id on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put the userId onto the req for future requests to access
    req.userId = userId;
  }
  next();
});

// 2. Create a middleware that populates the user on each request

server.express.use(async (req, res, next) => {
  // if they aren't logged in, skip this
  if (!req.userId) return next();
  const user = await db.query.user(
    { where: { id: req.userId } },
    '{ id, permissions, email, name }'
  );
  req.user = user;
  next();
});

 const httpServer = server.createHttpServer({
   tracing: true,
   cacheControl: true,
   cors: {
     origin: process.env.FRONTEND_URL,
     credentials: true
   }
 });
engine.listen(
  {
    port,
    httpServer,
    graphqlPaths: ['/']
  },
  () =>
    console.log(
      `Server with Apollo Engine is running on http://localhost:${port}`
    )
);