class AuthManager {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async login(userData) {
        try {
            const response = await fetch(`${this.baseUrl}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            if (!response.ok) throw new Error('Login failed');
            return await response.json();
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async register(userData) {
        try {
            const response = await fetch(`${this.baseUrl}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            if (!response.ok) throw new Error('Registration failed');
            return await response.json();
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    async guestLogin(guestData) {
        try {
            const response = await fetch(`${this.baseUrl}/guest`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(guestData)
            });
            if (!response.ok) throw new Error('Guest login failed');
            return await response.json();
        } catch (error) {
            console.error('Guest login error:', error);
            throw error;
        }
    }
}

export default AuthManager;