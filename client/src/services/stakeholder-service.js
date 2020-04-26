import axios from "axios";
import moment from "moment";

const baseUrl = "/api/stakeholders";

const toLocalMoment = (ts) => {
  return !ts ? null : moment.utc(ts).toLocaleString();
};

/* 
    searchParams is an object with any/all of the following properties:
        name - look for this string as substring of the stakeholder's name
        categoryIds - array of integers corresponding to the desired categories
        latitude
        longitude
        distance - radius around latitude and longitude
        isAssigned - ("yes", "no", "either")
        isVerified - ("yes", "no", "either")
        isApproved - ("yes", "no", "either")
        isRejected - ("yes", "no", "either")
        isClaimed - ("yes", "no", "either")
        assignedLoginId
        claimedLoginId
*/
export const search = async (searchParams) => {
  searchParams = searchParams || {};
  const response = await axios.get(baseUrl, {
    params: searchParams,
  });
  let stakeholders = response.data.map((s) => {
    return {
      ...s,
      // createdDate: toLocalMoment(s.createdDate),
      // modifiedDate: toLocalMoment(s.modifiedDate),
      // assignedDate: toLocalMoment(s.assignedDate),
      // verifiedDate: toLocalMoment(s.verifiedDate),
      // approvedDate: toLocalMoment(s.approvedDate),
      // rejectedDate: toLocalMoment(s.rejectedDate),
      // claimedDate: toLocalMoment(s.claimedDate),
    };
  });

  console.log("stakeholders", stakeholders);
  return stakeholders;
};

export const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  const s = response.data;
  return {
    ...s,
    createdDate: toLocalMoment(s.createdDate),
    modifiedDate: toLocalMoment(s.modifiedDate),
    assignedDate: toLocalMoment(s.assignedDate),
    verifiedDate: toLocalMoment(s.verifiedDate),
    approvedDate: toLocalMoment(s.approvedDate),
    rejectedDate: toLocalMoment(s.rejectedDate),
    claimedDate: toLocalMoment(s.claimedDate),
  };
};

export const post = async (stakeholder) => {
  const response = await axios.post(baseUrl, stakeholder);
  return response.data;
};

export const put = async (stakeholder) => {
  const response = await axios.put(`${baseUrl}/${stakeholder.id}`, stakeholder);
  return response.data;
};

// id = stakeholderId, setVerified = true to verify data, false to un-verify,
// loginId is user.id of logged in user
export const verify = async (id, setVerified, loginId) => {
  const response = await axios.put(`${baseUrl}/${id}/verify`, {
    id,
    setVerified,
    loginId,
  });
  return response.data;
};

// id = stakeholderId, setVerified = true to verify data, false to un-verify,
// loginId is user.id of user being assigned to stakeholder
export const assign = async (id, setAssigned, loginId) => {
  const response = await axios.put(`${baseUrl}/${id}/assign`, {
    id,
    setAssigned,
    loginId,
  });
  return response.data;
};

// id = stakeholderId, setClaimed = true to claim data, false to un-verify,
// loginId is user.id of user that claims stakeholder
export const claim = async (id, setClaimed, loginId) => {
  const response = await axios.put(`${baseUrl}/${id}/claim`, {
    id,
    setClaimed,
    loginId,
  });
  return response.data;
};

// id = stakeholderId, setApproved = true to approve data, false to un-approve,
// loginId is user.id of logged in user
export const approve = async (id, setApproved, loginId) => {
  const response = await axios.put(`${baseUrl}/${id}/approve`, {
    id,
    setApproved,
    loginId,
  });
  return response.data;
};

// id = stakeholderId, setRejected = true to reject data, false to un-reject,
// loginId is user.id of logged in user
export const reject = async (id, setRejected, loginId) => {
  const response = await axios.put(`${baseUrl}/${id}/reject`, {
    id,
    setRejected,
    loginId,
  });
  return response.data;
};

// delete user-created job
export const remove = async (id) => {
  const response = await axios.post(`${baseUrl}/${id}`, {
    id,
  });
  return response.data;
};
