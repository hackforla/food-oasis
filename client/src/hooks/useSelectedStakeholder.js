import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import * as analytics from "services/analytics";

export default function useSelectedStakeholder() {
  const history = useHistory();
  const [selectedStakeholder, onSelectStakeholder] = useState(null);

  const doSelectStakeholder = useCallback(
    (stakeholder) => {
      if (stakeholder) {
        analytics.postEvent("selectOrganization", {
          id: stakeholder.id,
          name: stakeholder.name,
        });

        //Update url history
        const name = stakeholder.name.toLowerCase().replaceAll(" ", "_");
        history.push(`/organizations?id=${stakeholder.id}&org=${name}`);
      } else {
        history.push("/organizations");
      }
      onSelectStakeholder(stakeholder);
    },
    [history]
  );

  return {
    selectedStakeholder,
    doSelectStakeholder,
  };
}
