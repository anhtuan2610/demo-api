import { restApi } from "./lib.js";

export const getTasks = async (url, method) => {
    try {
        const response = await restApi({ url, method });
        return response;
    } catch (error) {
        console.log("🚀 ~ getTasks ~ error:", error);
    }
}

export const createTask = async (url, method, body) => {
    try {
        const response = await restApi({ url, method, body });
    } catch (error) {
        console.log("🚀 ~ createTask ~ error:", error);
    }
}

export const updateTask = async (url, method, body) => {
    try {
        const response = await restApi({ url, method, body });
    } catch (error) {
        console.log("🚀 ~ updateTask ~ error:", error);
    }
}

export const deleteTask = async (url, method, body) => {
    try {
        const response = await restApi({ url, method, body });
    } catch (error) {
        console.log("🚀 ~ updateTask ~ error:", error);
    }
}


// export const createTasks = await restApi(url, method, body)
