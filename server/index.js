import axios from 'axios';
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;

app.post('/text2image', async (req, res) => {
    try {
      const { text } = req.body;
      const modelEndpoint = 'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5';
  
      // Make a POST request to the Hugging Face Text2Image API
      const response = await axios.post(modelEndpoint, { inputs: text }, {
        headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` }, // Replace YOUR_API_TOKEN with your actual API token
      });
  
      // Extract the image URL from the API response
      const imageUrl = response.data.outputs.image_url;
  
      res.json({ imageUrl });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  