describe("Appointment", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");

  });

  it("should book an interview", () => {
    //click to add new appoinment
    cy.get("[alt=add]")
    .first()
    .click();
    //fill out info and save new appointment
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones")
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save").click();
    //check that our appoinment exists after saving
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  })

  it("should edit an interview", () => {
    //click to edit existing appoinment
    cy.get("[alt=Edit]")
    .click({force: true});
    //fill out info and save new appointment
    cy.get("[data-testid=student-name-input]")
    .clear()
    .type("Lydia Miller-Jones")
    cy.get("[alt='Tori Malcolm']").click();
    cy.contains("Save").click();
    //check that our appoinment exists after saving
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  })

  it("should cancel an interview", () => {
    //click the hidden delete button
    cy.get("[alt=Delete]")
      .click({ force: true });
    //confirm on the promp to delete
    cy.contains("Confirm").click();
    //check for the deleting marker
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    //ensure appointment was deleted
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
})