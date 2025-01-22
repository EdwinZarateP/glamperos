import './estilos.css';

const Whatsapp = () => {
  const numero: string = '573125443396';  
  const mensaje1: string = 'MASTER';       
  const mensaje2: string = '9876';       
  const mensaje3: string = '25 de enero de 2025'; 

  const enviarMensaje = async () => {
    const url = 'https://graph.facebook.com/v21.0/531912696676146/messages';
    const body = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: numero,
      type: "template",
      template: {
        name: "confirmacion",
        language: {
          code: "es"
        },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: mensaje1 },
              { type: "text", text: mensaje2 },
              { type: "text", text: mensaje3 }
            ]
          }
        ]
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer EAAQRcjELZCLIBO6P23Ecy5f0lsLWtD1wcAxL8e3Nghhdj9ZBVZBsO5y7kbDAkNfjFRgsXYzsUrhPiJQZAgCxe8ncmGS4o9hD7AxRdojtE7En4FljHzLttMq5ingprk2QOEdtZAgFAFH1NRHgIQrJrzHkdkdm2x8ZBAWYnSM4Gbjj5y5nSP7FnkwJBxZCYtrkgebAvg2VmuXY7C7tUJQ1696ZC3gZD`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      alert('Mensaje enviado con éxito');
    } else {
      alert('Error al enviar el mensaje');
    }
  };

  return (
    <div className="WhatsappContenedor">
      <h1 className="WhatsappTitulo">Enviar Mensaje WhatsApp</h1>
      <div className="WhatsappFormulario">
        <button className="WhatsappBoton" onClick={enviarMensaje}>Enviar</button>
      </div>
    </div>
  );
};

export default Whatsapp;
