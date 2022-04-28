import cors from 'cors';
const corsMiddleware = cors({
  methods: ['GET', 'HEAD', 'OPTIONS', 'POST'],
  credentials: true,
  origin: (origin, callback) => {
    try {
      if (process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      if (typeof origin == 'string') {
        const hostname = new URL(origin)?.hostname;
        if (!hostname) {
          throw new Error();
        }
        return callback(null, true);
      } else {
        throw new Error();
      }
    } catch (err) {
      return callback(null, false);
    }
  },
});

export { corsMiddleware };
