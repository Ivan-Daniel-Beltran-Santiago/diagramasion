import React from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

const FooterContainer = styled.div`
  margin-top: 10%;
  padding: 3em;
  padding-top: 2em;
  background-color: #e6e6e6;
  position: relative;
`;

const FText = styled.p`
  color: #454545;
`;
const FSstrong = styled.strong`
  color: #212529;
`;
const FSmall = styled.small`
  color: #454545;
`;

const FTitle2 = styled.h2`
  color: #212529;
  font-weight: bold;
`;
const FTitle3 = styled.h3`
  color: #212529;
`;

const FooterList = styled.li`
  list-style: none;
  padding: 0;
  color: #454545;
`;

const FooterLink = styled.a`
  color: #454545;
  text-decoration: none;
  &.FooterLink:hover {
    color: blue;
  }
`;

const Line = styled.hr`
  border: 2px solid #454545;
`;

const FooterEnd = styled.div`
  text-align: center;
`;

const ComponenteFooter = () => {
  return (
    <FooterContainer>
      <FTitle2>Acerca de SDT-ITH-DSE</FTitle2>
      <FText>
        Este portal tiene como proposito el facilitar la interacción entre
        estudiante, encargada y la aseguradora, con el fin de proveer la mejor
        experiencia para todas las partes involucradas en el proceso para
        solicitar un pago unico por el concepto de orfandad, ya sea el siniestro
        de parte del padre, madre o tutor legal.
      </FText>

      <div className="row">
        <div className="col-sm-6">
          <FTitle3>Anexos</FTitle3>
          <ul>
            <FooterList>
              <FooterLink
                href="../Docs/SDT-ITH-DSE AVISO DE PRIVACIDAD.pdf"
                target="_blank"
              >
                Política de Privacidad
              </FooterLink>
            </FooterList>
            <FooterList>
              <FooterLink href="http://ith.mx/" target="_blank">
                Página web Oficial ITH
              </FooterLink>
            </FooterList>
            <FooterList>
              <FooterLink href="http://www.sith.ith.mx/menu/" target="_blank">
                Pagina web SITH
              </FooterLink>
            </FooterList>
          </ul>
        </div>
        <div className="col-sm-6">
          <FTitle3>¿Necesitas ayuda?</FTitle3>
          <FText>
            Manda un correo al Departamento de Servicios Escolares para
            atenderte:
          </FText>
          <FSstrong>ventanillaith@hermosillo.tecnm.mx</FSstrong>
        </div>
      </div>
      <Line />
      <FooterEnd>
        <FText>
          Instituto Tecnológico de Hermosillo, www.hermosillo.tecnm.mx
        </FText>
        <FText>
          Av. Tecnológico 115 C.P. 83170 Colonia Sahuaro, Hermosillo Sonora,
          México
        </FText>
        <FText>Teléfono: (01 662) 2 60 65 00 ext. 114</FText>
        <FSmall>
          Copyright © 2023 Instituto Tecnológico de Hermosillo. Algunos derechos
          reservados.
        </FSmall>
      </FooterEnd>
    </FooterContainer>
  );
};

export default ComponenteFooter;
