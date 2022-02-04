export const loginRequest = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        // setTimeout(() => {
        //     // if (email === 'admin@gmail.com' && password === '123456') {
        //     //     resolve({
        //     //         token: 'admin-token',
        //     //         user: {
        //     //             id: 1,
        //     //             name: 'Admin',
        //     //             email: 'admin@gmail.com',
        //     //             role: 'admin'
        //     //         }
        //     //     });
        //     // } else {
        //     //     reject('Invalid email or password');
        //     // }
        // }, 1000);

        //send fetch request to server
        fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: {
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
                    const { token, user } = res.data;
                    resolve({
                        token: token,
                        user: {
                            ...res.user,
                            name: user.first_name + ' ' + user.last_name
                        }
                    });
                }
            })
            .catch(error => {
                reject("Something went wrong. Please try again later.");
            }
            )
    });
};