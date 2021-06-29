import React, { useState, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HistoryCard from '../../components/HistoryCard';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../global/styles/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { 
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
} from './styles';
import { categories } from '../../utils/categories';
import { useFocusEffect } from '@react-navigation/native';

interface TransactionData{
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
  id: string;
}

interface CategoryData{
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  key: string;
  percentFormatted: string;
  percent: number;
}
function Resume() {

  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  async function loadData(){
    const dataKey = '@finances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    let totalByCategory: CategoryData[] = [];

    const expensives = responseFormatted
      .filter((expensive : TransactionData) => 
        expensive.type === 'negative' &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
      );
    
    const expensivesTotal = expensives
    .reduce((accumulator: number, expensive: TransactionData) => {
      return accumulator + Number(expensive.amount);
    },0);

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive : TransactionData)=> {
        if(expensive.category === category.key){
          categorySum += Number(expensive.amount);
        }
      });
      if(categorySum > 0){
        const totalFormatted = categorySum
        .toLocaleString('pt-BR',{
           style: 'currency',
           currency: 'BRL'
        });
        const percent = (categorySum/expensivesTotal * 100);
        const percentFormatted = `${percent.toFixed(0)}%`

        totalByCategory.push({
          name: category.name,
          total: categorySum,
          totalFormatted, 
          color: category.color,
          key: category.key,
          percent,
          percentFormatted
        })
      }
    });
    setTotalByCategories(totalByCategory)
  }

  function handleDateChange(action: 'next' | 'prev'){
    if(action === 'next'){
      setSelectedDate(addMonths(selectedDate, 1));

    }else{
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  useFocusEffect(useCallback(()=> {
    loadData();
  }, [selectedDate]));

  return (
    <Container>
      <Header>
        <Title>Resumo</Title>
      </Header>
      <Content
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingBottom: useBottomTabBarHeight(),
      }}
      >
        <MonthSelect>
          <MonthSelectButton onPress={() => handleDateChange('prev')}>
            <MonthSelectIcon name="chevron-left"/>
          </MonthSelectButton>

          <Month>
            { format(selectedDate, 'MMM, yyyy', {locale: ptBR})}
          </Month>

          <MonthSelectButton onPress={() => handleDateChange('next')}>
            <MonthSelectIcon name="chevron-right"/>
          </MonthSelectButton>
        </MonthSelect>
        <ChartContainer>
          <VictoryPie
            data= {totalByCategories}
            colorScale={totalByCategories.map(category => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape
              }
            }}
            labelRadius={50}
            x="percentFormatted"
            y="total"
          />
        </ChartContainer>

        {
          totalByCategories.map(item => (
            <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.totalFormatted}
            color={item.color}
            />
          ))
        }
      </Content>
    </Container>
  );
};

export default Resume;
