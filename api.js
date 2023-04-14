const API_URL = "/studyPlans";

async function apiRequest(method, url, data) {
    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const result = await response.json();
    return result;
}

export async function createStudyForm(studyForm) {
    const response = await apiRequest(
        "POST",
        API_URL + "/studyForm",
        studyForm
    );
    if (response) {
        return response;
    } else {
        throw new Error("Failed to create study form");
    }
}

export async function getAllStudyForms() {
    const response = await apiRequest("GET", API_URL + "/studyForm");
    if (response) {
        return response;
    } else {
        throw new Error("Failed to fetch study forms");
    }
}
