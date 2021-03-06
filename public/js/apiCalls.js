const API_URL = "http://127.0.0.1:8000";

/* get data from database */
export const getDataFromDb = async (endpoint) => {
  const url = `${API_URL}/${endpoint}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

/* Post data to database */
// const postDataToDb = async (endpoint, data, errMsg = null) => {
//   const url = `${API_URL}/${endpoint}`;
//   const optionObj = {
//     method: 'POST',
//     body: JSON.stringify(data),
//     headers: { 'Content-Type': 'application/json' },
//   };
//   try{
//     const res = await fetch(url, optionObj);
//     if(!res.ok) throw Error('Please Reload the app...');
//   } catch (err) {
//     errMsg = err.message
//   } finally {
//     return errMsg
//   }
// };

export const postDataToDb = async (endpoint, data) => {
  const url = `${API_URL}/${endpoint}`;
  const optionObj = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  const res = await fetch(url, optionObj);
  return await res.json();
};

/* Update Data in databse */
export const updateDataInDb = async (endpoint, data) => {
  const url = `${API_URL}/${endpoint}`;
  const optionObj = {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  const res = await fetch(url, optionObj);
  return res;
};

/* Replace Data in database */
export const replaceDataInDb = async (endpoint, data) => {
  const url = `${API_URL}/${endpoint}`;
  const optionObj = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  await fetch(url, optionObj);
};

/* Delete data from db */
export const deleteDataFromDb = async (endpoint) => {
  const url = `${API_URL}/${endpoint}`;
  const optionObj = { method: "DELETE" };
  await fetch(url, optionObj);
};
