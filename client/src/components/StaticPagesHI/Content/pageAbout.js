import aboutbg from "../assets/about-header.jpg";
import Typography from "@material-ui/core/Typography";

const PAGE_INFO_ABOUT = {
  pageTitle: (
    <>
      ABOUT THIS FOOD-FINDER TOOL:
      <br />
      CODE FOR HAWAIʻI AND ALOHA HARVEST
    </>
  ),
  pageImage: {
    alt: "About",
    src: aboutbg,
  },
};

const PAGE_SECTIONS_ABOUT = [
  {
    title: "What is this tool & how do I use it?",
    content: (
      <>
        <Typography variant="body1">
          This tool is meant to provide an easy way for people on Oʻahu to
          locate food resources near them that are open to the public.
        </Typography>
        <Typography variant="body1">
          From the “Find Food” page, type in your zip code or address and hit
          Enter. A list of nearby options, sorted from nearest to farthest, will
          pop up on the left side of the page. Click “PANTRIES” or “MEALS” if
          you’d like to filter by type. Click “Details” on an entry to view
          information like Directions, Hours, Phone, Email, and Eligibility
          Requirements.
        </Typography>
        <Typography variant="body1">
          The data Aloha Harvest uses to populate this directory includes all
          food pantry and meal programs we work with that are open to the
          public. It is not an exhaustive list of every single food resource on
          O‘ahu. A volunteer reviews this list once a week to confirm that all
          details are still current and correct. Learn more on the FAQs page.
        </Typography>
        <Typography variant="body1">
          Click to the three horizontal lines in the upper right of the page to
          use the Menu and navigate to other pages.
        </Typography>
      </>
    ),
    subtitle: "",
  },
  {
    title: "Code For Hawaiʻi and Aloha Harvest",
    content: (
      <div>
        <Typography variant="body1">
          This food-finder tool was developed by Hack for LA Brigade, and this
          O‘ahu-specific instance was built out by Code For Hawaiʻi. These
          groups are part of the Code For America network, a national alliance
          of community organizers, developers, and designers that are putting
          technology to work in service of their local communities.
        </Typography>
        <Typography variant="body1">
          Code For Hawaiʻi asked Aloha Harvest to provide the data (directory of
          places to get food) for this tool. It’s a natural partnership, as
          Aloha Harvest has long needed a user-friendly way to assist people who
          are seeking food.
        </Typography>
      </div>
    ),
    subtitle: "",
    variant: "dark",
  },
  {
    title: "More About Aloha Harvest",
    content: (
      <div>
        <Typography variant="body1">
          <a
            href={"https://alohaharvest.org/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Aloha Harvest
          </a>{" "}
          is the largest food rescue nonprofit in the state of Hawaiʻi. Seven
          days a week, free of charge and free of liability, we rescue quality
          excess food from donors (ex: wholesale distributors, grocery stores,
          restaurants, hotels) and redistribute it to recipient agencies feeding
          the hungry (ex: homeless shelters, social services, food pantries).
        </Typography>
        <Typography variant="body1">
          We have been doing this work for over 21 years and represent the
          largest and most successful collaboration between businesses and
          nonprofits in the state.{" "}
          <a
            href="https://alohaharvest.org/reports/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Last year
          </a>
          , we worked with 370 food donors and 273 recipient agencies to
          redistribute over 2.7 million pounds of good food that would have
          otherwise been wasted!
        </Typography>
        <Typography variant="body1">
          This work is essential because even while 1 in 5 people in Hawaiʻi
          rely on food pantries for assistance, about 237,000 tons of good food
          is wasted annually. Here's a{" "}
          <a
            href="https://www.youtube.com/watch?v=p9kNYCUtg8E&feature=youtu.be"
            target="_blank"
            rel="noopener noreferrer"
          >
            short video
          </a>{" "}
          video that explains more of our process, impact, and future potential.
        </Typography>
        <Typography variant="body1">
          Visit{" "}
          <a
            href="https://alohaharvest.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            alohaharvest.org
          </a>{" "}
          or follow us on{" "}
          <a
            href="http://instagram.com/alohaharvest"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          ,{" "}
          <a
            href="http://facebook.com/alohaharvest"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          ,{" "}
          <a
            href="https://www.linkedin.com/company/4005035"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          , and{" "}
          <a
            href="http://twitter.com/alohaharvest"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          .
        </Typography>
      </div>
    ),
    subtitle: "",
  },
  {
    title: "Contact Aloha Harvest",
    content: (
      <section>
        <Typography variant="body1">
          Call our office at 808-208-1581, or email{" "}
          <a href="mailto:info@alohaharvest.org">info@alohaharvest.org</a>
        </Typography>
      </section>
    ),
    subtitle: "",
    variant: "dark",
  },
];

export { PAGE_INFO_ABOUT, PAGE_SECTIONS_ABOUT };
