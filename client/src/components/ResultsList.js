import React from "react";
import PropTypes from "prop-types";

function ResultsList({ selectedStakeholder, stakeholders }) {
  return <div>RESULTS List</div>;
}

ResultsList.propTypes = {
  selectedStakeholder: PropTypes.object,
  stakeholders: PropTypes.arrayOf(PropTypes.object),
};
export default ResultsList;
