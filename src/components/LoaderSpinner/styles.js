import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Image = styled.Image`
  margin-right: 6px;
  height: ${({ size }) => `${size}px`};
`;

export const Title = styled.Text`
  color: ${({ titleColor }) => titleColor};
`;
