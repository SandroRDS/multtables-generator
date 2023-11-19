import { useState } from 'react';
import useMultTable from "../hooks/useMultTable";

import styled from 'styled-components';

import Inputs from "./Inputs";

const ResultContainer = styled.section`
    width: 80%;
    height: 40vh;
    margin: 20px auto;
    padding: 5px 15px;
    overflow-y: auto;

    color: #353535;
    border: 2px solid #b3b3b3d6;
    border-radius: 4px;
    background-color: #f5f5f5cc;
    font-size: 1.2em;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
    column-gap: 30px;

    p {
        width: fit-content;
    }

    span {
        font-weight: 600;
    }

    span:first-child {
        color: #1b7dbe;
    }

    span:last-child {
        color: #144572;
    }

    &::-webkit-scrollbar {
        background-color: #0000;
        height: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #2b2b2bcc;
        border-radius: 6px;
    }

    @media screen and (min-width: 1024px) {
        width: 900px;
    }
`;

function Main() {
    const [multiplier, setMultiplier] = useState<number | undefined>();
    const [finalNumber, setFinalNumber] = useState<number | undefined>();
    const multTableList = useMultTable(multiplier, finalNumber);

    const getRandomColor = () => {
        const getRandomNumber = () => Math.floor(Math.random() * 51) + 100;
        return `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`;
    };

    return (
        <main>
            <Inputs { ...{ multiplier, finalNumber, setMultiplier, setFinalNumber }} />
            <ResultContainer data-testid='result-container'>
                {multTableList.map(([multiplierValue, multiplicandValue, productValue]: Number[]) => {
                    return (
                        <p>
                            <span data-testid='result-multiplier'>{String(multiplierValue)}</span>
                            <span>x</span>
                            <span data-testid='result-multiplicand' style={ { color: getRandomColor() } }>{String(multiplicandValue)}</span>
                            <span>=</span>
                            <span data-testid='result-product'>{String(productValue)}</span>
                        </p>
                    );
                })}
            </ResultContainer>
        </main>
    );
}

export default Main;
