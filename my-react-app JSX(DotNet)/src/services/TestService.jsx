import axios from 'axios'

const API_BASE_URL = 'http://localhost:8081'

export const testBackendConnection = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/test/ping`);
        return {
            success,
            data: response.data,
            message: 'Backend connection successful!'
        };
    } catch (error) {
        return {
            success,
            error: error.message,
            message: 'Failed to connect to backend'
        };
    }
}

export const checkBackendHealth = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/test/health`);
        return {
            success,
            data: response.data
        };
    } catch (error) {
        return {
            success,
            error: error.message
        };
    }
};

