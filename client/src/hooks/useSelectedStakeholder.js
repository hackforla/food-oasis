import { useCallback, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import * as analytics from "services/analytics";

export default function useSelectedStakeholder() {
  const history = useHistory();
  const location = useLocation();
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
        history.push(`${location.pathname}?id=${stakeholder.id}&org=${name}`);
      } else {
        history.push(location.pathname);
      }
      onSelectStakeholder(stakeholder);
    },
    [history, location]
  );

  return {
    selectedStakeholder,
    doSelectStakeholder,
  };
}
