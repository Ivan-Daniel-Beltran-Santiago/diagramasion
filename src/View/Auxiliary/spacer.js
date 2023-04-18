import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const Spacer = styled.div`
  height: ${props => props.height || '80px'}; 
  background-color: ${props => props.backgroundColor || 'white'}; 
`;

export default Spacer;