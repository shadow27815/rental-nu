import axios from 'axios';

const API_URL = process.env.REACT_APP_API || 'http://localhost:5000/api'; // Ensure the API URL is correct

export const fetchTenants = async () => {
    try {
        const response = await axios.get(`${API_URL}/tenants`);
        return response;
    } catch (error) {
        console.error('Error fetching tenants', error);
        throw error;
    }
};

export const deleteTenant = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/tenant/${id}`);
        return response;
    } catch (error) {
        console.error('Error deleting tenant', error);
        throw error;
    }
};

export const updateTenant = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/tenant/${id}`, data);
        return response;
    } catch (error) {
        console.error('Error updating tenant', error);
        throw error;
    }
};

export const updateTenantStatus = async (id, status) => {
    try {
        const response = await axios.put(`${API_URL}/tenant/${id}/status`, { status });
        return response;
    } catch (error) {
        console.error('Error updating tenant status', error);
        throw error;
    }
};
