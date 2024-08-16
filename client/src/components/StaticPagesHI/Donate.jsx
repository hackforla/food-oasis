import React from "react";
import { Page, PageSection } from "./Components/Page";
import { PAGE_INFO_DONATE, PAGE_SECTIONS_DONATE } from "./Content/pageDonate";

const Donate = () => {
  return (
    <Page {...PAGE_INFO_DONATE}>
      <div>
        {PAGE_SECTIONS_DONATE.map((section, index) => {
          const { title, titleIcon, content, variant } = section;
          return (
            <PageSection
              key={index}
              title={title}
              titleIcon={titleIcon}
              content={content}
              variant={variant}
            />
          );
        })}
      </div>
    </Page>
  );
};

export default Donate;
