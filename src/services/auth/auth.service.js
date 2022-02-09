export const loginRequest = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        //send fetch request to server
        fetch('https://www.express-systems.net/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(response => response.json())
            .then(res => {
                if (res.status == "error") {
                    reject(res.message);
                } else {
                    resolve(res);
                }
            })
            .catch(error => {
                reject("Something went wrong. Please try again later.");
            }
            )
    });
};