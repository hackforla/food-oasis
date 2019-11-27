import axios from "axios";

const baseUrl = "/api/stakeholders";

/* 
    searchParams is an object with any/all of the following properties:
        name - look for this string as substring of the stakeholder's name
        categoryIds - array of integers corresponding to the desired categories
        latitude
        longitude
        distance - radius around latitude and longitude
*/
export const search = async searchParams => {
  searchParams = searchParams || {};
  const response = await axios.get(baseUrl, {
    params: searchParams
  });
  let stakeholders = response.data;

  return stakeholders;
};

export const getById = async id => {
  const response = await axios.get(`${baseUrl}/${id}`);
  const stakeholder = response.data;
  return stakeholder;
};

export const post = async stakeholder => {
  const response = await axios.post(baseUrl, stakeholder);
  return response.data;
};

// edit user-created job
export const put = async stakeholder => {
  const response = await axios.put(`${baseUrl}/${stakeholder.id}`, stakeholder);
  return response.data;
};

// delete user-created job
export const remove = async id => {
  const response = await axios.post(`${baseUrl}/${id}`, {
    id
  });
  return response.data;
};
