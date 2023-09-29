import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class JoblyApi {
  // The token for interacting with the API will be stored here.
  static token;

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

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get the list of all companies. */
  static async getCompanies() {
    let res = await this.request(`companies`);
    return res.companies;
  }

  /** Get details on a job by id. */
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /** Get the list of all jobs. */
  static async getJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }

  /** User login. */
  static async login(credentials) {
    let res = await this.request(`login`, credentials, "post");
    JoblyApi.token = res.token; // Set the token
    return res.token;
  }
  

  /** User registration. */
  static async register(userData) {
    let res = await this.request(`auth/register`, userData, "post"); // Updated the endpoint here
    this.token = res.token;
    localStorage.setItem('token', res.token);
    return res.token;
  }

  // ... add more methods as needed ...
}

// For now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
JoblyApi.token = localStorage.getItem('token') || null;

export default JoblyApi;
