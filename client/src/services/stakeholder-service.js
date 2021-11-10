import axios from "axios";
import moment from "moment";
import fileDownload from "js-file-download";
import { tenantId } from "helpers/Configuration";

const baseUrl = "/api/stakeholders";

const toLocalMoment = (ts) => {
  return !ts ? null : moment.utc(ts).local();
};

export const search = async (searchParams) => {
  searchParams = { ...searchParams, tenantId } || { tenantId };
  const response = await axios.get(`${baseUrl}`, {
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
      claimedDate: toLocalMoment(s.claimedDate),
    };
  });

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
    claimedDate: toLocalMoment(s.claimedDate),
  };
};

export const post = async (stakeholder) => {
  const response = await axios.post(baseUrl, {
    ...stakeholder,
    tenantId,
  });
  return response.data;
};

export const exportCsv = async (ids) => {
  const body = { ids };
  const response = await axios.post(baseUrl + "/csv", body, {
    responseType: "stream",
  });
  fileDownload(response.data, "foodoasis.csv");
};

export const put = async (stakeholder) => {
  const response = await axios.put(`${baseUrl}/${stakeholder.id}`, stakeholder);
  return response.data;
};

export const requestAssignment = async (loginId) => {
  const response = await axios.post(`${baseUrl}/requestAssignment`, {
    loginId,
    tenantId,
  });
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
  const response = await axios.delete(`${baseUrl}/${id}`, {
    id,
  });
  return response.data;
};
