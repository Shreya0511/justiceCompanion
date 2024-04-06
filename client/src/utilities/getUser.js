export const getUser = async (id) => {
  let user = {};
  const response = await fetch(
    `${process.env.REACT_APP_SERVER}/api/v1/users/getUser/` + id,
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
