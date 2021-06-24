import React, { useState } from 'react';
import { Modal } from 'react-native';
import { useForm } from 'react-hook-form';

import InputForm from '../../components/Forms/InputForm';
import Button from '../../components/Forms/Button';
import TransactionTypeButton from '../../components/Forms/TransactionTypeButton';
import CategorySelectButton from '../../components/Forms/CategorySelectButton';
import CategorySelect from '../../pages/CategorySelect';

import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionType,
} from './styles';

interface FormData {
  name: string;
  amount: string;
}

const Register: React.FC = () => {

  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });
  const {control,handleSubmit} = useForm()

  function handleTransactionsTypeSelect(type: 'up' | 'down'){
    setTransactionType(type);
  }

  function handleCloseSelectCategoryModal(){
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true);
  }
  
  function handleRegister(form: FormData){
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }
    console.log(data)
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm
            control={control}
            name="name" 
            placeholder="Nome"
          />
          <InputForm
            control={control}
            name="amount" 
            placeholder="Preço"
          />
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
          <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal}/>
        </Fields>
        <Button title="Enviar" onPress={handleSubmit(handleRegister)}/>
      </Form>
      
      <Modal visible={categoryModalOpen}>
        <CategorySelect 
          category={category}
          setCategory={setCategory}
          closeSelectCategory={() => handleCloseSelectCategoryModal()}
        />
      </Modal>
    </Container>
  );
}

export default Register;