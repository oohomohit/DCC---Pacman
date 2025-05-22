// Authentication utility functions

/**
 * Get the authentication token from localStorage
 * @returns {string|null} The authentication token or null if not found
 */
export const getToken = () => {
    return localStorage.getItem('token');
};

/**
 * Set the authentication token in localStorage
 * @param {string} token - The token to store
 */
export const setToken = (token) => {
    localStorage.setItem('token', token);
};

/**
 * Remove the authentication token from localStorage
 */
export const removeToken = () => {
    localStorage.removeItem('token');
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if user has a token, false otherwise
 */
export const isAuthenticated = () => {
    return !!getToken();
}; 