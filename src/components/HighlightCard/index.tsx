import React from 'react';

import { 
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction,
} from './styles';

const HighlightCard: React.FC = () => {
  return (
    <Container>
      <Header>
        <Title>Entradas</Title>
        <Icon name="arrow-up-circle" />
      </Header>

      <Footer>
        <Amount>R$ 12.102,91</Amount>
        <LastTransaction>ultima entrada</LastTransaction>
      </Footer>
    </Container>
  );
}

export default HighlightCard;