const API_URL = "http://localhost:5432/api";

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const token = await response.json();
    console.log("this is token in registerUser", token);
    return token.token;
  } catch (error) {
    console.error(error);
  }
};

export const LoginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const token = await response.json();
    return token.token;
  } catch (error) {
    console.error(error);
  }
};

export const fetchMe = async (token) => {
  console.log("this is fetchme token", token);
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("this is data in fetchme", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};