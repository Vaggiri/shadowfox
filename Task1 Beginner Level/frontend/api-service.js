// API Service to replace localStorage-based data-store.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

class APIService {
    constructor() {
        this.token = localStorage.getItem('auth_token');
    }

    // Helper method to get auth headers
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json'
        };
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        return headers;
    }

    // Authentication
    async login(username, password) {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
            this.token = data.token;
            localStorage.setItem('auth_token', data.token);
        }
        return data;
    }

    async logout() {
        this.token = null;
        localStorage.removeItem('auth_token');
    }

    async isAuthenticated() {
        if (!this.token) return false;

        const response = await fetch(`${API_BASE_URL}/auth/verify`, {
            headers: this.getHeaders()
        });
        const data = await response.json();
        return data.valid;
    }

    // Profile
    async getProfile() {
        const response = await fetch(`${API_BASE_URL}/profile`);
        return await response.json();
    }

    async updateProfile(profileData) {
        const response = await fetch(`${API_BASE_URL}/profile`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(profileData)
        });
        return await response.json();
    }

    // Posts
    async getPosts() {
        const response = await fetch(`${API_BASE_URL}/posts`);
        return await response.json();
    }

    async createPost(postData) {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(postData)
        });
        return await response.json();
    }

    async updatePost(id, postData) {
        const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(postData)
        });
        return await response.json();
    }

    async deletePost(id) {
        const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });
        return await response.json();
    }

    // Comments
    async getComments(postId) {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
        return await response.json();
    }

    async addComment(postId, commentData) {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commentData)
        });
        return await response.json();
    }

    async deleteComment(postId, commentId) {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments/${commentId}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });
        return await response.json();
    }

    // Likes
    async getLikes(postId) {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}/likes`);
        return await response.json();
    }

    async toggleLike(postId, userId) {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}/like`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId })
        });
        return await response.json();
    }

    // Skills
    async getSkills() {
        const response = await fetch(`${API_BASE_URL}/skills`);
        return await response.json();
    }

    async addSkill(skillData) {
        const response = await fetch(`${API_BASE_URL}/skills`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(skillData)
        });
        return await response.json();
    }

    async updateSkill(id, skillData) {
        const response = await fetch(`${API_BASE_URL}/skills/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(skillData)
        });
        return await response.json();
    }

    async deleteSkill(id) {
        const response = await fetch(`${API_BASE_URL}/skills/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });
        return await response.json();
    }

    // Projects
    async getProjects() {
        const response = await fetch(`${API_BASE_URL}/projects`);
        return await response.json();
    }

    async addProject(projectData) {
        const response = await fetch(`${API_BASE_URL}/projects`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(projectData)
        });
        return await response.json();
    }

    async updateProject(id, projectData) {
        const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(projectData)
        });
        return await response.json();
    }

    async deleteProject(id) {
        const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });
        return await response.json();
    }

    // Certifications
    async getCertifications() {
        const response = await fetch(`${API_BASE_URL}/certifications`);
        return await response.json();
    }

    async addCertification(certData) {
        const response = await fetch(`${API_BASE_URL}/certifications`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(certData)
        });
        return await response.json();
    }

    async updateCertification(id, certData) {
        const response = await fetch(`${API_BASE_URL}/certifications/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(certData)
        });
        return await response.json();
    }

    async deleteCertification(id) {
        const response = await fetch(`${API_BASE_URL}/certifications/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });
        return await response.json();
    }

    // Experience
    async getExperience() {
        const response = await fetch(`${API_BASE_URL}/experience`);
        return await response.json();
    }

    async addExperience(expData) {
        const response = await fetch(`${API_BASE_URL}/experience`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(expData)
        });
        return await response.json();
    }

    async updateExperience(id, expData) {
        const response = await fetch(`${API_BASE_URL}/experience/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(expData)
        });
        return await response.json();
    }

    async deleteExperience(id) {
        const response = await fetch(`${API_BASE_URL}/experience/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });
        return await response.json();
    }

    // Education
    async getEducation() {
        const response = await fetch(`${API_BASE_URL}/education`);
        return await response.json();
    }

    async addEducation(eduData) {
        const response = await fetch(`${API_BASE_URL}/education`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(eduData)
        });
        return await response.json();
    }

    async updateEducation(id, eduData) {
        const response = await fetch(`${API_BASE_URL}/education/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(eduData)
        });
        return await response.json();
    }

    async deleteEducation(id) {
        const response = await fetch(`${API_BASE_URL}/education/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });
        return await response.json();
    }

    // Analytics
    async getAnalytics() {
        const response = await fetch(`${API_BASE_URL}/analytics`);
        return await response.json();
    }

    async incrementProfileViews() {
        const response = await fetch(`${API_BASE_URL}/analytics/profile-view`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        return await response.json();
    }
}

// Export singleton instance
const apiService = new APIService();
export default apiService;
