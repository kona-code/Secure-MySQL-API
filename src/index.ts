import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// configuration from .env, replace manually if needed 
const API_KEY = process.env.API_KEY;
const pool = createPool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

app.use(express.json());

// API key authentication
const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const apiKey = req.headers['x-api-key'] as string;
    if (apiKey !== API_KEY) {
        res.status(401).json({ error: 'Unauthorized. Invalid API key.' });
    } else {
        next();
    }
};

// uncomment to enable rate limiting for requests
/*
import rateLimit from 'express-rate-limit';
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: { error: 'Too many requests, please try again later.' },
});
app.use(limiter);
//*/

const isSelectQuery = (query: string): boolean => {
    const lowerCaseQuery = query.trim().toLowerCase();
    return lowerCaseQuery.startsWith('select');
};

// uncomment to enable sensitive data masking (e.g., passwords)
/*
const maskSensitiveData = (rows: any[]): any[] => {
    return rows.map(row => {
        if (row.password) {
            row.password = '******'; // mask password field
        }
        return row;
    });
};
//*/

const executeQuery = async (query: string, params: any[] = []): Promise<any> => {
    try {
        const [rows] = await pool.query(query, params);
        return rows;
    } catch (error: any) {
        console.error('[API] Database error:', error.message);

        // uncomment to enable error monitoring (e.g., Sentry)
        /*
        import * as Sentry from '@sentry/node';
        Sentry.init({ dsn: 'your-dsn' });
        Sentry.captureException(error);
        //*/

        throw new Error('Database query failed.');
    }
};

// POST endpoint for querying the database
app.post('/query', authenticate, async (req: Request, res: Response): Promise<void> => {
    const { query, email } = req.body;

    console.log('[API] Received payload:', req.body);

    if (!query || !isSelectQuery(query)) {
        console.warn('[API] Invalid query detected:', query);

        // uncomment to enable IP blocking for repeated invalid queries
        /*
        import ipBlocker from 'your-ip-blocking-library';
        ipBlocker.block(req.ip);
        //*/

        res.status(400).json({ error: 'Only SELECT queries are allowed.' });
        return;
    }

    try {
        const params = email ? [email] : [];
        const rows = await executeQuery(query, params);

        // uncomment to enable sensitive data masking
        /*
        const maskedRows = maskSensitiveData(rows);
        res.json(maskedRows);
        //*/

        res.json(rows); // Default: Respond with unmasked rows
    } catch (error: any) {
        console.error('[API] Database error:', error.message);

        // uncomment to enable IP rate limiting on repeated errors
        /*
        import rateLimiter from 'your-rate-limiting-library';
        rateLimiter.limit(req.ip);
        //*/

        res.status(500).json({ error: 'Database query failed.' });
    }
});

// uncomment to enable HTTPS in production
/*
import https from 'https';
import fs from 'fs';
const httpsOptions = {
    key: fs.readFileSync('path/to/ssl/private.key'),
    cert: fs.readFileSync('path/to/ssl/certificate.crt'),
};
https.createServer(httpsOptions, app).listen(port, () => {
    console.log(`[NightVoid ID] Secure MySQL bridge API running on port ${port}`);
});
//*/

// Start the API server (default HTTP)
app.listen(port, () => {
    console.log(`[API] MySQL bridge API running on port ${port}`);
});





// Developed by Kona Code, licensed under the MIT License.
// Links: 
// NightVoid Entertainment: https://nightvoid.com/
// Kona Code: https://konacode.com/
// Contact me: kona@nightvoid.com
