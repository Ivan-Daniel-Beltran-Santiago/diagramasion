import LogoHeader from "../View/Auxiliary/Logo_Header";
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

// No sé si hacer un css aparte por cuestiones de practicidad verda

const Title = styled.h2``;
const Subtitle = styled.h3``;
const Text = styled.p``;
const Container = styled.div`padding: 2em`;

const PrivacyTerms = () => {
    return (

        <Container>
            <Title>Políticas de Privacidad</Title>
            <Text></Text>
        </Container>
    );
}

export default PrivacyTerms;