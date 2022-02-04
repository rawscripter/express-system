import React from 'react';
import styled, { useTheme } from "styled-components/native";

const sizeVariant = {
    small: 1,
    medium: 2,
    large: 3,
};

const positionVariant = {
    top: "marginTop",
    left: "marginLeft",
    right: "marginRight",
    bottom: "marginBottom",
};

export const Spacer = ({ position, size, children }) => {
    const theme = useTheme();
    const SpacerContainer = styled.View`
        ${positionVariant[position]}:  ${theme.space[sizeVariant[size]]};
    `;
    return (
        <SpacerContainer  >
            {children}
        </SpacerContainer>
    );
};


Spacer.defaultProps = {
    position: "top",
    size: "small",
    children: null,
};