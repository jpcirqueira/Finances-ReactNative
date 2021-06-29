import React from 'react';

import HistoryCard from '../../components/HistoryCard';

import { 
  Container,
  Header,
  Title,
} from './styles';

function Resume() {
  return (
    <Container>
      <Header>
        <Title>Resumo</Title>
      </Header>
      <HistoryCard
        title="salario"
        amount="5000"
        color= "green"
      />
    </Container>
  );
};

export default Resume;
