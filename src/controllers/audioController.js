const delay = require('../utils/delay');
const { HumeClient } = require('hume');

const humeClient = new HumeClient({
    apiKey: process.env.HUME_API_KEY,
    secretKey: process.env.HUME_SECRET_KEY,
});

const audioController = {
    isProcessing: false, // Move this to the object state

    handleUserInput: async (socket, input) => {
        if (audioController.isProcessing) {
            socket.emit('error', 'Please wait for the current conversation to finish before sending a new message.');
            return; // Prevent new input if currently processing
        }

        audioController.isProcessing = true; // Set processing flag

        try {
            await delay(1000); // Wait for 1 second before processing

            const response = await humeClient.empathicVoice.chat.connect();
            await response.tillSocketOpen();

            const promptWithContext = `As a health coach based on Andrew Huberman, ${input}`;
            response.sendUserInput(promptWithContext);

            response.on('message', (message) => {
                console.log('Received message from Hume:', message);
                if (message.type === 'audio_output') {
                    const audioBuffer = Buffer.from(message.data, 'base64');
                    const responseText = audioBuffer.toString('base64');

                    socket.emit('audioOutput', responseText); // Emit the audio output
                } else if (message.type === 'assistant_end') {
                    audioController.isProcessing = false; // Reset when the assistant ends the conversation
                }
            });
        } catch (error) {
            console.error('Error in Hume connection:', error);
            socket.emit('error', 'An error occurred while processing your request.');
            audioController.isProcessing = false; // Ensure processing flag is reset on error
        }
    }
};

module.exports = audioController;
