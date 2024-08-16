import axios from "axios";
import { tenantId } from "helpers/Configuration";
import { formatDate } from "helpers";

const baseUrl = `/api/stakeholderbests`;

export const selectAll = async () => {
  const response = await axios.get(`${baseUrl}/select-all`, {
    params: {
      tenantId,
    },
  });
  console.log({ response });
  let stakeholders = response.data.map((s) => {
    return {
      ...s,
      latitude: Number(s.latitude),
      longitude: Number(s.longitude),
      createdDate: formatDate(s.createdDate),
      modifiedDate: formatDate(s.modifiedDate),
      assignedDate: formatDate(s.assignedDate),
      submittedDate: formatDate(s.submittedDate),
      approvedDate: formatDate(s.approvedDate),
      claimedDate: formatDate(s.claimedDate),
    };
  });

  return stakeholders;
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
      createdDate: formatDate(s.createdDate),
      modifiedDate: formatDate(s.modifiedDate),
      assignedDate: formatDate(s.assignedDate),
      submittedDate: formatDate(s.submittedDate),
      approvedDate: formatDate(s.approvedDate),
      claimedDate: formatDate(s.claimedDate),
    };
  });

  return stakeholders;
};

export const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  const s = response.data;
  return {
    ...s,
    createdDate: formatDate(s.createdDate),
    modifiedDate: formatDate(s.modifiedDate),
    assignedDate: formatDate(s.assignedDate),
    submittedDate: formatDate(s.submittedDate),
    approvedDate: formatDate(s.approvedDate),
    claimedDate: formatDate(s.claimedDate),
  };
};
