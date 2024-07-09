export function $(id) {
    return document.getElementById(id);
}

export function $$(selector) {
    return document.querySelectorAll(selector);
}

export const restApi = async ({ url, method, body }) => {
    try {
        const response = await fetch(url, {
            method: method,
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("🚀 ~ restApi ~ error:", error);
    }
}