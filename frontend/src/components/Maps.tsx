function MapComponent() {
  return (
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2732.626564109985!2d23.582677176046!3d46.77225684522012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490e9b85ff8931%3A0x9a21cdd271a51c8b!2sUTCN%20Facultatea%20de%20Automatic%C4%83%20%C8%99i%20Calculatoare!5e0!3m2!1sro!2sro!4v1709819155742!5m2!1sro!2sro"
        width="100%"
        height="460px"
        style={{ border: "0" }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

export default MapComponent;
