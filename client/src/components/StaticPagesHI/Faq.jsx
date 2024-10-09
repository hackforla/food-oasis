import React from "react";
import Page from "./Components/Page/Page";
import PageSection from "./Components/Page/PageSection";
import { PAGE_INFO_FAQ, PAGE_SECTIONS_FAQ } from "./Content/pageFaq";

const Faq = () => {
  return (
    <Page {...PAGE_INFO_FAQ}>
      <div>
        {PAGE_SECTIONS_FAQ.map((section, index) => {
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

export default Faq;
