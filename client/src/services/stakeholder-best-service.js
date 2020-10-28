import axios from "axios";
import moment from "moment";
import { tenantId } from "helpers/Configuration";

const baseUrl = "/api/stakeholderbests";

const toLocalMoment = (ts) => {
  return !ts ? null : moment.utc(ts).local();
};

/* 
    searchParams is an object with any/all of the following properties:
        name - look for this string as substring of the stakeholder's name
        categoryIds - array of integers corresponding to the desired categories
        latitude
        longitude
        maxLat - optional
        maxLng - optional
        minLat - optional
        minLng - optional
        distance - radius around latitude and longitude
        isAssigned - ("yes", "no", "either")
        isSubmitted - ("yes", "no", "either")
        isApproved - ("yes", "no", "either")
        isClaimed - ("yes", "no", "either")
        assignedLoginId
        claimedLoginId
*/
export const search = async (searchParams) => {
  searchParams = searchParams || {};
  const response = await axios.get(baseUrl, {
    params: {
      ...searchParams,
      tenantId,
    },
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
    claimedDate: toLocalMoment(s.claimedDate),
  };
};
