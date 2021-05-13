//const { before } = require("cypress/types/lodash");

const URL = "127.0.0.1:5500";

context('mimemotest', () => {
    before(() => {
        cy.visit(URL);
    });
    it('tests', () => {

    })
})
