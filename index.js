const mqtt = require('mqtt');
const { processRules } = require('./helpers/rulesEngine');

//change MQTT id here
const MQTT_ID = '5dd4164f-32a3-4075-a5a4-ad1add5d472b';

// Constants
const BROKER_URL = 'mqtt://test.mosquitto.org:1883';
const INPUT_TOPIC = `BRE/calculateWinterSupplementInput/${MQTT_ID}`;
const OUTPUT_TOPIC = `BRE/calculateWinterSupplementOutput/${MQTT_ID}`;

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

//Incoming messages
client.on('message', (topic, message) => {
    try {
        console.log(`Message received on topic: ${topic}`);
        
        // Parse the message and process the rules
        const input = JSON.parse(message.toString());
        console.log(`Input JSON:`, input);

        const output = processRules(input);
        console.log(`Processed Output:`, output);

        // Publish the results to the output topic
        client.publish(OUTPUT_TOPIC, JSON.stringify(output), (err) => {
            if (err) {
                console.error(`Error publishing to ${OUTPUT_TOPIC}:`, err);
            } else {
                console.log(`Published result to ${OUTPUT_TOPIC}`);
            }
        });
    } catch (err) {
        console.error('Error processing message:', err.message);
    }
});

// Handle connection errors
client.on('error', (error) => {
    console.error('Connection error:', error.message);
    client.end(); 
});


