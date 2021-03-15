import React from 'react';

import loading from '../../img/loading.gif';
import { Container, Image, Title } from './styles';

export default function ({ title, size = 28, titleColor = '#eee' }) {
  return (
    <Container>
      <Image source={loading} size={size} />
      {title && <Title titleColor={titleColor}>{title}</Title>}
    </Container>
  );
}
