import styled from 'styled-components';

const InputsSection = styled.section`
    width: 50%;
    margin: 0 auto;
    padding: 15px 5px;
    border-radius: 10px;

    display: grid;
    grid-template-columns: 1fr 10% 1fr;
    justify-items: center;
    align-items: center;
    row-gap: 25px;

    color: whitesmoke;
    background-color: #242424b7;
    border: 2px solid #2b2b2b;

    @media screen and (min-width: 1024px) {
        width: 300px;
    }
`;

const Multiplier = styled.input`
    width: 50px;
    height: 100%;

    outline: none;
    font-size: .9em;
    text-align: center;

    padding: 5px 8px;
    border-radius: 4px;
    border: 2px solid white;
    background-color: #0000;
    color: whitesmoke;

    &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
        -webkit-appearance: none; 
        margin: 0;
    }

    &::placeholder {
        color: #f5f5f5be;
    }
`;

const Ellipsis = styled.span`
    grid-column: span 3;
    justify-self: center;

    line-height: 5px;
`;

const FinalNumber = styled(Multiplier)`

`;

type InputsProps = {
    multiplier: number | undefined;
    finalNumber: number | undefined;
    setMultiplier: (multiplier: number | undefined) => void;
    setFinalNumber: (finalNumber: number | undefined) => void;
};

function Inputs({ finalNumber, multiplier, setFinalNumber, setMultiplier }: InputsProps) {
    const changeHandler = ({ target }: React.ChangeEvent<HTMLInputElement>, setFunction: (value: number | undefined) => void) => {
        const inputValue = target.value;

        if (inputValue === '') setFunction(undefined);
        else setFunction(Number(inputValue));
    };

    return (
        <InputsSection>
            <Multiplier type='number' placeholder='?' value={multiplier} onChange={(e) => changeHandler(e, setMultiplier)} />
            <span>x</span>
            <span>1</span>
            <Ellipsis>.<br />.<br />.</Ellipsis>
            <span>{multiplier}</span>
            <span>x</span>
            <FinalNumber type='number' placeholder='N' value={finalNumber} onChange={(e) => changeHandler(e, setFinalNumber)} />
        </InputsSection>
    );
}

export default Inputs;
