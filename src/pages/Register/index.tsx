import React, { useState, useEffect } from 'react';
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import InputForm from '../../components/Forms/InputForm';
import Button from '../../components/Forms/Button';
import TransactionTypeButton from '../../components/Forms/TransactionTypeButton';
import CategorySelectButton from '../../components/Forms/CategorySelectButton';
import CategorySelect from '../../pages/CategorySelect';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionType,
} from './styles';
import { useNavigation } from '@react-navigation/core';


interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome Obrigatorio'),
  amount: Yup
    .number()
    .typeError('O preço deve ser um numero')
    .positive('o valor deve ser positivo')
    .required('preço Obrigatorio'),
})
const Register: React.FC = () => {

  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });
  const {control,handleSubmit, reset, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  })
  const dataKey = '@finances:transactions';
  const navigation = useNavigation();

  function handleTransactionsTypeSelect(type: 'positive' | 'negative'){
    setTransactionType(type);
  }

  function handleCloseSelectCategoryModal(){
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true);
  }
  
  async function handleRegister(form: FormData){

    if(!transactionType){
      return Alert.alert('selecione o tipo da transação');
    }

    if(category.key === 'category'){
      return Alert.alert('selecione uma categoria');
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];
      const dataFormatted = [
        ...currentData,
        newTransaction
      ]
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      setTransactionType('');
      setCategory({
          key: 'category',
          name: 'Categoria',
        });
      reset();
      navigation.navigate('Listagem');
      
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possivel salvar")
    }
    
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              control={control}
              name="amount" 
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <TransactionType>         
              <TransactionTypeButton
                type="up"
                title="Income"
                onPress={() => handleTransactionsTypeSelect('positive')}
                isActive={transactionType === 'positive'}
              />
              <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleTransactionsTypeSelect('negative')}
                isActive={transactionType === 'negative'}
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
    </TouchableWithoutFeedback>
  );
}

export default Register;