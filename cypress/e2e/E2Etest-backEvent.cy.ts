/// <reference types="cypress" />
describe("E2E back event testing: Food App", () => {
  it("should display category page when clicking Back button in restaurant page", () => {
    cy.visit("/");
    cy.get("a").click();
    cy.url().should("include", "/category");
    // select first category
    cy.get("label:first").click();
    cy.get("button").click();
    // save state
    cy.get("main").as("prevState");
    cy.url().should("include", "/restaurant");
    cy.get("button:first").click();
    // assert back in category page with same state
    cy.url().should("include", "/category");
    cy.get("main").then((main) => {
      cy.get("@prevState").should("deep.equal", main);
    });
  });
  it("should display restaurant page when clicking Back button in dish page", () => {
    cy.visit("/");
    cy.get("a").click();
    cy.url().should("include", "/category");
    // select first category
    cy.get("label:first").click();
    cy.get("button").click();
    cy.url().should("include", "/restaurant");
    // select second restaurant in the options
    cy.get("select").select(1);
    // save state
    cy.get("main").as("prevState");
    cy.get("button:last").click();
    cy.url().should("include", "/dish");
    cy.get("button:first").click();
    // assert back in restaurant page with same state
    cy.url().should("include", "/restaurant");
    cy.get("main").then((main) => {
      cy.get("@prevState").should("deep.equal", main);
    });
  });
  it("should display dish page when clicking Back button in confirmation page", () => {
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
    // save state
    cy.get("main").as("prevState");
    cy.get("button:last").click();
    cy.url().should("include", "/confirmation");
    cy.get("button:first").click();
    // assert back in dish page with same state
    cy.url().should("include", "/dish");
    cy.get("main").then((main) => {
      cy.get("@prevState").should("deep.equal", main);
    });
  });
});
