import exprees from 'express';
import { encode, decode } from "@msgpack/msgpack"
import { data } from './sample.js';
const app = exprees();


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





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});