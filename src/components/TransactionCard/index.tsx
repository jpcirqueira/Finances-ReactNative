import React from 'react';

import { 
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';

const TransactionCard: React.FC = () => {
  return (
    <Container>
      <Title>Teste</Title>
      <Amount>R$ 7.281,38</Amount>
      <Footer>
        <Category>
          <Icon name="dollar-sign"/>
          <CategoryName>Vendas</CategoryName>
        </Category>
        <Date>01/06/2021</Date>
      </Footer>
    </Container>
  );
}

export default TransactionCard;