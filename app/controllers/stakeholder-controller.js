const stakeholderService = require("../services/stakeholder-service");
const { Readable } = require("stream");
const stringify = require("csv-stringify");

const search = (req, res) => {
  if (req.distance && (!req.latitude || !req.longitude)) {
    res
      .status(404)
      .json("Bad request: needs latitude and longitude parameters");
  }
  let categoryIds = req.query.categoryIds;
  if (!categoryIds) {
    // If no filter, just use active categories.
    categoryIds = ["1", "3", "8", "9", "10", "11", "12"];
  } else if (typeof categoryIds == "string") {
    categoryIds = [categoryIds];
  }
  const params = { ...req.query, categoryIds };
  stakeholderService
    .search(params)
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status("404").json({ error: err.toString() });
    });
};

const getById = (req, res) => {
  const { id } = req.params;
  stakeholderService
    .selectById(id)
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

const csv = (req, res) => {
  const { ids } = req.body;
  res.setHeader("Content-Disposition", "attachment; filename=foodoasis.csv");
  res.setHeader("Content-Type", "text/csv");
  stakeholderService
    .selectCsv(ids)
    .then((resp) => {
      Readable.from(resp)
        .pipe(
          stringify({
            header: true,
            columns: {
              id: "ID",
              name: "Name",
              inactive: "Closed Permanently",
              inactive_temporary: "Closed for COVID",
              covidNotes: "Covid Notes",
              categories: "Category",
              parentOrganization: "Parent Organization",
              description: "Description",
              address1: "Address",
              address2: "Address2ndLine",
              city: "City",
              state: "State",
              zip: "Zip",
              latitude: "Latitude",
              longitude: "Longitude",
              neighborhoodName: "Neighborhood",
              email: "Email",
              phone: "Phone",
              hours: "Hours",
              website: "Website",
              facebook: "Facebook",
              pinterest: "Pinterest",
              twitter: "Twitter",
              linkedin: "LinkedIn",
              instagram: "Instagram",
              requirements: "Eligibility Requirements",
              languages: "Languages",
              foodTypes: "Food Types",
              items: "Non-food Items",
              services: "Services",
              notes: "Public Notes",
              adminContactName: "Admin Contact",
              adminContactPhone: "Admin Phone",
              adminContactEmail: "Admin Email",
              donationContactName: "Donation Contact",
              donationContactPhone: "Donation Phone",
              donationContactEmail: "Donation Email",
              donationPickup: "Donation Pickup",
              donationAcceptFrozen: "Accepts Frozen",
              donationAcceptRefrigerated: "Accepts Refrigerated",
              donationAcceptPerishable: "Accepts Perishable",
              donationSchedule: "Donation Schedule",
              donationDeliveryInstructions: "Donation Delivery Instructions",
              donationNotes: "Donation Notes",
              verificationStatusId: "Verification Status",
            },
          })
        )
        .pipe(res);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

const post = (req, res) => {
  stakeholderService
    .insert(req.body)
    .then((resp) => {
      res.json(resp);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

const put = (req, res) => {
  stakeholderService
    .update(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

const remove = (req, res) => {
  const { id } = req.params;
  stakeholderService
    .remove(id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

const requestAssignment = (req, res) => {
  stakeholderService
    .requestAssignment(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

const assign = (req, res) => {
  stakeholderService
    .assign(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

const needsVerification = (req, res) => {
  stakeholderService
    .needsVerification(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

const claim = (req, res) => {
  stakeholderService
    .claim(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

module.exports = {
  search,
  getById,
  csv,
  post,
  put,
  remove,
  needsVerification,
  assign,
  claim,
  requestAssignment,
};
