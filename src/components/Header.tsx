import styled from 'styled-components';
import HeaderIcon from '../images/header-icon.png';

const HeaderStyled = styled.header`
    width: 100%;
    height: 25vh;

    position: relative;
`;

const FloatingContainer = styled.div`
    width: 100%;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    position: absolute;
    animation-name: InfinityFloating;
    animation-duration: 3.2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;

    @keyframes InfinityFloating {
        0% {
            bottom: 0%;
        } 50% {
            bottom: 25%;
        } 100% {
            bottom: 0%;
        }
    }
`;

const Icon = styled.img`
    width: 64px;
    height: 64px;
`;

const Title = styled.h1`
    width: 11ch;
    text-align: center;
    font-size: 2em;

    color: #ebebeb;
    text-shadow: 1px 1px 5px black;
`;

function Header() {
    return (
        <HeaderStyled>
            <FloatingContainer>
                <Icon src={HeaderIcon} />
                <Title>Mult-Tables Generator</Title>
            </FloatingContainer>
        </HeaderStyled>
    );
}

export default Header;
