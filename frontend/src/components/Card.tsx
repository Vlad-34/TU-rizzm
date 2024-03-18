import styled from 'styled-components'
import { CardInfo } from '../dataTypes/interfaces'

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
  &::-webkit-scrollbar {
    display: block;
    width: 10px; /* Add width to make scrollbar visible */
  }
  &::-webkit-scrollbar-thumb {
    background: #888; /* Add color to the scrollbar */
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555; /* Add hover color to the scrollbar */
  }
  -ms-overflow-style: scrollbar; /* IE and Edge */
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #888 #f8f8ff; /* Firefox scrollbar color */
`

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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  p {
    display: flex;
    align-items: center;
  }
`

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`

const DestinationImage = styled.img`
  width: 40vw;
  height: 60vh;
  border-radius: 15px;
`

const Cards = ({ values, id }: { values: CardInfo[]; id?: string }) => {
  return (
    <ContentContainer id={id}>
      {values.map((item) => {
        const img = item.image
        return (
          <ContentCard key={item.name}>
            <div style={{ width: '40vw', marginRight: '40px' }}>
              <h1>{item.name}</h1>
              <p>{item.description}</p>
              <p>
                <Icon src='src/assets/placeholder.png' />
                {item.location}
              </p>

              {item.offer !== 0 && item.offer !== null && item.offer !== undefined && (
                <p style={{ color: '#d2042d' }}>
                  <Icon src='src/assets/price-tag.png' />
                  Offer: {item.offer}% off
                </p>
              )}
              <p>
                <Icon src='src/assets/price-tag.png' />${item.price} / night
              </p>
              <p>
                <Icon src='src/assets/user.png' />
                {item.capacity} people
              </p>
            </div>
            <DestinationImage src={`http://localhost:8000${img}`} />
          </ContentCard>
        )
      })}
      {}
    </ContentContainer>
  )
}

export default Cards
