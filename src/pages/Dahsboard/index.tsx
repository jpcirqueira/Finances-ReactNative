import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import {useFocusEffect } from '@react-navigation/native';
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
  LogoutButton,
  LoadContainer
} from './styles';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard, { TransactionCardProps } from '../../components/TransactionCard';
import theme from '../../global/styles/theme';
import { LastTransaction } from '../../components/HighlightCard/styles';
import { useAuth } from '../../hooks/auth';

export interface DataListProps extends TransactionCardProps {
  id: string
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expesive: HighlightProps;
  total: HighlightProps;
}
 
const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);
  const [ isLoading, setIsLoading] = useState(true);
   
  const dataKey = '@finances:transactions';
  const { signOut } = useAuth();

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative'
    ){
    const LastCollectionDate =  collection
        .filter(transaction => transaction.type === type)
        .map(transaction => transaction.date)

    return `Ultima transação em ${LastCollectionDate}`
  }

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(dataKey);
    const trasactions = response ? JSON.parse(response) : [];
    
    let entriesTotal = 0;
    let expensiveTotal = 0;

    const trasactionsFormatted: DataListProps[] = trasactions
    .map((item: DataListProps) => {

      if(item.type === 'positive'){
        entriesTotal += Number(item.amount)
      }else{
        expensiveTotal += Number(item.amount)
      }

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

    const total = entriesTotal - expensiveTotal;

    setTransactions(trasactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive')
    const lastTransactionExpensive =getLastTransactionDate(transactions, 'negative')
    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR',{
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionEntries
      },
      expesive: {
        amount: expensiveTotal.toLocaleString('pt-BR',{
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionExpensive
      },
      total: {
        amount: total.toLocaleString('pt-BR',{
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: ''
      }
    })
    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  },[]);

  useFocusEffect(useCallback(()=> {
    loadTransactions();
  },[]));

  return (
    <Container>
      {
        isLoading ? 
        <LoadContainer>
          <ActivityIndicator 
            size= "large"
            color= {theme.colors.primary}
          />
        </LoadContainer> :
        <>
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
              <LogoutButton onPress={signOut}>
                <Icon name="power"/>
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards >
            <HighlightCard 
            title="Entradas"
            amount={highlightData.entries.amount}
            lastTransaction={highlightData.entries.lastTransaction}
            type="up"
            />
            <HighlightCard 
            title="Saidas"
            amount={highlightData.expesive.amount}
            lastTransaction={highlightData.expesive.lastTransaction}
            type="down"
            />
            <HighlightCard 
            title="Total"
            amount={highlightData.total.amount}
            lastTransaction={highlightData.total.lastTransaction}
            type="total"
            />
          </HighlightCards>
          <Transactions>
            <Title>Listagem</Title>

            <TransactionsList 
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item}/>}
            />
          </Transactions>
      </>
    }
    </Container>
  );
}

export default Dashboard;