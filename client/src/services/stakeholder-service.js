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
  console.log("stakeholders", stakeholders);
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

export const put = async stakeholder => {
  const response = await axios.put(`${baseUrl}/${stakeholder.id}`, stakeholder);
  return response.data;
};

// id = stakeholderId, setVerified = true to verify data, false to un-verify,
// loginId is user.id of logged in user
export const verify = async (id, setVerified, loginId) => {
  const response = await axios.put(`${baseUrl}/${id}/verify`, {
    id,
    setVerified,
    loginId
  });
  return response.data;
};

// id = stakeholderId, setApproved = true to approve data, false to un-approve,
// loginId is user.id of logged in user
export const approve = async (id, setApproved, loginId) => {
  const response = await axios.put(`${baseUrl}/${id}/approve`, {
    id,
    setApproved,
    loginId
  });
  return response.data;
};

// id = stakeholderId, setAssigned = true to assign to user for verification, false to un-assigne,
// loginId is user.id of person being assigned to.
export const assign = async (id, setAssigned, loginId) => {
  const response = await axios.put(`${baseUrl}/${id}/assign`, {
    id,
    setAssigned,
    loginId
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
