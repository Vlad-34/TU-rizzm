import styled from "styled-components";

interface Pages {
  home: boolean;
  destination: boolean;
  contact: boolean;
  offers: boolean;
}

const InfoContainer = styled.div`
  position: absolute;
  top: 60px;
  left: 140px;
  right: 140px;
  bottom: 90px;
  display: flex;
`;

const PresentationContainer = styled.div`
  margin-left: 0px;
  margin-top: 0px;
  width: 500px;
  height: 460px;
  padding: 20px;
  font-size: 30px;
  text-align: center;
  justify-content: center;
  position: absolute;
  text-shadow: 1.5px 1.5px 2px rgba(0, 0, 0, 0.5);
`;

const PictureContainer = styled.div`
  position: absolute;
  top: 100px;
  left: 640px;
  right: 140px;
  bottom: 90px;
  background-color: #d9d9d9;
  position: absolute;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const InfoButton = styled.div`
  width: 200px;
  height: 50px;
  background-color: #50c878;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-left: 150px;
  text-shadow: none;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  &:hover {
    background: #98ff98;
    opacity: 0.8;
    cursor: pointer;
  }
`;

const ImageStyle = styled.img`
  width: auto;
  height: 350px;
  position: relative;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Home = ({
  setPages,
}: {
  setPages: React.Dispatch<React.SetStateAction<Pages>>;
}) => {
  return (
    <InfoContainer>
      <PresentationContainer>
        <h1>Explore Beyond the Horizon: Where Adventures Await!</h1>
        <p>Discover Your Path to Unforgettable Journeys! Book with us!</p>
        <InfoButton
          onClick={() =>
            setPages({
              home: false,
              destination: true,
              contact: false,
              offers: true,
            })
          }
        >
          See More!
        </InfoButton>
      </PresentationContainer>
      <PictureContainer id="picture">
        <ImageStyle src="src/assets/pictureA.png" alt="travel" />
      </PictureContainer>
    </InfoContainer>
  );
};
export default Home;
