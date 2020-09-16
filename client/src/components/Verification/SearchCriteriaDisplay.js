import React from "react";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import { useAccounts } from "../../hooks/useAccounts/useAccounts";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    maxWidth: "75%",
    marginLeft: "24%",
  },
  criteriaChip: {
    margin: "2px",
  },
}));

const CriteriaChip = ({ label, value }) => {
  const classes = useStyles();
  const chipLabel = (
    <>
      <b>{label}: </b> {value}
    </>
  );

  return (
    <Chip size="small" className={classes.criteriaChip} label={chipLabel} />
  );
};

function SearchCriteriaDisplay({
  defaultCriteria,
  criteria,
  neighborhoods,
  tenants,
}) {
  const classes = useStyles();
  const { data: accounts } = useAccounts();

  const checkForCriteriaPresent = () => {
    if (
      criteria.tenantId != defaultCriteria.tenantId ||
      criteria.name != defaultCriteria.name ||
      // criteria.latitude != defaultCriteria.latitude ||
      // criteria.longitude != defaultCriteria.longitude ||
      criteria.placeName != defaultCriteria.placeName ||
      criteria.radius != defaultCriteria.radius ||
      criteria.categoryIds.length > 0 ||
      criteria.isInactive != defaultCriteria.isInactive ||
      criteria.isAssigned != defaultCriteria.isAssigned ||
      criteria.isSubmitted != defaultCriteria.isSubmitted ||
      criteria.isApproved != defaultCriteria.isApproved ||
      criteria.isClaimed != defaultCriteria.isClaimed ||
      criteria.assignedLoginId != defaultCriteria.assignedLoginId ||
      criteria.claimedLoginId != defaultCriteria.claimedLoginId ||
      criteria.verificationStatusId != defaultCriteria.verificationStatusId ||
      criteria.neighborhoodId != defaultCriteria.neighborhoodId ||
      criteria.isInactiveTemporary != defaultCriteria.isInactiveTemporary ||
      criteria.stakeholderId != defaultCriteria.stakeholderId
    ) {
      return true;
    }

    return false;
  };

  const getCriteriaToDisplay = () => {
    // using != rather than !== because maxCompleteCriticalPercent is both a string and int
    let criterias = [];

    if (criteria.tenantId != defaultCriteria.tenantId) {
      let tenantName = "";

      tenants.forEach((tenant) => {
        if (tenant.id === criteria.tenantId) {
          tenantName = tenant.name;
        }
      });

      criterias.push(
        <CriteriaChip
          key={"CriteriaChip_Region"}
          value={tenantName}
          label="Region"
        />
      );
    }

    if (criteria.name != defaultCriteria.name) {
      criterias.push(
        <CriteriaChip
          key={"CriteriaChip_Name"}
          value={criteria.name}
          label="Name"
        />
      );
    }

    if (criteria.radius != defaultCriteria.radius) {
      criterias.push(
        <CriteriaChip
          key={"CriteriaChip_Radius"}
          value={criteria.radius}
          label="Radius"
        />
      );
    }

    if (criteria.categoryIds.length > 0) {
      // IN PROGRESS
    }

    if (criteria.isInactive != defaultCriteria.isInactive) {
      let inactiveLabel = "";

      switch (criteria.isInactive) {
        case "true":
          inactiveLabel = "Yes";
          break;
        case "false":
          inactiveLabel = "No";
          break;
        case "either":
          inactiveLabel = "Either";
          break;
      }

      criterias.push(
        <CriteriaChip
          key={"CriteriaChip_PermanentlyClosed"}
          value={inactiveLabel}
          label="Permanently Closed"
        />
      );
    }

    if (criteria.assignedLoginId != defaultCriteria.assignedLoginId) {
      let assignedToLabel = "";

      accounts.forEach((account) => {
        if (account.id === criteria.assignedLoginId) {
          assignedToLabel = `${account.firstName}, ${account.lastName} (${account.email})`;
        }
      });

      criterias.push(
        <CriteriaChip
          key={"CriteriaChip_AssignedTo"}
          value={assignedToLabel}
          label="Assigned To"
        />
      );
    }

    if (criteria.verificationStatusId != defaultCriteria.verificationStatusId) {
      let verificationStatus = "";

      switch (criteria.verificationStatusId) {
        case 0:
          verificationStatus = "(Any)";
          break;
        case 1:
          verificationStatus = "Needs Verification";
          break;
        case 2:
          verificationStatus = "Assigned";
          break;
        case 3:
          verificationStatus = "Submitted";
          break;
        case 4:
          verificationStatus = "Submitted";
          break;
      }

      criterias.push(
        <CriteriaChip
          key={"CriteriaChip_VerificationStatus"}
          value={verificationStatus}
          label="Verification Status"
        />
      );
    }

    if (criteria.neighborhoodId != defaultCriteria.neighborhoodId) {
      let neighborhoodName = "";

      neighborhoods.forEach((neighborhood) => {
        if (neighborhood.id === criteria.neighborhoodId) {
          neighborhoodName = neighborhood.name;
        }
      });

      criterias.push(
        <CriteriaChip
          key={"CriteriaChip_Neighborhood"}
          value={neighborhoodName}
          label="Neighborhood"
        />
      );
    }

    if (
      criteria.minCompleteCriticalPercent !=
      defaultCriteria.minCompleteCriticalPercent
    ) {
      criterias.push(
        <CriteriaChip
          key={"CriteriaChip_Min%Critical"}
          value={criteria.minCompleteCriticalPercent}
          label="Min % Critical"
        />
      );
    }

    if (
      criteria.maxCompleteCriticalPercent !=
      defaultCriteria.maxCompleteCriticalPercent
    ) {
      criterias.push(
        <CriteriaChip
          key={"CriteriaChip_Max%Critical"}
          value={criteria.maxCompleteCriticalPercent}
          label="Max % Critical"
        />
      );
    }

    if (criteria.isInactiveTemporary != defaultCriteria.isInactiveTemporary) {
      let inactiveTemporaryLabel = "";

      switch (criteria.isInactiveTemporary) {
        case "true":
          inactiveTemporaryLabel = "Yes";
          break;
        case "false":
          inactiveTemporaryLabel = "No";
          break;
        case "either":
          inactiveTemporaryLabel = "Either";
          break;
      }

      criterias.push(
        <CriteriaChip
          key={"CriteriaChip_ClosedForCOVID"}
          value={inactiveTemporaryLabel}
          label="Closed for COVID"
        />
      );
    }

    if (criteria.stakeholderId != defaultCriteria.stakeholderId) {
      criterias.push(
        <CriteriaChip
          key={"CriteriaChip_OrganizationID"}
          value={criteria.stakeholderId}
          label="Organization ID"
        />
      );
    }

    return criterias;

    /** 
      * Todo: The following values appear in defaultCriteria but are not used in SearchCriteria.js
      * how should this be handeld?

      if (criteria.isAssigned != defaultCriteria.isAssigned) {
      }
      if (criteria.isSubmitted != defaultCriteria.isSubmitted) {
      }
      if (criteria.isApproved != defaultCriteria.isApproved) {
      }
      if (criteria.isClaimed != defaultCriteria.isClaimed) {
      }
      if (criteria.claimedLoginId != defaultCriteria.claimedLoginId) {
      }
      if (criteria.latitude != defaultCriteria.latitude) {
        // not including for now because of bug
      }
      if (criteria.longitude != defaultCriteria.longitude) {
        // not including for now because of bug
      }
      if (criteria.placeName != defaultCriteria.placeName) {
      }
    */
  };

  if (!neighborhoods || !tenants || !accounts) {
    return <></>;
  }

  if (checkForCriteriaPresent()) {
    const criteriasToDisplay = getCriteriaToDisplay();

    return <div className={classes.root}>{criteriasToDisplay}</div>;
  }

  return <></>;
}

export default SearchCriteriaDisplay;
