import React from 'react';

import { 
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
} from './styles';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard from '../../components/TransactionCard';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo 
            source={{ uri: 'https://github.com/jpcirqueira.png' }}
            />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>usuario</UserName>
            </User>
          </UserInfo>
          <Icon name="power"/>
        </UserWrapper>
      </Header>
      <HighlightCards >
        <HighlightCard 
        title="Entradas"
        amount="R$17.192,29" 
        lastTransaction="ultima translação"
        type="up"
        />
        <HighlightCard 
        title="Saidas"
        amount="R$17.192,29" 
        lastTransaction="ultima translação"
        type="down"
        />
        <HighlightCard 
        title="Total"
        amount="R$17.192,29" 
        lastTransaction="ultima translação"
        type="total"
        />
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionCard />
      </Transactions>
    </Container>
  );
}

export default Dashboard;