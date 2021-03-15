import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';

import { done, mineOrders, progress } from '../../services/order';
import LoaderSpinner from '../../components/LoaderSpinner';
import { useAuth } from '../../contexts/auth';
import { status } from '../../utils';

import {
  Container,
  Card,
  StyledTouchableOpacity,
  StyledText,
  CenterText,
  BoldText,
} from './styles';

export default function () {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  const { signOut, user } = useAuth();

  const showStatus = status => {
    const s = {
      progress: 'em progresso',
      late: 'atrasada',
      pending: 'pendente',
    }
    return s[status];
  };

  const updateStatus = status => {
    if (status === 'pending') return 'em progresso';
    return 'concluída';
  };

  const handleTap = async cardIndex => {
    setLoading(true);
    const order = orders[cardIndex];
    ['progress', 'late'].includes(order.status) && await done(order);
    ['pending'].includes(order.status) && await progress(order);
    loadOrders();
    Alert.alert(`Sua ordem foi atualizada para ${updateStatus(order.status)}`);
  };

  const loadOrders = async () => {
    const { orders, error } = await mineOrders();
    orders && setOrders(orders.sort((a, b) => a.status >= b.status));
    error && setError(error);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    loadOrders();
  }, []);

  if (error) {
    return console.warn(error);
  }

  if (loading) {
    return <LoaderSpinner size={300} />;
  }

  return (
    <>
      <Container>
        <Swiper
          cards={orders}
          stackSize={3}
          disableBottomSwipe={true}
          disableLeftSwipe={true}
          disableRightSwipe={true}
          disableTopSwipe={true}
          containerStyle={{ backgroundColor: '#E9EDC9' }}
          onTapCard={handleTap}
          renderCard={order => order && (
            <Card bgColor={status(order.status).bgColor}>
              <View style={{ flex: 1 }}>
                <BoldText>Descrição: {order.description}</BoldText>
                <StyledText>Cliente: {order.customer.name}</StyledText>
                <Text>Data inicial: {
                  new Date(order.initial_date).toLocaleDateString()
                }
                </Text>
                <Text>Data final: {
                  new Date(order.final_date).toLocaleDateString()
                }
                </Text>
                <BoldText>Valor da mão de obra: {order.labor_cost}</BoldText>
              </View>              
              <Text>
                Esta ordem está {
                  showStatus(order.status)
                } toque para atualizar seu status para {
                  updateStatus(order.status)
                }
              </Text>
            </Card>
          )}
        />
      </Container>
      <StyledTouchableOpacity onPress={signOut} >
        <CenterText>
          Toque aqui para sair do sistema
        </CenterText>
      </StyledTouchableOpacity>
    </>
  );
}
