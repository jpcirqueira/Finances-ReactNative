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
  TransactionsList
} from './styles';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard, { TransactionCardProps } from '../../components/TransactionCard';

export interface DataListProps extends TransactionCardProps {
  id: string
}
const data: DataListProps[] = [{
  id: '1',
  type: 'positive',
  title:'site',
  amount: 'R$ 230.382,21',
  category:{
    name: 'vendas',
    icon: 'dollar-sign',
  },
  date:'01/06/2021',
},
{
  id: '2',
  type: 'negative',
  title:'site',
  amount: 'R$ 230.382,21',
  category:{
    name: 'vendas',
    icon: 'dollar-sign',
  },
  date:'01/06/2021',
}, 
{
  id: '3',
  type: 'negative',
  title:'site',
  amount: 'R$ 230.382,21',
  category:{
    name: 'vendas',
    icon: 'dollar-sign',
  },
  date:'01/06/2021',
}];

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

        <TransactionsList 
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item}/>}
        />
        
      </Transactions>
    </Container>
  );
}

export default Dashboard;