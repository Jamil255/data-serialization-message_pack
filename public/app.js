import { decode, encode } from "@msgpack/msgpack";
import axios from "axios";

const fecthData = async () => {
    const response = await axios.get('http://localhost:3000/');
    // const decodedData = decode(new Uint8Array(response.data));
    console.log(response.data);
}

fecthData();