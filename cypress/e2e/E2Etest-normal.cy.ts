/// <reference types="cypress" />
describe("E2E testing: Food App", () => {
  it("should display home page", () => {
    cy.visit("/");
    cy.title().should("equal", "Food App");
  });
  it("should display category page", () => {
    cy.visit("/");
    cy.get("a").click();
    cy.url().should("include", "/category");
  });
  it("should display restaurant page", () => {
    cy.visit("/");
    cy.get("a").click();
    cy.url().should("include", "/category");
    // select first category
    cy.get("label:first").click();
    cy.get("button").click();
    cy.url().should("include", "/restaurant");
  });
  it("should display dish page", () => {
    cy.visit("/");
    cy.get("a").click();
    cy.url().should("include", "/category");
    // select first category
    cy.get("label:first").click();
    cy.get("button").click();
    cy.url().should("include", "/restaurant");
    // select second restaurant in the options
    cy.get("select").select(1);
    cy.get("button:last").click();
    cy.url().should("include", "/dish");
  });
  it("should display confirmation page and properly set the values", () => {
    cy.visit("/");
    cy.get("a").click();
    cy.url().should("include", "/category");
    // select first category
    cy.get("label:first").click();
    cy.get("button").click();
    cy.url().should("include", "/restaurant");
    // select third restaurant in the options
    cy.get("select").select(2);
    cy.get("button:last").click();
    cy.url().should("include", "/dish");
    // select one serving
    cy.get("input:first").type("1");
    cy.get("input:last").type("2");
    cy.get("button:last").click();
    cy.url().should("include", "/confirmation");
    cy.contains("Breakfast");
    cy.contains("1");
    cy.contains("Vege Deli");
    cy.contains("Coleslaw Sandwich");
    cy.contains("x 1");
    cy.contains("Grilled Sandwich");
    cy.contains("x 2");
  });
});
