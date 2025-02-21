import rateLimit from 'express-rate-limit';
export const createRateLimiter = (windowMs, maxRequests, message) => {
    return rateLimit({
        windowMs,
        max: maxRequests,
        message:{
            status: false,
            message,
            data: null,           
        },
        standardHeaders: true,    
        legacyHeaders: false  
    });
}