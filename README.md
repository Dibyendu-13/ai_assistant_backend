# RAG AI Assistant using Hume AI

## Overview
This project is a server-side application built using Node.js, Express, and various other libraries to handle file uploads, process PDFs to extract text, generate embeddings using Cohere's API, configure Hume AI's EVI for specific text prompts, and manage vector upserts using Pinecone. The project also supports real-time user input handling via WebSockets.

## Features
- **File Upload**: Upload and process PDF files.
- **PDF Text Extraction**: Extract text from uploaded PDFs using `pdf-parse`.
- **Embedding Generation**: Generate embeddings for extracted text using Cohere's embedding service.
- **Hume AI Configuration**: Configure an AI agent (EVI) with extracted information.
- **Vector Upsert to Pinecone**: Store generated embeddings into a Pinecone vector database.
- **WebSocket Support**: Real-time communication for handling user input.

## Technologies Used
- **Node.js & Express**: Backend framework and server.
- **Multer**: Middleware for handling file uploads.
- **pdf-parse**: PDF text extraction.
- **Cohere API**: Generating embeddings.
- **Hume AI API**: Configuring EVI (Enhanced Voice Interaction).
- **Pinecone**: Vector database service.
- **Socket.io**: WebSocket library for real-time communication.

## Project Structure
```plaintext
project-directory/
|-- app.js
|-- controllers/
|   |-- pdfController.js
|   |-- audioController.js
|-- services/
|   |-- embeddingService.js
|   |-- humeService.js
|   |-- pineconeService.js
|-- config/
|-- uploads/ (temporary storage for uploaded files)
|-- server.js
```

## Installation and Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Dibyendu-13/ai_assistant_backend
   cd ai_assistant_backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the root directory and add the following:
   ```plaintext
   COHERE_API_KEY=<your-cohere-api-key>
   HUME_API_KEY=<your-hume-api-key>
   HUME_API_KEY=<your-hume-secret-key>
   PINECONE_API_KEY=<your-pinecone-api-key>
   ```

4. **Run the Server**:
   ```bash
   node server.js
   ```
   The server will start on `http://localhost:4000`.

## API Endpoints
### Upload PDF
- **POST** `/upload-pdf`
- **Description**: Uploads a PDF, extracts text, configures Hume EVI, and generates embeddings.
- **Payload**: `multipart/form-data` with a file.
- **Response**:
  ```json
  {
    "success": true,
    "text": "Extracted text content from the PDF."
  }
  ```

## WebSocket Integration
- **Event**: `userInput`
- **Description**: Handles real-time user input through WebSocket.
- **Usage**: Connect a WebSocket client to `ws://localhost:4000` and emit `userInput` events.

## Key Functionalities
### PDF Controller (`controllers/pdfController.js`)
- Handles PDF uploads and processing.
- Extracts text using `pdf-parse`.
- Configures Hume EVI with extracted content.
- Generates and upserts embeddings to Pinecone.

### Embedding Service (`services/embeddingService.js`)
- Calls Cohere API to generate embeddings.
- Ensures the returned vector matches expected dimensions (4096).

### Hume Service (`services/humeService.js`)
- Configures Hume's EVI using extracted text.
- Sets up personalized configurations for AI interactions.

### Pinecone Service (`services/pineconeService.js`)
- Upserts vectors into Pinecone with metadata.
- Generates unique IDs for vector entries.

## How It Works
1. **User uploads a PDF** through the `/upload-pdf` endpoint.
2. **Text is extracted** from the PDF.
3. The **text is configured** in Hume EVI.
4. **Embeddings are generated** using Cohere's API.
5. **Embeddings are upserted** into Pinecone for future retrieval.
6. Users can interact with the server via **WebSocket** for real-time input handling.

## Error Handling
- Checks for missing files during PDF upload.
- Handles embedding dimension mismatches.
- Logs detailed errors for debugging and responds with clear client messages.

## Dependencies
- `express`
- `cors`
- `multer`
- `pdf-parse`
- `axios`
- `socket.io`
- `@pinecone-database/pinecone`
- `uuid`

## Future Enhancements
- Add authentication for API endpoints.
- Implement better storage solutions for uploaded files.
- Expand to handle additional file types.

## License
This project is licensed under the [MIT License](LICENSE).

## Author
Developed by [Dibyendu](https://github.com/Dibyendu-13).

