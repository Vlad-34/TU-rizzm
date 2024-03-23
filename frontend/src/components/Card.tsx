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

const ContentCard = styled.div<{ available: boolean; booking: boolean }>`
  flex-shrink: 0;
  width: 60vw;
  height: 60vh;
  background: #50c878;
  opacity: ${(props) => props.booking && (props.available ? 1 : 0.5)};
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

const InfoButton = styled.div<{ enabled: boolean }>`
  width: 200px;
  height: 50px;
  background-color: #50c878;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-left: 30px;
  margin-right: 15px;
  margin-top: 45px;
  text-shadow: none;
  pointer-events: ${(props) => (props.enabled ? 'auto' : 'none')};
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  &:hover {
    background: #98ff98;
    opacity: 0.8;
    cursor: pointer;
  }
`

const ButtonContainer = styled.div<{ enabled: boolean }>`
  &:hover {
    cursor: ${(props) => (props.enabled ? 'pointer' : 'not-allowed')};
  }
`

const Cards = ({ values, id, booking }: { values: CardInfo[]; id?: string; booking: boolean | null | undefined }) => {
  return (
    <ContentContainer id={id}>
      {values.map((item) => {
        const img = item.image
        return (
          <ContentCard key={item.name} available={item.available ?? false} booking={booking ?? false}>
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
              <ButtonContainer enabled={item.available ?? false}>
                {booking ? (
                  <InfoButton
                    enabled={item.available ?? false}
                    onClick={() => {
                      localStorage.setItem('destination', JSON.stringify(item))
                      window.location.pathname = '/booking'
                    }}
                  >
                    Book{' '}
                  </InfoButton>
                ) : (
                  <InfoButton
                    enabled={true}
                    onClick={() => {
                      localStorage.setItem('id', JSON.stringify(item.id))
                      window.location.pathname = '/reservations'
                    }}
                  >
                    Reservations{' '}
                  </InfoButton>
                )}
              </ButtonContainer>
            </div>
            <DestinationImage src={`http://localhost:8000${img}`} />
          </ContentCard>
        )
      })}
    </ContentContainer>
  )
}

export default Cards
