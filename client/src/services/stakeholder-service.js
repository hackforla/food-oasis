import axios from "axios";

const baseUrl = "/api/stakeholders";

/* 
    searchParams is an object with any/all of the following properties:
        name - look for this string as substring of the stakeholder's name
        categoryIds - array of integers corresponding to the desired categories
        latitude
        longitude
*/
export const search = async searchParams => {
  searchParams = searchParams || {};
  const response = await axios.get(baseUrl, {
    params: searchParams
  });
  return response.data;
};

export const getById = async id => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export const post = async stakeholder => {
  const response = await axios.post(baseUrl, {
    stakeholder
  });
  return response.data;
};

// edit user-created job
export const put = async (stakeholder, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, {
    stakeholder,
    id
  });
  return response.data;
};

// delete user-created job
export const remove = async id => {
  const response = await axios.post(`${baseUrl}/${id}`, {
    id
  });
  return response.data;
};
