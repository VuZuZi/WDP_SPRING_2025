const hostMiddleware = (req, res, next) => {
    const user = req.user; // Assuming req.user is set after authentication (e.g., via JWT)

    // Check if the user is authenticated and is an admin
    if (user && user.role === 'host') {
        next(); // Proceed if the user is an admin
    } else {
        res.status(403).json({ message: 'Access denied: Host only' });
    }
};

export default hostMiddleware;
