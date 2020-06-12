const stakeholderService = require("../services/stakeholder-service");
const { Readable } = require("stream");
const stringify = require("csv-stringify");

const search = (req, res) => {
  let categoryIds = req.query.categoryIds;
  if (!req.query.latitude || !req.query.longitude) {
    res
      .status(404)
      .json("Bad request: needs latitude and longitude parameters");
  }
  if (!categoryIds) {
    // If no filter, just use active categories.
    categoryIds = ["1", "3", "8", "9", "10", "11"];
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
      console.log(err);
      res.status("404").json({ error: err.toString() });
    });
};

const searchDashboard = (req, res) => {
  if (req.distance && (!req.latitude || !req.longitude)) {
    res
      .status(404)
      .json("Bad request: needs latitude and longitude parameters");
  }
  let categoryIds = req.query.categoryIds;
  if (!categoryIds) {
    // If no filter, just use active categories.
    categoryIds = ["1", "3", "8", "9", "10", "11"];
  } else if (typeof categoryIds == "string") {
    categoryIds = [categoryIds];
  }
  const params = { ...req.query, categoryIds };
  stakeholderService
    .searchDashboard(params)
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
              covid_notes: "Covid Notes",
              categories: "Category",
              parent_organization: "Parent Organization",
              description: "Description",
              address_1: "Address",
              address_2: "Address2ndLine",
              city: "City",
              state: "State",
              zip: "Zip",
              latitude: "Latitude",
              longitude: "Longitude",
              neighborhood_name: "Neighborhood",
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
              food_types: "Food Types",
              items: "Non-food Items",
              services: "Services",
              notes: "Public Notes",
              admin_contact_name: "Admin Contact",
              admin_contact_phone: "Admin Phone",
              admin_contact_email: "Admin Email",
              donation_contact_name: "Donation Contact",
              donation_contact_phone: "Donation Phone",
              donation_contact_email: "Donation Email",
              donation_pickup: "Donation Pickup",
              donation_accpet_frozen: "Accepts Frozen",
              donation_accepts_refrigerated: "Accepts Refrigerated",
              donation_accepts_perishable: "Accepts Perishable",
              donation_schedule: "Donation Schedule",
              donation_delivery_instructions: "Donation Delivery Instructions",
              donation_notes: "Donation Notes",
              verification_status_id: "Verification Status",
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
  searchDashboard,
  csv,
  getById,
  post,
  put,
  remove,
  needsVerification,
  assign,
  claim,
};
