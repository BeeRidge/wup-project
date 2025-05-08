describe('Add Consultation Form Test', () => {
  beforeEach(() => {
    // Set the viewport size
    cy.viewport(1280, 720); // Adjust width and height as needed
    cy.visit('http://localhost:3000/Membership'); // Replace with your Membership page URL
    cy.log('Visited Membership page');
});

  it('should fill out and submit the consultation form', () => {
      // Open the Add Consultation Modal
      cy.contains('Add Consultation').click();

      cy.get('input[name="PinNumber"]').type('PIN09212025283167');
      cy.get('input[name="HSANumber"]').type('821321322132132'); 
      cy.get('input[name="ConsultationNumber"]').type('CON6789'); // Replace with a valid Pin Number// Replace with a valid Consultation Number
      cy.get('input[name="ConsultationDate"]').type('2025-05-08'); 

      // Step 1: Fill out Chief Complaint (Radio Button)
      cy.get('input[name="ChiefComplaint"][value="Abdominal pain"]')
          .scrollIntoView() // Ensure the radio button is visible
          .check({ force: true }); // Force check the radio button
      cy.contains('Next').scrollIntoView().click({ force: true }); // Scroll and force click the "Next" button

      // Step 2: Fill out Objective Physical Examination
      cy.get('input[name="Height"]').type('170');
      cy.get('input[name="Weight"]').type('70');
      cy.contains('Get BMI').click();
      cy.get('input[name="BloodPressure"]').type('120/80');
      cy.get('input[name="HeartRate"]').type('72');
      cy.get('input[name="RespiratoryRate"]').type('14');
      cy.get('input[name="Temperature"]').type('36.5');
      cy.get('input[name="VisualAcuityLeftEye"]').type('20/20');
      cy.get('input[name="VisualAcuityRightEye"]').type('20/25');
      cy.contains('Next').scrollIntoView().click({ force: true }); // Scroll and force click the "Next" button

      // Step 3: Fill out Pertinent Findings
      cy.get('input[name="HEENT"]').type('Normal');
      cy.get('input[name="ChestBreastLungs"]').type('Clear');
      cy.get('input[name="Heart"]').type('Normal');
      cy.get('input[name="Abdomen"]').type('Soft, non-tender');
      cy.get('input[name="Genitourinary"]').type('Normal');
      cy.get('input[name="RectalExam"]').type('Normal');
      cy.get('input[name="ExtremitiesSkin"]').type('No abnormalities');
      cy.get('input[name="NeurologicalExam"]').type('Normal');
      cy.contains('Next').scrollIntoView().click({ force: true }); // Scroll and force click the "Next" button

      // Step 4: Fill out Assessment Diagnosis
      cy.get('textarea[name="AssessmentDiagnosis"]').type('Gastritis');
      cy.contains('Next').scrollIntoView().click({ force: true }); // Scroll and force click the "Next" button

      // Step 5: Fill out Laboratory
      cy.get('textarea[name="Laboratory"]').type('CBC, Urinalysis');
      cy.contains('Submit').scrollIntoView().click({ force: true }); // Scroll and force click the "Submit" button

      // Verify success message
      cy.contains('Consultation added successfully').should('be.visible');
  });
});