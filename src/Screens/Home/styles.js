import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 24px;
  justify-content: center;
  align-items: center;
  background-color: #E9EDC9;
`;

export const Card = styled.View`
  flex: 1;
  padding: 24px;
  border-color: #f80;
  justify-content: space-between;
  background-color: ${({ bgColor }) => bgColor};

`;

export const StyledTouchableOpacity = styled(TouchableOpacity)`
  padding: 24px;
`;

export const StyledText = styled.Text`
  margin-bottom: 16px;
  font-size: 18px;
`;

export const CenterText = styled.Text`
  font-size: 18px;
  text-align: center;
`;

export const BoldText = styled.Text`
  font-size: 16px;
  margin-top: 12px;
  margin-bottom: 24px;
  font-weight: bold;
`;
