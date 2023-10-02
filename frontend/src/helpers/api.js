import axios from "axios";
import Cookies from 'js-cookie'; // Importing js-cookie

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class JoblyApi {
  // The token for interacting with the API will be stored here.
  static token = Cookies.get('token');

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get") ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response ? err.response.data.error.message : "API Error";
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getCompanies() {
    let res = await this.request(`companies`);
    return res.companies;
  }

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  static async getJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }

  static async getJobsByCompany(handle) {
    let res = await this.request(`companies/${handle}/jobs`);
    return res.jobs;
  }

  static async login(credentials) {
    if (!credentials.username || !credentials.password) {
      console.error("Missing username or password in credentials:", credentials);
      throw new Error("Missing username or password");
    }
  
    console.log("Sending credentials:", credentials);
    let res = await this.request(`auth/token`, credentials, "post");
    JoblyApi.token = res.token;
    Cookies.set('token', res.token); // Set the token using js-cookie
    return res.token;
  }

  static async register(userData) {
    let res = await this.request(`auth/register`, userData, "post");
    JoblyApi.token = res.token;
    Cookies.set('token', res.token); // Set the token using js-cookie
    return res.token;
  }


  static async getProfile(username) {
    // Check if username is provided
    if (!username) {
        console.error("Username is required to fetch profile.");
        throw new Error("Username is required");
    }

    console.log("Fetching profile for:", username);
    try {
        let res = await this.request(`users/${username}`);
        return res.user;
    } catch (error) {
        console.error("Profile fetch error:", error);
        throw error;
    }
  } 

  static async updateProfile(userData) {
    // Use the username from userData to form the correct endpoint URL
    let res = await this.request(`users/${userData.username}`, userData, "patch");
    return res.user;
}

  // ... add more methods as needed ...
}


export default JoblyApi;
