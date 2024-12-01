require('dotenv').config(); // Load environment variables

const mqtt = require('mqtt');

// Environment variables
const BROKER_URL = process.env.BROKER_URL;
const TEST_INPUT_TOPIC = `BRE/calculateWinterSupplementInput/${process.env.MQTT_ID}`;

describe('MQTT Integration Tests', () => {
    let client;

    beforeAll((done) => {
        client = mqtt.connect(BROKER_URL);

        client.on('connect', () => {
            done(); // Signal successful connection
        });

        client.on('error', (err) => {
            console.error('Connection error:', err.message);
        });
    });

    afterAll(() => {
        if (client) {
            client.end(true, () => {
            });
        }
    });

    test('Should successfully subscribe to a topic', (done) => {
        client.subscribe(TEST_INPUT_TOPIC, (err) => {
            expect(err).toBeNull(); 
            done();
        });
    });

});
