const session = require('express-session');
const MongoStore = require('connect-mongo');

console.log('SESSION_SECRET:', process.env.SESSION_SECRET);


const sessionMiddleware = session({
    secret: "some secret" || 'fallback key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/sessiondb', // Ensure this matches your .env value
    }),
    cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour
        secure: false, // Must be false for HTTP connections
        httpOnly: true,
        sameSite: 'lax',
    }
    
});



module.exports = sessionMiddleware;
