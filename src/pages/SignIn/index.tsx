import React from 'react';
import { Alert } from 'react-native';

import appleSvg from '../../assets/apple.svg';
import googleSvg from '../../assets/google.svg';
import SignInSocialButton from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';

import { 
  Container,
  Header,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper
} from './styles';

function SignIn() {
  const { user, signInWithGoogle } = useAuth();

  async function handleSignInWithGoogle(){

    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possivel conectar a conta google')
    }
  }
  return (
    <Container>
      <Header>
        <Title>
          Controle suas {'\n'}
          finanças de forma {'\n'}
          muito Simples {'\n'}
        </Title>
        <SignInTitle>
          Faça seu login com
          uma das contas abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com google"
            svg={googleSvg}
            onPress={handleSignInWithGoogle}
          />
          <SignInSocialButton
            title="Entrar com apple"
            svg={appleSvg}
          />
        </FooterWrapper>
      </Footer>
    </Container>
  );
};

export default SignIn;
