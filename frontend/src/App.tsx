import { useState } from "react";
import { createGlobalStyle } from "styled-components";
import NavBar from "./components/Navbar";
import PageContainer from "./pages/PageContainer";
import { BrowserRouter } from "react-router-dom";

interface Pages {
  home: boolean;
  destination: boolean;
  contact: boolean;
  offers: boolean;
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #F8F8FF;
    font-family: 'Staatliches', sans-serif;
    color: #1E1E1E;
  }
  /* Make scrollbar invisible */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

function App() {
  const [pages, setPages] = useState<Pages>({
    home: true,
    destination: false,
    contact: false,
    offers: false,
  });

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Staatliches"
        rel="stylesheet"
      ></link>
      <GlobalStyle />
      <NavBar pages={pages} setPages={setPages} />
      <BrowserRouter>
        <PageContainer pages={pages} setPages={setPages} />
      </BrowserRouter>
    </>
  );
}

export default App;
