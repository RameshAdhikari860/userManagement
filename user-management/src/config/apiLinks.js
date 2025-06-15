const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export const API_LINKS = {
    // Auth Routes
    LOGIN: `${BASE_URL}/auth/login`,
    FORGOT_PASSWORD: `${BASE_URL}/auth/forgotPassword`,
    LOGOUT: `${BASE_URL}/auth/logout`,

    // Admin Routes
    GET_ALL_USERS: `${BASE_URL}/admin/getAllUser`,
    GET_ALL_ROLES: `${BASE_URL}/admin/getAllRoles`,
    GET_USER: (id) => `${BASE_URL}/admin/getUser/${id}`,
    CREATE_ROLE: `${BASE_URL}/admin/role`,
    CREATE_USER: `${BASE_URL}/admin/user`,
    UPDATE_USER: (id) => `${BASE_URL}/admin/updateUser/${id}`,

    // Customer Routes
    GET_ALL_CUSTOMER: `${BASE_URL}/customer/getAllCustomer`,
    GET_CUSTOMER_BY_ID: (id) => `${BASE_URL}/customer/getCustomerById/${id}`,
    CREATE_CUSTOMER: `${BASE_URL}/customer`,
    UPDATE_CUSTOMER: (id) => `${BASE_URL}/customer/updateCustomer/${id}`,

    // User Routes
    CREATE_DM_REPORT: `${BASE_URL}/user/dmReport`,
    CREATE_USER_REPORT: `${BASE_URL}/user/userReport`,
    UPDATE_USER_REPORT: `${BASE_URL}/user/userUpdate`,
    UPDATE_DM_REPORT: (id) => `${BASE_URL}/user/updateDmReport/${id}`,
    // Fetch / GET Routes
    // Fetch / GET Routes
    GET_REPORT_BY_ID: `${BASE_URL}/user/reportById`,
    GET_REPORT_BY_USER: (userId) => `${BASE_URL}/user/reportByUser/${userId}`,
    GET_ALL_USER_REPORT: `${BASE_URL}/user/allUserReport`,
    GET_ALL_DM_REPORT: `${BASE_URL}/user/allDmReport`,
    GET_DM_REPORT_BY_ID: (id) => `${BASE_URL}/user/dmReportById/${id}`,
    GET_lATEST_DM_REPORT: `${BASE_URL}/user/getLatestDmReport`


};

export default API_LINKS;
