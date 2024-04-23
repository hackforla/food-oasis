import stakeholderService from "../services/stakeholder-service";
import { Readable } from "stream";
import { RequestHandler } from "express";
import {
  StakeholderSearchParams,
  Stakeholder,
  ClaimParams,
  InsertStakeholderParams,
  RequestAssignmentParams,
  AssignParams,
  NeedsVerificationParams,
} from "../../types/stakeholder-types";
import { stringify } from "csv-stringify";

const search: RequestHandler<
  never,
  Stakeholder[] | { error: string },
  never,
  StakeholderSearchParams
> = async (req, res) => {
  try {
    if (req.query.distance && (!req.query.latitude || !req.query.longitude)) {
      res.status(404).json({
        error: "Bad request: needs latitude and longitude parameters",
      });
      return;
    }
    let categoryIds = req.query.categoryIds;
    if (!categoryIds) {
      // If no filter, just use active categories.
      categoryIds = ["1", "3", "8", "9", "10", "11", "12"];
    } else if (typeof categoryIds === "string") {
      categoryIds = [categoryIds];
    }
    const params = { ...req.query, categoryIds };
    const resp = await stakeholderService.search(params);
    res.send(resp);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

const getById: RequestHandler<
  { id: string },
  Stakeholder | { error: string },
  never,
  never
> = async (req, res) => {
  try {
    const resp = await stakeholderService.selectById(req.params.id);
    res.send(resp);
  } catch (err: any) {
    if (err.code === 0) {
      res.sendStatus(404);
    } else {
      console.error(err);
      res.status(500);
    }
  }
};

const csv: RequestHandler<never, never, { ids: string[] }, never> = async (
  req,
  res
) => {
  try {
    const { ids } = req.body;
    res.setHeader("Content-Disposition", "attachment; filename=foodoasis.csv");
    res.setHeader("Content-Type", "text/csv");
    const resp = await stakeholderService.selectCsv(ids);
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
  } catch (err) {
    res.status(500);
  }
};

const post: RequestHandler<
  never,
  { id: number },
  InsertStakeholderParams,
  never
> = async (req, res) => {
  try {
    const resp = await stakeholderService.insert(req.body);
    res.status(201).json(resp);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

const put: RequestHandler<
  never,
  never,
  InsertStakeholderParams,
  never
> = async (req, res) => {
  try {
    await stakeholderService.update(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const remove: RequestHandler<
  { id: string },
  { id: number },
  never,
  never
> = async (req, res) => {
  try {
    await stakeholderService.remove(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

const requestAssignment: RequestHandler<
  never,
  { error: string },
  RequestAssignmentParams,
  never
> = async (req, res) => {
  try {
    const count = await stakeholderService.requestAssignment(req.body);
    if (count === 0) {
      res.status(404).send({ error: "No stakeholders found" });
    }
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

const assign: RequestHandler<never, number, AssignParams, never> = async (
  req,
  res
) => {
  try {
    await stakeholderService.assign(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

const needsVerification: RequestHandler<
  { id: string },
  number,
  NeedsVerificationParams,
  never
> = async (req, res) => {
  try {
    await stakeholderService.needsVerification(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

const claim: RequestHandler<
  { id: string },
  number,
  ClaimParams,
  never
> = async (req, res) => {
  try {
    await stakeholderService.claim(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

export default {
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
