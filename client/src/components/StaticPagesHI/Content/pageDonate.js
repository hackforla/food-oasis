import donatebg from "../assets/donate-header.jpg";

const PAGE_INFO_DONATE = {
  pageTitle: "Donate",
  pageImage: {
    alt: "Donate",
    src: donatebg,
  },
};

const PAGE_SECTIONS_DONATE = [
  {
    title: "Make a Financial Contribution",
    content: (
      <div>
        <p>
          Mahalo for making the work of food rescue and redistribution on O‘ahu
          possible! As a 501(c)(3) nonprofit, Aloha Harvest relies completely on
          the generosity of our funders, ranging from national grants to
          individual donations by community members.
        </p>

        <p>
          To donate online, visit{" "}
          <a
            href="https://alohaharvest.org/donate"
            target="_blank"
            rel="noopener noreferrer"
          >
            alohaharvest.org/donate.
          </a>
        </p>

        <p>You will receive an automatic acknowledgement upon donation.</p>

        <p>
          To donate via check, please make your donation out to:
          <br />
          Aloha Harvest
          <br />
          3599 Wai`alae Ave., Suite 23
          <br />
          Honolulu, HI 96816
          <br />
        </p>

        <p>
          You will be mailed a letter of acknowledgement approximately one month
          from the time we receive your check!
        </p>
        <br />
      </div>
    ),
    subtitle: "",
  },
  {
    title: "Donate Excess Food",
    content: (
      <div>
        <p>
          If you or your business have excess food you’d like to donate to us
          for redistribution, please visit{" "}
          <a
            href="https://alohaharvest.org/donate-food"
            target="_blank"
            rel="noopener noreferrer"
          >
            alohaharvest.org/donate-food
          </a>{" "}
          to get started. You can also call us at 808-208-1581 or email
          info@alohaharvest.org with questions.
        </p>
      </div>
    ),
    subtitle: "",
    variant: "dark",
  },
];

export { PAGE_INFO_DONATE, PAGE_SECTIONS_DONATE };
