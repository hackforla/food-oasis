import faqbg from "../assets/faq-header.jpg";
import Typography from "@mui/material/Typography";

const PAGE_INFO_FAQ = {
  pageTitle: "FAQs",
  pageImage: {
    alt: "FAQs",
    src: faqbg,
  },
};

const PAGE_SECTIONS_FAQ = [
  {
    title: "For Users",
    content: (
      <>
        <Typography variant="body1">
          <dl>
            <dt>How do I use this tool to find food near me?</dt>
            <dd>
              From the{" "}
              <a
                href="https://devhi.foodoasis.net/organizations"
                target="_blank"
                rel="noopener noreferrer"
              >
                “Find Food”
              </a>{" "}
              page, type in your zip code or address and hit Enter. A list of
              nearby options, sorted from nearest to farthest, will pop up on
              the left side of the page. Click “PANTRIES” or “MEALS” if you’d
              like to filter by type. Click “Details” on an entry to view
              information like Directions, Hours, Phone, Email, and Eligibility
              Requirements.
            </dd>

            <dt>
              Does this food-finder tool include every single place I can get
              food/food assistance on Oʻahu?
            </dt>
            <dd>
              No. The data Aloha Harvest uses to populate this directory
              includes all food pantry and meal programs we deliver food to that
              are open to the public. We deliver food to almost every program of
              this kind on the island, but not 100% of them. Furthermore, there
              are many places that individuals can apply to receive food
              assistance that are not open to the general public. A volunteer
              reviews our list once a week to confirm that all details are still
              current and correct.
            </dd>

            <dt>
              Where can I go for a comprehensive, statewide list of food
              resources and related assistance?
            </dt>
            <dd>
              <a
                href="https://www.auw211.org/s/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Aloha United Way
              </a>{" "}
              can be called by dialing 211 or visiting{" "}
              <a
                href="https://www.auw211.org/s/"
                target="_blank"
                rel="noopener noreferrer"
              >
                auw211.org
              </a>
              . Their specialists can help you through a directory of every
              registered social service agency in the state that helps get food
              to people who need it. They can also search a database of 4,000+
              government and nonprofit services and programs to find the answers
              you need on related issues, like shelter, clothing, childcare,
              elderly care, disability services and more. They are the only
              statewide hotline partnering with the Department of Health.
            </dd>

            <dt>Does this tool include resources for neighbor islands?</dt>
            <dd>
              No, unfortunately Aloha Harvest is currently only located on Oʻahu
              and does not yet have the capacity to establish presence on the
              neighbor islands. As such, our list of food resources only applies
              to Oʻahu. However, we do have a goal of expanding to the other
              islands within the next 5 years.
            </dd>

            <dt>Does Aloha Harvest deliver food directly to individuals?</dt>
            <dd>
              No, unlike a food bank or food pantry, Aloha Harvest provides no
              direct services to individuals. Instead, we perform a “middle man”
              role: We pick up excess food from a network of food donors and
              redistribute it to a network of nonprofits and social service
              agencies feeding O‘ahu’s hungry. To learn more, visit this tool’s
              About Us page or our website directly at{" "}
              <a
                href="https://alohaharvest.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                alohaharvest.org
              </a>
              .
            </dd>
          </dl>
        </Typography>
      </>
    ),
    subtitle: "",
    variant: "dark",
  },
  {
    title: "General Questions",
    content: (
      <>
        <Typography variant="body1">
          <dl>
            <dt>
              Interested in donating excess food, volunteering, or anything
              else?
            </dt>
            <dd>
              Visit our website at{" "}
              <a
                href="https://alohaharvest.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                alohaharvest.org.
              </a>
            </dd>
            <dt>What is food insecurity?</dt>
            <dd>
              If someone is experiencing food insecurity, it means they are
              unable to consistently access or afford adequate food to live a
              healthy life.
            </dd>
            <dt>How is Food Oasis helping to diminish food insecurity?</dt>
            <dd>
              Although there are multiple food directories in the islands, many
              are not well-maintained or they lack easy-to-use interfaces. Now
              more than ever, we need to react to the changing needs of
              Hawaiʻi’s people, and providing a location-based, maintainable web
              app will decrease the friction in finding food resources.
            </dd>
            <dt>Do you accept food or monetary donations?</dt>
            <dd>
              Yes! Please visit the Aloha Harvest{" "}
              <a
                href="https://alohaharvest.org/donate-food/"
                target="_blank"
                rel="noopener noreferrer"
              >
                food donation
              </a>{" "}
              and{" "}
              <a
                href="https://alohaharvest.org/donate-money/"
                target="_blank"
                rel="noopener noreferrer"
              >
                monetary donation
              </a>{" "}
              pages for more information.
            </dd>
          </dl>
        </Typography>
      </>
    ),
    subtitle: "",
  },
];

export { PAGE_INFO_FAQ, PAGE_SECTIONS_FAQ };
