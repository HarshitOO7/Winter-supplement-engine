const mqtt = require('mqtt');
const { processRules } = require('./helpers/rulesEngine');

//change MQTT id here
const MQTT_ID = '3b5503a4-3877-494c-ac0a-5dba1c59ce65';

// Constants
const BROKER_URL = 'mqtt://test.mosquitto.org:1883';
const INPUT_TOPIC = `BRE/calculateWinterSupplementInput/${MQTT_ID}`;

// Connect to MQTT broker
const client = mqtt.connect(BROKER_URL);

client.on('connect', () => {
    console.log('Successfully connected to the MQTT broker.');

    // Subscribe to the input topic
    client.subscribe(INPUT_TOPIC, (err) => {
        if (err) {
            console.error('Subscription error:', err);
        } else {
            console.log(`Subscribed to topic: ${INPUT_TOPIC}`);
        }
    });
});

