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
} from './styles';


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
    </Container>
  );
}

export default Dashboard;