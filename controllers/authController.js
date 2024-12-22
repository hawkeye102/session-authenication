const User = require('../models/user'); // Ensure this points to your User model

// Login Controller
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Log the incoming request body for debugging
        console.log('Request Body:', req.body);

        // Find user in the database
        const user = await User.findOne({ username });

        // Log the user object for debugging
        console.log('User Found:', user);

        // Check if user exists and password matches
        if (!user) {
            console.log("User not found");
            return res.status(401).send("Invalid credentials");
        }
        if (user.password !== password) {
            console.log("Password mismatch");
            return res.status(401).send("Invalid credentials");
        }
        

        // Save the user ID in the session
        req.session.userId = user._id;

          // Log the session to check if session data is set
    console.log('Session after login:', req.session);


        // Respond with success
        res.status(200).send('Logged in successfully');
    } catch (error) {
        // Log any errors
        console.error('Error during login:', error);
        res.status(500).send('Internal server error');
    }
};

// Logout Controller
const logoutUser = (req, res) => {
    try {
        // Check if a session exists
        if (!req.session) {
            return res.status(400).send('No active session to log out');
        }

        // Destroy the session
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).send('Error logging out');
            }

            console.log('Session successfully destroyed');
            res.clearCookie('connect.sid'); // Clear the session cookie
            res.status(200).send('Logged out successfully');
        });
    } catch (error) {
        // Log any errors
        console.error('Error during logout:', error);
        res.status(500).send('Internal server error');
    }
};


module.exports = { loginUser, logoutUser };

