import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect } from '@react-navigation/native'
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
  TransactionsList,
  LogoutButton
} from './styles';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard, { TransactionCardProps } from '../../components/TransactionCard';

export interface DataListProps extends TransactionCardProps {
  id: string
}



const Dashboard: React.FC = () => {
  const [data, setData] = useState<DataListProps[]>([]);
  const dataKey = '@finances:transactions';

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(dataKey);
    const trasactions = response ? JSON.parse(response) : [];

    const trasactionsFormatted: DataListProps[] = trasactions
    .map((item: DataListProps) => {
      const amount = Number(item.amount)
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }).format(new Date(item.date));
      
      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date
      }
    });

    setData(trasactionsFormatted);
  }

  useEffect(() => {
    loadTransactions();
  },[]);

  useFocusEffect(useCallback(()=> {
    loadTransactions();
  },[]));

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
          <LogoutButton onPress={()=>{}}>
            <Icon name="power"/>
          </LogoutButton>
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