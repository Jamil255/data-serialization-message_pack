import { decode, encode } from "@msgpack/msgpack";
import axios from "axios";

const fecthData = async () => {
    const response = await axios.get('http://localhost:3000/');
    console.log('Encoded Data Length:', response.data);



}


const data = { name: "Alice", age: 30 };

const postData = async () => {
    try {
        const encodedData = encode(data);

        const response = await axios.post('http://localhost:3000/hello', encodedData, {
            headers: {
                'Content-Type': 'application/x-msgpack',
                'Content-Length': encodedData.length
            },
            transformRequest: [(data) => Buffer.from(data)],
            transformResponse: [(data) => data]
        });

        console.log('Response from server:', response.data);
    } catch (error) {
        console.error('Error posting data:', error.response ? error.response.data : error.message);
    }
}

postData();

// fecthData()