import axios from 'axios';

const API_URL = 'http://localhost:6565';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add the updateUserProfile function
export const updateUserProfile = async (userData) => {
  try {
    const response = await api.put('/api/auth/profile', userData);
    return response.data.user;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAllProblems = async () => {
  try {
    const response = await api.get('/api/problems/');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getProblemById = async (problemId) => {
  try {
    const response = await api.get(`/api/problems/${problemId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export const generateAIResponse = async (prompt) => {
  try {
    const response = await api.post('/api/ai/', { prompt });
    // console.log(response.data);
    return response.data.response;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAlluser = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/api/auth/alluser?page=${page}&limit=${limit}`);

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/api/auth/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}
export const getAllSubmission = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/api/submissions/all?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


export const createSubmission = async (submissionData) => {
  try {
    const response = await api.post('/api/submissions/', submissionData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createProblem = async (problemData) => {
  try {
    const response = await api.post('/api/problems/', problemData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

// export const getAllSubmission = async () =>{
//   try {
//     const response = await api.get('/api/submissions/getall')
//     console.log(response.data)
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error;
//   }
// };


export const getUserSubmissions = async () => {
  try {
    const response = await api.get('/api/submissions/user');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


export const deleteProblem = async (problemId) => {
  try {
    const response = await api.delete(`/api/problems/${problemId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export const updateProblem = async (problemId, problemData) => {
  try {
    const response = await api.put(`/api/problems/${problemId}`, problemData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export default api; 