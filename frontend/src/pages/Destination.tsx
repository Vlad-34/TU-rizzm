import styled from "styled-components";
import DatePickerValues from "../components/DatePicker";

interface CardInfo {
  title: string;
  description: string;
  offer?: string;
  location: string;
  price: number;
  capacity: number;
  img: string;
}

const destinations: CardInfo[] = [
  {
    title: "Beach Resort",
    description: "Enjoy the sun and the beach",
    location: "Miami, Florida",
    price: 200,
    capacity: 100,
    img: "src/assets/beach-resort.png",
  },
  {
    title: "Mountain Resort",
    description: "Enjoy the mountain view and the fresh air",
    location: "Denver, Colorado",
    price: 150,
    capacity: 50,
    img: "src/assets/mountain-resort.png",
  },
  {
    title: "City Resort",
    description: "Enjoy the city view and the night life",
    location: "New York, New York",
    price: 300,
    capacity: 200,
    img: "src/assets/city-resort.png",
  },
];

const offers: CardInfo[] = [
  {
    title: "Beach Resort",
    description: "Enjoy the sun and the beach",
    offer: "20% off",
    location: "Miami, Florida",
    price: 200,
    capacity: 100,
    img: "src/assets/beach-resort.png",
  },
  {
    title: "Mountain Resort",
    description: "Enjoy the mountain view and the fresh air",
    offer: "10% off",
    location: "Denver, Colorado",
    price: 150,
    capacity: 50,
    img: "src/assets/mountain-resort.png",
  },
  {
    title: "City Resort",
    description: "Enjoy the city view and the night life",
    offer: "30% off",
    location: "New York, New York",
    price: 300,
    capacity: 200,
    img: "src/assets/city-resort.png",
  },
];

const DatePickerContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100vw;
  height: auto;
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 100;
  background: #f8f8ff;
  opacity: 0.9;
`;

const ContentContainer = styled.div`
  width: 87vw;
  height: 70vh;
  background: #f8f8ff;
  position: relative;
  margin-top: 150px;
  display: flex;
  justify-content: start;
  overflow-x: scroll;
  padding-left: 100px;
  padding-right: 100px;
  /* Make scrollbar invisible */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const ContentCard = styled.div`
  flex-shrink: 0;
  width: 60vw;
  height: 60vh;
  background: #50c878;
  padding: 20px;
  padding-left: 40px;
  top: 100px;
  font-size: 20px;
  margin-right: 20px;
  border-radius: 15px;
  display: flex;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  p {
    display: flex;
    align-items: center;
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const DestinationImage = styled.img`
  width: 40vw;
  height: 60vh;
  border-radius: 15px;
`;

const Cards = ({ values, id }: { values: CardInfo[]; id?: string }) => {
  return (
    <ContentContainer id={id}>
      {values.map((item) => {
        return (
          <ContentCard key={item.title}>
            <div style={{ width: "40vw", marginRight: "40px;" }}>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <p>
                <Icon src="src/assets/placeholder.png" />
                {item.location}
              </p>

              {item.offer && (
                <p style={{ color: "#d2042d" }}>
                  <Icon src="src/assets/price-tag.png" />
                  Offer: {item.offer}
                </p>
              )}
              <p>
                <Icon src="src/assets/price-tag.png" />${item.price} / night
              </p>
              <p>
                <Icon src="src/assets/user.png" />
                {item.capacity} people
              </p>
            </div>
            <DestinationImage src={item.img} alt="resort" />
          </ContentCard>
        );
      })}
    </ContentContainer>
  );
};

const Destination = () => {
  return (
    <>
      <DatePickerContainer>
        <DatePickerValues />
      </DatePickerContainer>
      <Cards id="destination" values={destinations} />
      <Cards id="offers" values={offers} />
    </>
  );
};
export default Destination;
