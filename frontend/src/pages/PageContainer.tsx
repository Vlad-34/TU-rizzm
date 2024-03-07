import { Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Home from "./Home";
import { useEffect } from "react";
import Contact from "./Contact";
import Destination from "./Destination";

interface Pages {
  home: boolean;
  destination: boolean;
  contact: boolean;
  offers: boolean;
}

const PageStyle = styled.div`
  top: 60px;
  position: absolute;
`;

const PageContainer = ({
  pages,
  setPages,
}: {
  pages: Pages;
  setPages?: React.Dispatch<React.SetStateAction<Pages>>;
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (pages.home) {
      navigate("/");
    } else if (pages.destination) {
      navigate(`/destination`);
    } else if (pages.contact) {
      navigate(`/contact`);
    }
    console.log(pages);
  }, [pages, navigate]);
  return (
    <PageStyle>
      <Routes>
        <Route path="/" element={<Home setPages={setPages!} />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </PageStyle>
  );
};

export default PageContainer;
