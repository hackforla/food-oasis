import React, { lazy, Suspense } from "react";
const FaqComponent = lazy(() => import("./Faq"));
// import Faq from './Faq'

function SuspenseExample() {
  return (
    <Suspense fallback={<div>Loading...hello</div>}>
      {/* <Faq /> */}
      <FaqComponent />
    </Suspense>
  );
}

export default SuspenseExample;
