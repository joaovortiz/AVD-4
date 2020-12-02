import styled, { css } from 'styled-components';

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;

}

export const Container = styled.div<ContainerProps>`
    background: #c4fffc;
    border-radius: 10px;
    padding: 16px;
    width: 100%;
    color: #808080;

    display: flex;
    align-items: center;

    & + div {
        margin-top: 8px;
    }

    ${(props) => props.isFocused
        && css`
            color: #000000;
            border-color: #808080;
        `}

    ${(props) => props.isFilled
        && css`
            color: #fffafa;
    `}

    input {
        flex: 1;
        background: transparent;
        border: 0;
        color: #000000;

        &::placeholder {
            color: #666360;
        }
    }

    svg {
        margin-right: 16px;
    }
`;