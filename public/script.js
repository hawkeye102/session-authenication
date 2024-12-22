// DOM Elements
const loginForm = document.getElementById('login-form');
const logoutButton = document.getElementById('logout-button');
const loginSection = document.getElementById('login-section');
const logoutSection = document.getElementById('logout-section');

// API Base URL
const API_BASE = 'http://localhost:3000/auth';

// Login Form Submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include', // Send cookies with the request
        });

        if (response.ok) {
            alert('Login successful!');
            loginSection.style.display = 'none';
            logoutSection.style.display = 'block';
        } else {
            alert('Invalid credentials.');
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
});

// Logout Button Click
logoutButton.addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_BASE}/logout`, {
            method: 'GET',
            credentials: 'include', // Send cookies with the request
        });

        if (response.ok) {
            alert('Logged out successfully!');
            loginSection.style.display = 'block';
            logoutSection.style.display = 'none';
        } else {
            alert('Error during logout.');
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
});
