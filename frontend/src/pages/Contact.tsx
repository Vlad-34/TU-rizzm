import styled from 'styled-components'
import Maps from '../components/Maps'

const InfoContainer = styled.div`
  position: absolute;
  top: 90px;
  left: 140px;
  right: 140px;
  bottom: 90px;
  display: flex;
`

const ContactInfo = styled.div`
  margin-left: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
  display: block;
`

const MapInfo = styled.div`
  margin-left: 100px;
  min-width: 550px;
  height: 460px;
  background-color: #d9d9d9;
  position: relative;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

const ContactCard = styled.div`
  margin-bottom: 20px;
  background: #50c878;
  padding: 20px;
  width: 550px;
  height: 100px;
  justify-content: left;
  align-items: center;
  display: flex;
  font-size: 30px;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

const ContactIcon = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 20px;
`

const Contact = () => {
  return (
    <InfoContainer>
      <ContactInfo>
        <ContactCard>
          <ContactIcon src='src/assets/placeholder.png' />
          Str. George Baritiu 8 - 400 027
        </ContactCard>
        <ContactCard>
          <ContactIcon src='src/assets/email.png' />
          contact@turizzm.com
        </ContactCard>
        <ContactCard>
          <ContactIcon src='src/assets/phone.png' />
          +40-264-401218
        </ContactCard>
      </ContactInfo>
      <MapInfo>
        <Maps />
      </MapInfo>
    </InfoContainer>
  )
}
export default Contact
