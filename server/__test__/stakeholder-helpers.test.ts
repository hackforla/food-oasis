import stakeholderHelpers from "../app/services/stakeholder-helpers";

const fullRow = {
  id: 4460,
  name: "Test Pantry",
  address_1: "123 Test St",
  address_2: "Suite 4",
  city: "Los Angeles",
  state: "CA",
  zip: "90012",
  phone: "(213) 555-1212",
  phone_ext: "12",
  email: "pantry@example.com",
  website: "https://example.com",
  latitude: "34.0522",
  longitude: "-118.2437",
  admin_contact_email: "admin@example.com",
  admin_contact_name: "Admin",
  admin_contact_phone: "555",
  admin_notes: "notes",
  allow_walkins: true,
  approved_date: "2026-01-02",
  approved_login_id: 9,
  assigned_date: "2026-01-01",
  assigned_login_id: 7,
  assigned_user: "Data Entry",
  categories: [{ id: 1, name: "Food Pantry" }],
  category_notes: "cat notes",
  claimed_date: null,
  claimed_login_id: null,
  claimed_user: null,
  complete_critical_percent: 80,
  v_address: true,
  v_categories: false,
  v_email: true,
  v_food_types: false,
  v_hours: true,
  v_name: true,
  v_phone: false,
  covid_notes: "",
  created_date: "2025-12-01",
  created_login_id: 1,
  created_user: "Admin",
  description: "A pantry",
  donation_accept_frozen: true,
  donation_accept_perishable: null,
  donation_accept_refrigerated: undefined,
  donation_contact_email: "",
  donation_contact_name: "",
  donation_contact_phone: "",
  donation_delivery_instructions: "",
  donation_notes: "",
  donation_pickup: true,
  donation_schedule: "",
  eligibility_notes: "",
  facebook: "",
  food_bakery: true,
  food_dairy: false,
  food_dry_goods: true,
  food_meat: false,
  food_prepared: false,
  food_produce: true,
  food_types: "bakery",
  hours: [{ weekOfMonth: 0, dayOfWeek: "Mon", open: "09:00", close: "17:00" }],
  hours_notes: "closed holidays",
  inactive: false,
  inactive_temporary: true,
  instagram: "",
  items: "",
  languages: "English",
  linkedin: "",
  modified_date: "2026-02-01",
  modified_login_id: 2,
  modified_user: "Editor",
  neighborhood_id: 5,
  neighborhood_name: "Downtown",
  notes: "",
  parent_organization: "LA Food Bank",
  parent_organization_id: 3,
  physical_access: "",
  pinterest: "",
  requirements: "",
  reviewed_user: "Reviewer",
  review_notes: "looks good",
  services: "",
  submitted_date: "2026-01-15",
  submitted_login_id: 4,
  submitted_user: "Submitter",
  sug_count: "3",
  tags: ["halal"],
  twitter: "",
  verification_status_id: 4,
};

describe("rowToStakeholder", () => {
  it("maps snake_case columns to the camelCase stakeholder shape", () => {
    const result = stakeholderHelpers.rowToStakeholder(fullRow);

    expect(result).toEqual(
      expect.objectContaining({
        id: 4460,
        name: "Test Pantry",
        address1: "123 Test St",
        address2: "Suite 4",
        city: "Los Angeles",
        state: "CA",
        zip: "90012",
        phone: "(213) 555-1212",
        phoneExt: "12",
        adminContactEmail: "admin@example.com",
        assignedLoginId: 7,
        assignedUser: "Data Entry",
        categoryNotes: "cat notes",
        completeCriticalPercent: 80,
        createdLoginId: 1,
        hoursNotes: "closed holidays",
        inactiveTemporary: true,
        modifiedUser: "Editor",
        neighborhoodId: 5,
        neighborhoodName: "Downtown",
        parentOrganization: "LA Food Bank",
        parentOrganizationId: 3,
        submittedLoginId: 4,
        suggestionCount: "3",
        tags: ["halal"],
        verificationStatusId: 4,
        website: "https://example.com",
      })
    );
  });

  it("converts string coordinates to numbers", () => {
    const result = stakeholderHelpers.rowToStakeholder(fullRow);

    expect(result.latitude).toBe(34.0522);
    expect(result.longitude).toBe(-118.2437);
  });

  it("uses null for missing coordinates", () => {
    const result = stakeholderHelpers.rowToStakeholder({
      ...fullRow,
      latitude: null,
      longitude: undefined,
    });

    expect(result.latitude).toBeNull();
    expect(result.longitude).toBeNull();
  });

  it("maps the v_* confirmation flags to confirmed* fields", () => {
    const result = stakeholderHelpers.rowToStakeholder(fullRow);

    expect(result.confirmedAddress).toBe(true);
    expect(result.confirmedCategories).toBe(false);
    expect(result.confirmedEmail).toBe(true);
    expect(result.confirmedFoodTypes).toBe(false);
    expect(result.confirmedHours).toBe(true);
    expect(result.confirmedName).toBe(true);
    expect(result.confirmedPhone).toBe(false);
  });

  it("maps approved_login_id to reviewedLoginId", () => {
    const result = stakeholderHelpers.rowToStakeholder(fullRow);

    expect(result.reviewedLoginId).toBe(9);
    expect(result.reviewedUser).toBe("Reviewer");
    expect(result.approvedDate).toBe("2026-01-02");
  });

  it("defaults null text columns to empty strings", () => {
    const result = stakeholderHelpers.rowToStakeholder({
      id: 1,
      name: null,
      address_1: null,
      claimed_user: null,
      email: undefined,
    });

    expect(result.name).toBe("");
    expect(result.address1).toBe("");
    expect(result.claimedUser).toBe("");
    expect(result.email).toBe("");
    expect(result.website).toBe("");
    expect(result.phoneExt).toBe("");
  });

  it("defaults donation flags to false and suggestion count to zero", () => {
    const result = stakeholderHelpers.rowToStakeholder({ id: 1 });

    expect(result.donationAcceptFrozen).toBe(false);
    expect(result.donationAcceptPerishable).toBe(false);
    expect(result.donationAcceptRefrigerated).toBe(false);
    expect(result.donationPickup).toBe(false);
    expect(result.suggestionCount).toBe("0");
  });

  it("keeps donation flags that are set on the row", () => {
    const result = stakeholderHelpers.rowToStakeholder(fullRow);

    expect(result.donationAcceptFrozen).toBe(true);
    expect(result.donationPickup).toBe(true);
    expect(result.donationAcceptPerishable).toBe(false);
  });

  it("prefers explicitly passed categories over the row's categories", () => {
    const categories = [{ id: 9, name: "Meal Program" }];
    const result = stakeholderHelpers.rowToStakeholder(fullRow, categories);

    expect(result.categories).toBe(categories);
  });

  it("falls back to the row's categories when none are passed", () => {
    const result = stakeholderHelpers.rowToStakeholder(fullRow);

    expect(result.categories).toEqual([{ id: 1, name: "Food Pantry" }]);
  });

  it("does not expose a distance field", () => {
    const result = stakeholderHelpers.rowToStakeholder({
      ...fullRow,
      distance: 1.5,
    });

    expect(result).not.toHaveProperty("distance");
  });
});
