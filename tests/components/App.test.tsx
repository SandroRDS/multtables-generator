import React from "react";
import '@testing-library/jest-dom';

import setup from '../setup';

import Main from '../../src/components/Main';

describe('Testando correto funcionamento do componente App.', () => {
    test('O componente ResultContainer é renderizado vazio na primeira renderização.', () => {
        const { user, ...screen } = setup(<Main />);

        const resultContainerEl = screen.getByTestId('result-container');
        expect(resultContainerEl).toBeEmptyDOMElement();
    });

    test('Os inputs recebem corretamente os valores numéricos que são passados a eles e não aceitam receber letras.', async () => {
        const { user, ...screen } = setup(<Main />);

        const multiplierInputEl = screen.getByTestId('multiplier') as HTMLInputElement;
        const finalNumberInputEl = screen.getByTestId('final-number') as HTMLInputElement;

        await user.type(multiplierInputEl, '123');
        await user.type(multiplierInputEl, '12');
        await user.type(multiplierInputEl, 'a');
        await user.type(multiplierInputEl, '5');
        await user.type(multiplierInputEl, '{backspace}');

        expect(multiplierInputEl).toHaveValue(12312);

        await user.type(finalNumberInputEl, '12');
        await user.type(finalNumberInputEl, '12');
        await user.type(finalNumberInputEl, 'a');
        await user.type(finalNumberInputEl, '5');
        await user.type(finalNumberInputEl, '{backspace}');

        expect(finalNumberInputEl).toHaveValue(1212);
    });

    test('O componente ResultContainer continua vazio caso apenas o input de multiplicador seja modificado.', async () => {
        const { user, ...screen } = setup(<Main />);

        const resultContainerEl = screen.getByTestId('result-container');
        const multiplierInputEl = screen.getByTestId('multiplier') as HTMLInputElement;

        await user.type(multiplierInputEl, '123');
        expect(resultContainerEl).toBeEmptyDOMElement();
    });

    test('O componente ResultContainer recebe n novas tags p quando o input da quantidade de contas for modificado, onde n é o valor inserido.', async () => {
        const { user, ...screen } = setup(<Main />);

        const resultContainerEl = screen.getByTestId('result-container');
        const finalNumberInputEl = screen.getByTestId('final-number') as HTMLInputElement;

        await user.type(finalNumberInputEl, '15');
        expect(resultContainerEl.childElementCount).toBe(15);

        await user.type(finalNumberInputEl, '5');
        expect(resultContainerEl.childElementCount).toBe(155);

        await user.type(finalNumberInputEl, '{backspace}{backspace}');
        expect(resultContainerEl.childElementCount).toBe(1);
    });

    test('O componente Result Container possui os valores preenchidos corretamente da tabuada solicitada.', async () => {
        const { user, ...screen } = setup(<Main />);

        const multiplierInputEl = screen.getByTestId('multiplier') as HTMLInputElement;
        const finalNumberInputEl = screen.getByTestId('final-number') as HTMLInputElement;

        let multiplierValue = 15;
        let numberOfCalculations = 30;

        await user.type(multiplierInputEl, String(multiplierValue));
        await user.type(finalNumberInputEl, String(numberOfCalculations));

        let multipliers = screen.getAllByTestId('result-multiplier');
        let multiplicands = screen.getAllByTestId('result-multiplicand');
        let products = screen.getAllByTestId('result-product');

        for (let i = 1; i <= Number(numberOfCalculations); i += 1) {
            const currMultiplier = Number(multipliers[i-1].innerHTML);
            const currMultiplicand = Number(multiplicands[i-1].innerHTML);
            const currProduct = Number(products[i-1].innerHTML);

            expect(currMultiplier).toBe(multiplierValue);
            expect(currMultiplicand).toBe(i);
            expect(currProduct).toBe(multiplierValue * i);
        }

        await user.type(multiplierInputEl, '{backspace}{backspace}{backspace}');
        await user.type(finalNumberInputEl, '{backspace}{backspace}{backspace}');

        multiplierValue = 111;
        numberOfCalculations = 999;

        await user.type(multiplierInputEl, String(multiplierValue));
        await user.type(finalNumberInputEl, String(numberOfCalculations));

        multipliers = screen.getAllByTestId('result-multiplier');
        multiplicands = screen.getAllByTestId('result-multiplicand');
        products = screen.getAllByTestId('result-product');

        for (let i = 1; i <= Number(numberOfCalculations); i += 1) {
            const currMultiplier = Number(multipliers[i-1].innerHTML);
            const currMultiplicand = Number(multiplicands[i-1].innerHTML);
            const currProduct = Number(products[i-1].innerHTML);

            expect(currMultiplier).toBe(multiplierValue);
            expect(currMultiplicand).toBe(i);
            expect(currProduct).toBe(multiplierValue * i);
        }
    }, 15000)
});