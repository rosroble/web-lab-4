const restApiServerUrl = "http://localhost:8080";
const registerUrl =  restApiServerUrl + "/auth/register";
const loginUrl = restApiServerUrl + "/auth/login";



export function register(user, onOK, onErr) {
    credentialsRequest(registerUrl, user, onOK, onErr);
}

export function login(user, onOK, onErr) {
    credentialsRequest(loginUrl, user, onOK, onErr);
}

function credentialsRequest(url, user, onOK, onErr) {
    fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(onOK)
        .catch(onErr);
}