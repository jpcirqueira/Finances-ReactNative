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
} from './styles';
import HighlightCard from '../../components/HighlightCard';

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
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />
      </HighlightCards>
      
    </Container>
  );
}

export default Dashboard;