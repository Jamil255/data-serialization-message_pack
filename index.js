import express from 'express';
import { encode, decode } from "@msgpack/msgpack"
import { data } from './sample.js';
const app = express();


const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    const jsonData = JSON.stringify(data);
    const encodedData = encode(data);
    console.log('Encoded Data Length:', encodedData);
    console.log('JSON Data Length:', jsonData);

    const decodedData = decode(encodedData);
    console.log(decodedData);
    // return res.send(encodedData);
    return res.json(data);

});


app.post("/hello", express.raw({ type: 'application/x-msgpack' }), (req, res) => {
    console.log('Received Raw Body:', req.body);
    const encodedData = req.body;
    const decodedData = decode(encodedData);
    console.log('Decoded Data:', decodedData);

    return res.json({ success: true, message: "Data Received and Decoded", data: decodedData });
});





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});