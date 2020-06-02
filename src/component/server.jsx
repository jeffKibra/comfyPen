import db from "./dbaccess";

export default async function Fetcher(data, method) {
  console.log(data);
  const response = await realFetcher(data, method);
  console.log(response);
  if (response.value === "expired") {
    const refreshResponse = await refreshToken();
    console.log(refreshResponse);

    const fetch2 = await db.users.clear().then(() => {
      return db.users.add(refreshResponse).then(() => {
        if (refreshResponse.accessToken !== "") {
          return realFetcher(data, method);
        } else {
          return { value: false };
        }
      });
    });
    console.log(fetch2);
    return fetch2;
  } else {
    console.log(response);
    return response;
  }
}

function refreshToken() {
  return fetch(`/api/stylus`, {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
    }),
    credentials: "include",
  }).then((res) => res.json());
}

function realFetcher(data, method) {
  return db.users.toArray().then((val) => {
    console.log(val);
    let complex = {};
    if (
      data.submit === "LOGIN" ||
      data.submit === "SIGNUP" ||
      data.submit === "EMAIL"
    ) {
      complex = {
        headers: new Headers({
          "content-type": "application/json",
        }),
        credentials: "include",
      };
    } else {
      complex = {
        headers: new Headers({
          "content-type": "application/json",
          Authorization: "Bearer " + val[0].accessToken,
        }),
      };
    }

    return fetch(`http://localhost:5000/api/${data.submit}`, {
      method,
      ...complex,
      body: JSON.stringify(data),
    }).then((res) => {
      const ves = res.clone();
      res.text().then((val) => {
        console.log(val);
      });
      return ves.json();
    });
  });
}
