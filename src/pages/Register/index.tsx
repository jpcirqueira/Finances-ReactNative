import React, { useState } from 'react';

import Input from '../../components/Forms/Input';
import Button from '../../components/Forms/Button';
import TransactionTypeButton from '../../components/Forms/TransactionTypeButton';

import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionType,
} from './styles';

const Register: React.FC = () => {

  const [transactionType, setTransactionType] = useState('');

  function handleTransactionsTypeSelect(type: 'up' | 'down'){
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome"/>
          <Input placeholder="Preço"/>
          <TransactionType>         
            <TransactionTypeButton
              type="up"
              title="Income"
              onPress={() => handleTransactionsTypeSelect('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              onPress={() => handleTransactionsTypeSelect('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionType>
        </Fields>
        <Button title="Enviar"/>
      </Form>
      
    </Container>
  );
}

export default Register;