import axios from "axios";
import moment from "moment";

const baseUrl = "/api/stakeholders";

const toLocalMoment = (ts) => {
  return !ts ? null : moment.utc(ts).local();
};

/* 
    searchParams is an object with any/all of the following properties:
        name - look for this string as substring of the stakeholder's name
        categoryIds - array of integers corresponding to the desired categories
        latitude
        longitude
        distance - radius around latitude and longitude
        isAssigned - ("yes", "no", "either")
        isSubmitted - ("yes", "no", "either")
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
      createdDate: toLocalMoment(s.createdDate),
      modifiedDate: toLocalMoment(s.modifiedDate),
      assignedDate: toLocalMoment(s.assignedDate),
      submittedDate: toLocalMoment(s.submittedDate),
      approvedDate: toLocalMoment(s.approvedDate),
      rejectedDate: toLocalMoment(s.rejectedDate),
      claimedDate: toLocalMoment(s.claimedDate),
    };
  });

  // console.log("stakeholders", stakeholders);
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
    submittedDate: toLocalMoment(s.submittedDate),
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

// id = stakeholderId
// userLoginId is the id of the user doing the assigning
// loginId is user.id of user being assigned to stakeholder
export const assign = async (id, userLoginId, loginId) => {
  const response = await axios.put(`${baseUrl}/${id}/assign`, {
    id,
    userLoginId,
    loginId,
  });
  return response.data;
};

// id = stakeholderId
// userLoginId is the id of the user
export const needsVerification = async (id, userLoginId, message) => {
  const response = await axios.put(`${baseUrl}/${id}/needsVerification`, {
    id,
    userLoginId,
    message,
  });
  return response.data;
};

// id = stakeholderId, setClaimed = true to claim data, false to un-claim,
// loginId is user.id of user that claims stakeholder
export const claim = async (id, userLoginId, setClaimed, loginId) => {
  const response = await axios.put(`${baseUrl}/${id}/claim`, {
    id,
    userLoginId,
    setClaimed,
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
