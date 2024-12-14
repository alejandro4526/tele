// Conexión al broker MQTT
const client = mqtt.connect('wss://n1781645.ala.us-east-1.emqxsl.com:8084/mqtt', {
    username: 'cochabamba',
    password: 'bolivia',
    rejectUnauthorized: false
});

let ledState = 'off'; // Estado inicial del LED

// Mensajes de conexión
client.on('connect', () => {
    console.log('Conectado al broker MQTT');
});

client.on('error', (err) => {
    console.error('Error de conexión:', err);
});

// Función para alternar el estado del LED
function toggleLED() {
    ledState = ledState === 'off' ? 'on' : 'off';
    client.publish('test/led', ledState, { qos: 2, retain: true }, (err) => {
        if (err) {
            console.error('Error al enviar mensaje:', err);
        } else {
            console.log(`LED ${ledState}`);
            const ledButton = document.getElementById('ledButton');
            if (ledButton) {
                ledButton.innerText = ledState === 'on' ? 'Apagar LED' : 'Encender LED';
            }
        }
    });
}

// Exportar la función para usarla en el archivo HTML
export { toggleLED };
