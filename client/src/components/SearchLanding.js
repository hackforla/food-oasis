import React from "react";
import useStakeholders from "../hooks/useStakeholders";

export default function SearchLanding({
  fetchLocation,
  userCoordinates,
  history,
}) {
  const {
    stakeholderState,
    stakeholderDispatch,
    stakeholderActionTypes,
    searchStakeholders,
  } = useStakeholders(history);
  const [isMapView, setIsMapView] = React.useState(false);

  /**
   * TODO:
   * here's what I envision this page doing:
   * Landing:
   * - on mount, view is set to the 'landing view search' with minimal search box centered on the page
   * - search input will be autocomplete for either user's location (feed userCoordinates and fetchLocation to this component)
   * - using the selected coordinates, fire off a search() for stakeholders and transition to results view
   *
   * Results View:
   * - kind of a hybrid map/list, really
   * - no way to get back to Landing Page except for a page refresh
   *
   * - List will live in bottom of page, expand upward, and be scrollable
   * - List item:
   *    - on click of card,
   *
   */
  return (
    <div>It's the first of two views in the Search --> Map and List flow</div>
  );
}
