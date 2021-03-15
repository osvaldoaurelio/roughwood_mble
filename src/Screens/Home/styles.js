import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 24px;
  justify-content: center;
  align-items: center;
  background-color: #E9EDC9;
`;

export const Form = styled.View`
  padding: 24px;
  margin: 24px 0;
  border-radius: 4px;
  background-color: #fff;
  border: 2px solid #cdd4d9;
`;

export const Title = styled.Text`
  font-size: 30px;
  font-weight: 700;
  margin-top: 18px;
  text-align: center;
`;

export const Image = styled.Image`
  width: 100%;
  height: 116px;
`;

export const ErrorContainer = styled.View``;

export const ErrorText = styled.Text`
  color: #e81123;
`;

export const Input = styled.TextInput`
  margin: 12px 0;
  font-size: 20px;
  line-height: 24px;
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid ${({ error, value }) => {
    return (error && !value) ? '#e81123' : '#000';
  }};
`;

export const Button = styled.TouchableOpacity`
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 4px;
  align-items: center;
  background-color: #54361b;
`;

export const BtnText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
`;

export const ActionContainer = styled.View`
  margin-top: 12px;
`;

export const FormFooter = styled.View`
  align-items: center;
`;
