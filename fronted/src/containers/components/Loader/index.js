import React from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";

const MainContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: auto;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  zindex: 1;
`;

export default function Loader() {
  return (
    <MainContainer>
      <Spinner animation="border" variant="primary" role="status" />
    </MainContainer>
  );
}
