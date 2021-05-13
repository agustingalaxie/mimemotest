//const { before } = require("cypress/types/lodash");

//import { it } from "mocha";

const URL = "127.0.0.1:5500";
const CANTIDAD_CUADROS = 16;
const CLASE_CUADROS_DADOS_VUELTA = "col-3 cuadro clickeado";
const CLASE_CUADROS_ESCONDIDOS = "col-3 cuadro";

context('mimemotest', () => {
    before(() => {
        cy.visit(URL);
    });
    it('Se asegura de que haya un tablero con 16 cuadros', () => {
        cy.get("#grilla-cuadros").find(".cuadro").should('have.length', CANTIDAD_CUADROS)
    });
    it('Se asegura de que los cuadros se escondan al apretar inicio con cuadros dados vuelta', () => {
        cy.get("button").click();
        cy.wait(500);
        cy.get("#cuadro1").click();
        cy.get("#grilla-cuadros").find("#cuadro1").should('have.class', CLASE_CUADROS_DADOS_VUELTA);
        cy.get("button").click();
        cy.get("#grilla-cuadros").find(".cuadro").should('have.class', CLASE_CUADROS_ESCONDIDOS);
    });
    it('Se asegura de que los cuadros sean aleatorios', () => {
        let primerosContenidos = [];
        let segundosContenidos = [];
        cy.get("button").click()
        cy.wait(500);
        cy.get(".oculto").then(ocultos => {            
            ocultos.each(function (i, oculto) {
                primerosContenidos.push(oculto.innerHTML);
            });
        });
        cy.visit(URL);
        cy.get("button").click();
        cy.wait(500);
        cy.get(".interior").then((interior) => {
            interior.each(function (i, interior) {
                segundosContenidos.push(interior.innerText)
            });            
        })
        cy.wrap(primerosContenidos).should('not.deep.equal', segundosContenidos);
    })

}
) 
