import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Cards from './dBCards.js'

// App Config
const app = express()
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://nthecephy:0WelpE0wtVgeILwJ@cluster0.4c4rh.mongodb.net/dating?retryWrites=true&w=majority'

// Middleware
app.use(express.json()); // Needed to parse JSON request bodies
app.use(Cors())


// DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Database connected successfully"))
.catch((error) => console.log("Database connection error:", error))

// API endpoints
app.get("/", (req, res) => res.status(200).send("Hello ... greater .. Delaware! !! !"))

app.post('/dating/cards', async (req, res) => {
    const dbCard = req.body;
    console.log("Received new card data:", dbCard); // Log the incoming data
    
    try {
        const data = await Cards.create(dbCard); // Using async/await
        res.status(201).send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

//an API endpoint. Specifically, it is a GET endpoint.
app.get('/dating/cards', async (req, res) => {
    try {
      const data = await Cards.find();  // Fetch all documents from the 'Cards' collection
      const formattedData = data.map(card => ({
        id: card._id.toString(),  // Convert _id to a string and map it to 'id'
        name: card.name,
        url: card.url
      }));
      console.log("Fetched Data from MongoDB:", formattedData);
      res.status(200).send(formattedData);  // Send the formatted data to the frontend
    } catch (err) {
      console.error("Error fetching data:", err);
      res.status(500).send(err);  // Send an error response
    }
  });

// Listener
app.listen(port, () => console.log(`Listening on localhost:${port}`))
