describe("E2E error testing: Food App", () => {
  it("should display error in category page", () => {
    cy.visit("/");
    cy.get("a").click();
    cy.url().should("include", "/category");
    const stub = cy.stub();
    cy.on("window:alert", stub);
    // required error
    cy.get("button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("Please select a meal.");
      });
    // count over 10 error
    cy.get("input:last").type("100");
    cy.get("button")
      .click()
      .then(() => {
        expect(stub.getCall(1)).to.be.calledWith(
          "Maximum number of people: 10"
        );
      });
  });
  it("should display error in restaurant page", () => {
    cy.visit("/");
    cy.get("a").click();
    cy.url().should("include", "/category");
    // select first category
    cy.get("label:first").click();
    cy.get("button").click();
    cy.url().should("include", "/restaurant");
    const stub = cy.stub();
    cy.on("window:alert", stub);
    // required error
    cy.get("button:last")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("Please select a restaurant.");
      });
  });
  it("should display error in dish page", () => {
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
    const stub = cy.stub();
    cy.on("window:alert", stub);
    // required error
    cy.get("button:last")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("Minimum order required: 1");
      });
  });
});
