export const getUser = async (id) => {
    let user = {};
    const response = await fetch(
        "http://127.0.0.1:5001/api/v1/users/getUser/" + id,
        {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
        .then((response) => response.json())
        .then((data) => {
            user = data;
        });
    return user;
};