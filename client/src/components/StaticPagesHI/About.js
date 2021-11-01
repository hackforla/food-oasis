import React from "react";
import { Page, PageSection } from "./Components/Page";
import { PAGE_INFO_ABOUT, PAGE_SECTIONS_ABOUT } from "./Content/pageAbout";

const About = () => {
  return (
    <Page {...PAGE_INFO_ABOUT}>
      {PAGE_SECTIONS_ABOUT.map((section, index) => {
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
    </Page>
  );
};

export default About;
