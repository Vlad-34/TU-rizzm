import styled, { css } from "styled-components";
import { TextField } from "@mui/material";

interface Pages {
  home: boolean;
  destination: boolean;
  contact: boolean;
  offers: boolean;
}

const NavBarContainer = styled.nav`
  background: #50c878;
  width: 100vw;
  height: 60px;
  display: flex;
  position: fixed;
  z-index: 100;
`;

const Logo = styled.img`
  padding: 10px;
  width: 160px;
  height: 40px;
  &:hover {
    background: #98ff98;
    opacity: 0.8;
    cursor: pointer;
  }
`;

const Profile = styled.img`
  width: 30px;
  height: 30px;
  right: 0px;
  position: absolute;
  margin-top: 10px;
  margin-right: 10px;
  background: #98ff98;
  border-radius: 50%;
  padding: 5px;
`;

const ButtonStyle = css`
  width: auto;
  height: 45px;
  text-align: center;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 15px;
  position: absolute;
  font-size: 24px;
  &:hover {
    background: #98ff98;
    opacity: 0.8;
    cursor: pointer;
  }
`;

const Contact = styled.div<{ id: string }>`
  ${ButtonStyle}
  right: 60px;
  background: ${(props) => (props.id === "true" ? "#98FF98" : "#50c878")};
`;

const Destination = styled.div`
  ${ButtonStyle}
  right: ${(props) => (props.className === "true" ? "500px" : "410px")};
  background: ${(props) => (props.id === "true" ? "#98FF98" : "#50c878")};
`;

const Home = styled.div`
  ${ButtonStyle}
  right: ${(props) => (props.className === "true" ? "630px" : "540px")};
  background: ${(props) => (props.id === "true" ? "#98FF98" : "#50c878")};
`;

const Offers = styled.div`
  ${ButtonStyle}
  background: #50c878;
  right: 410px;
  width: auto;
  visibility: ${(props) => (props.id === "true" ? "visible" : "hidden")};
  &: hover {
    background: ${(props) => (props.id === "true" ? "#98FF98" : "#50c878")};
  }
`;

function handleScroll(id: string) {
  let elem = document.getElementById(id);
  if (elem) {
    let rect = elem.getBoundingClientRect();
    window.scrollTo({
      top: rect.top + window.pageYOffset - 200,
      behavior: "smooth",
    });
  }
  console.log(elem);
}

const NavBar = ({
  pages,
  setPages,
}: {
  pages: Pages;
  setPages: React.Dispatch<React.SetStateAction<Pages>>;
}) => {
  function handlePages(page: string) {
    let newPages: Pages = {
      home: false,
      destination: false,
      contact: false,
      offers: false,
    };
    newPages = {
      ...newPages,
      offers: page === "destination",
      [page]: true,
    };
    setPages(newPages);
  }
  return (
    <NavBarContainer>
      <link
        href="https://fonts.googleapis.com/css2?family=Staatliches&display=swap"
        rel="stylesheet"
      ></link>
      <Logo
        src="src/assets/tu-rizzm-logo.png"
        onClick={() => handlePages("home")}
      />
      <Profile src="src/assets/user.png" />
      <Contact id={`${pages.contact}`} onClick={() => handlePages("contact")}>
        CONTACT
      </Contact>
      <TextField
        id="outlined-basic"
        placeholder="Search destination..."
        variant="outlined"
        size="small"
        color="success"
        style={{
          width: "240px",
          position: "absolute",
          top: "10px",
          right: "160px",
          fontFamily: "'Staatliches', cursive",
        }}
      />
      <Offers
        onClick={() => {
          handleScroll("offers");
        }}
        id={`${pages.offers}`}
        className="offers"
      >
        OFFERS
      </Offers>
      <Destination
        id={`${pages.destination}`}
        className={`${pages.destination}`}
        onClick={() => {
          handlePages("destination");
          handleScroll("destination");
        }}
      >
        DESTINATION
      </Destination>
      <Home
        className={pages.destination.toString()}
        id={`${pages.home}`}
        onClick={() => handlePages("home")}
      >
        HOME
      </Home>
    </NavBarContainer>
  );
};

export default NavBar;
