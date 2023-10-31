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
`;

function Main() {
    const [multiplier, setMultiplier] = useState<number | undefined>();
    const [finalNumber, setFinalNumber] = useState<number | undefined>();
    const multTableList = useMultTable(multiplier, finalNumber);

    return (
        <main>
            <Inputs { ...{ multiplier, finalNumber, setMultiplier, setFinalNumber }} />
            <ResultContainer>
                {multTableList.map(([multiplierValue, multiplicandValue, productValue]: Number[]) => {
                    return (
                        <p>
                            <span>{String(multiplierValue)}</span>
                            <span>x</span>
                            <span>{String(multiplicandValue)}</span>
                            <span>=</span>
                            <span>{String(productValue)}</span>
                        </p>
                    );
                })}
            </ResultContainer>
        </main>
    );
}

export default Main;
