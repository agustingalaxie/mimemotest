//const { before } = require("cypress/types/lodash");

//import { it } from "mocha";

const URL = "127.0.0.1:5500";
const CANTIDAD_CUADROS = 16;

context('mimemotest', () => {
    before(() => {
        cy.visit(URL);
    });
    it('Se asegura de que haya un tablero con 16 cuadros', () => {
        cy.get("#grilla-cuadros").find(".cuadro").should('have.length', CANTIDAD_CUADROS)
    });
    it('Se asegura de que los cuadros sean aleatorios', () => {
        cy.get("button").click().get(".oculto").then(ocultos => {
            const primerosContenidos = [];
            ocultos.each(function (i, oculto) {
                primerosContenidos.push(oculto.innerText)
            });
        });
        cy.visit(URL);
        cy.get("button").click().get(".oculto").then(ocultos => {
            const segundosContenidos = [];
            ocultos.each(function (i, oculto) {
                segundosContenidos.push(oculto.innerText)
            });
            cy.wrap(primerosContenidos).should('not.deep.equal', segundosContenidos)
        })
    })
})
