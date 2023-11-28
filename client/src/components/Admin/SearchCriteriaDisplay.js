import { Chip, Stack } from "@mui/material";
import { useAccounts } from "../../hooks/useAccounts";

function SearchCriteriaDisplay({
  neighborhoods,
  categories,
  tags,
  handleDelete,
  isLoading,
  criteria,
  defaultCriteria,
}) {
  const { data: accounts, loading: accountsLoading } = useAccounts();
  const CriteriaChip = ({ label, value, name }) => {
    const setCriterion = () => {
      handleDelete({
        ...criteria,
        [name]: defaultCriteria[name],
      });
    };
    const chipLabel = (
      <>
        <b>{label}: </b> {value}
      </>
    );
    return (
      <Chip
        size="small"
        label={chipLabel}
        onDelete={setCriterion}
        sx={{
          margin: "2px",
          display: "flex",
          flexDirection: "row-reverse",
          padding: "5px 10px 5px 10px",
        }}
      />
    );
  };

  const checkForCriteriaPresent = () => {
    if (
      criteria.name !== defaultCriteria.name ||
      criteria.placeName !== defaultCriteria.placeName ||
      criteria.radius !== defaultCriteria.radius ||
      criteria.categoryIds.length > 0 ||
      criteria.isInactive !== defaultCriteria.isInactive ||
      criteria.isAssigned !== defaultCriteria.isAssigned ||
      criteria.isSubmitted !== defaultCriteria.isSubmitted ||
      criteria.isApproved !== defaultCriteria.isApproved ||
      criteria.isClaimed !== defaultCriteria.isClaimed ||
      criteria.assignedLoginId !== defaultCriteria.assignedLoginId ||
      criteria.claimedLoginId !== defaultCriteria.claimedLoginId ||
      criteria.verificationStatusId !== defaultCriteria.verificationStatusId ||
      criteria.neighborhoodId !== defaultCriteria.neighborhoodId ||
      criteria.isInactiveTemporary !== defaultCriteria.isInactiveTemporary ||
      criteria.stakeholderId !== defaultCriteria.stakeholderId ||
      criteria.minCompleteCriticalPercent !==
        defaultCriteria.minCompleteCriticalPercent ||
      criteria.maxCompleteCriticalPercent !==
        defaultCriteria.maxCompleteCriticalPercent ||
      criteria.tag !== defaultCriteria.tag
      // TODO: latituted and longitude are omitted because they are buggy
      // criteria.latitude != defaultCriteria.latitude ||
      // criteria.longitude != defaultCriteria.longitude ||
    ) {
      return true;
    }

    return false;
  };
  const getCategoryMap = () => {
    const categoryMap = {};

    categories.forEach((category) => {
      categoryMap[category.id] = category;
    });

    return categoryMap;
  };

  const getCriteriaToDisplay = () => {
    let criterias = [];

    if (criteria.name !== defaultCriteria.name) {
      criterias.push(
        <CriteriaChip
          key={"CriteriaChip_Name"}
          name="name"
          value={criteria.name}
          label="Name"
        />
      );
    }

    if (criteria.tag !== defaultCriteria.tag) {
      criterias.push(
        <CriteriaChip
          key={"CriteriaChip_Tag"}
          name="tag"
          value={criteria.tag}
          label="Tag"
        />
      );
    }

    if (criteria.radius !== defaultCriteria.radius) {
      criterias.push(
        <CriteriaChip
          key={"CriteriaChip_Radius"}
          name="radius"
          value={criteria.radius}
          label="Radius"
        />
      );
    }

    if (criteria.categoryIds.length > 0) {
      const categoryMap = getCategoryMap();
      const selectedCategories = [];

      criteria.categoryIds.forEach((categoryId) => {
        if (categoryMap[categoryId]) {
          selectedCategories.push(categoryMap[categoryId].name);
        }
      });

      criterias.push(
        <CriteriaChip
          key={"CriteriaChip_Categories"}
          name="categoryIds"
          value={selectedCategories.join(", ")}
          label={criteria.categoryIds.length === 1 ? "Category" : "Categories"}
        />
      );
    }

    if (criteria.isInactive !== defaultCriteria.isInactive) {
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
        default:
          inactiveLabel = "Yes";
      }

      criterias.push(
        <CriteriaChip
          key={"CriteriaChip_PermanentlyClosed"}
          name="isInactive"
          value={inactiveLabel}
          label="Permanently Closed"
        />
      );
    }

    if (criteria.assignedLoginId !== defaultCriteria.assignedLoginId) {
      let assignedToLabel = "";

      accounts.forEach((account) => {
        if (account.id === criteria.assignedLoginId) {
          assignedToLabel = `${account.firstName}, ${account.lastName} (${account.email})`;
        }
      });

      criterias.push(
        <CriteriaChip
          key={"CriteriaChip_AssignedTo"}
          name="assignedLoginId"
          value={assignedToLabel}
          label="Assigned To"
        />
      );
    }

    if (
      criteria.verificationStatusId !== defaultCriteria.verificationStatusId
    ) {
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
        default:
          verificationStatus = "(Any)";
      }

      criterias.push(
        <CriteriaChip
          key={"CriteriaChip_VerificationStatus"}
          name="verificationStatusId"
          value={verificationStatus}
          label="Verification Status"
        />
      );
    }

    if (criteria.neighborhoodId !== defaultCriteria.neighborhoodId) {
      let neighborhoodName = "";

      neighborhoods.forEach((neighborhood) => {
        if (neighborhood.id === criteria.neighborhoodId) {
          neighborhoodName = neighborhood.name;
        }
      });

      criterias.push(
        <CriteriaChip
          key={"CriteriaChip_Neighborhood"}
          name="neighborhoodId"
          value={neighborhoodName}
          label="Neighborhood"
        />
      );
    }

    if (
      criteria.minCompleteCriticalPercent !==
      defaultCriteria.minCompleteCriticalPercent
    ) {
      if (
        criteria.minCompleteCriticalPercent === "0" ||
        criteria.minCompleteCriticalPercent === ""
      ) {
        // do nothing, handling type mismatch
      } else {
        criterias.push(
          <CriteriaChip
            key={"CriteriaChip_Min%Critical"}
            name="minCompleteCriticalPercent%Critical"
            value={criteria.minCompleteCriticalPercent}
            label="Min % Critical"
          />
        );
      }
    }

    if (
      criteria.maxCompleteCriticalPercent !==
      defaultCriteria.maxCompleteCriticalPercent
    ) {
      if (
        criteria.maxCompleteCriticalPercent === "100" ||
        criteria.maxCompleteCriticalPercent === ""
      ) {
        // do nothing, handling type mismatch
      } else {
        criterias.push(
          <CriteriaChip
            key={"CriteriaChip_Max%Critical"}
            name="maxCompleteCriticalPercent"
            value={criteria.maxCompleteCriticalPercent}
            label="Max % Critical"
          />
        );
      }
    }

    if (criteria.isInactiveTemporary !== defaultCriteria.isInactiveTemporary) {
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
        default:
          inactiveTemporaryLabel = "Either";
      }

      criterias.push(
        <CriteriaChip
          key={"CriteriaChip_ClosedForCOVID"}
          name="isInactiveTemporary"
          value={inactiveTemporaryLabel}
          label="Closed for COVID"
        />
      );
    }

    if (criteria.stakeholderId !== defaultCriteria.stakeholderId) {
      criterias.push(
        <CriteriaChip
          key={"CriteriaChip_OrganizationID"}
          name="stakeholderId"
          value={criteria.stakeholderId}
          label="Organization ID"
        />
      );
    }

    return criterias;

    /**

      TODO: The following values appear in defaultCriteria but are not used in SearchCriteria.js
      how should this be handeld?

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
      if (criteria.placeName != defaultCriteria.placeName) {
      }

      TODO: latituted and longitude are omitted because they are buggy

      if (criteria.latitude != defaultCriteria.latitude) {
        // not including for now because of bug
      }
      if (criteria.longitude != defaultCriteria.longitude) {
        // not including for now because of bug
      }
    */
  };

  if (accountsLoading || isLoading) {
    return <></>;
  }

  if (checkForCriteriaPresent()) {
    const criteriasToDisplay = getCriteriaToDisplay();

    return (
      <Stack
        direction="row-reverse"
        flexWrap="wrap"
        sx={{ maxWidth: "75%", marginLeft: "24%" }}
      >
        {criteriasToDisplay}
      </Stack>
    );
  }

  return <></>;
}

export default SearchCriteriaDisplay;
