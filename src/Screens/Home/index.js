import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { done, mineOrders, progress } from '../../services/order';
import LoaderSpinner from '../../components/LoaderSpinner';
import { useAuth } from '../../contexts/auth';
import { status } from '../../utils';

import { Container } from './styles';

export default function () {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  const { signOut, user } = useAuth();

  const handleTap = async cardIndex => {
    setLoading(true);
    const order = orders[cardIndex];
    console.log(orders.length);
    ['progress', 'late'].includes(order.status) && await done(order);
    ['pending'].includes(order.status) && await progress(order);
    loadOrders();
  };

  const loadOrders = async () => {
    const { orders, error } = await mineOrders();
    orders && setOrders(orders);
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
      <Text onPress={signOut}>{user?.name}</Text>
      <Container>
        <Swiper
          cards={orders}
          stackSize={3}
          disableBottomSwipe={true}
          disableLeftSwipe={true}
          disableRightSwipe={true}
          disableTopSwipe={true}
          // cardStyle={{ backgroundColor: '#777' }}
          containerStyle={{ backgroundColor: '#E9EDC9' }}
          onTapCard={handleTap}
          renderCard={order => order && (
            <View style={{ flex: 1, border: 1, borderColor: '#f80', backgroundColor: status(order.status).bgColor }}>
              <Text>{order.description} - {order.id} - {order.status}</Text>
              {console.log(status(order.status).bgColor)}
            </View>
          )}
        />
      </Container>
      <TouchableOpacity onPress={signOut} >
        <Text>
          Toque aqui para sair do sistema
        </Text>
      </TouchableOpacity>
    </>
  );
}
