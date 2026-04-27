// AXIOS POST MSGPACK BLUEPRINT
// This is a clean, working example for posting MsgPack data using Axios

import axios from 'axios';
import { encode } from '@msgpack/msgpack';

// ============================================
// BLUEPRINT 1: Basic POST with MsgPack
// ============================================
async function postBasic() {
    try {
        const payload = {
            name: "Ahmed",
            email: "ahmed@example.com",
            age: 25
        };

        // Step 1: Encode data to MsgPack
        const encodedData = encode(payload);
        console.log('Encoded size:', encodedData.length, 'bytes');

        // Step 2: POST to server
        const response = await axios.post('http://localhost:3000/hello', encodedData, {
            headers: {
                'Content-Type': 'application/x-msgpack'
            }
        });

        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// ============================================
// BLUEPRINT 2: POST with Array of Objects
// ============================================
async function postArray() {
    try {
        const users = [
            { id: 1, name: "Ali", status: "active" },
            { id: 2, name: "Fatima", status: "inactive" },
            { id: 3, name: "Hassan", status: "active" }
        ];

        const encodedData = encode(users);

        const response = await axios.post('http://localhost:3000/hello', encodedData, {
            headers: {
                'Content-Type': 'application/x-msgpack'
            }
        });

        console.log('Array Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// ============================================
// BLUEPRINT 3: POST with Error Handling
// ============================================
async function postWithErrorHandling() {
    try {
        const payload = {
            timestamp: new Date(),
            action: "create_user",
            details: { username: "jamil" }
        };

        const encodedData = encode(payload);

        const response = await axios.post('http://localhost:3000/hello', encodedData, {
            headers: {
                'Content-Type': 'application/x-msgpack'
            },
            timeout: 5000 // 5 second timeout
        });

        if (response.status === 200) {
            console.log('Success:', response.data);
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            // Server responded with error status
            console.error('Server Error:', error.response.status, error.response.data);
        } else if (error.request) {
            // Request made but no response
            console.error('No Response from server');
        } else {
            // Error in request setup
            console.error('Request Error:', error.message);
        }
    }
}

// ============================================
// BLUEPRINT 4: POST with Axios Instance
// ============================================
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/x-msgpack'
    }
});

async function postWithInstance() {
    try {
        const payload = { message: "Hello from instance" };
        const encodedData = encode(payload);

        const response = await axiosInstance.post('/hello', encodedData);
        console.log('Instance Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Instance Error:', error.message);
    }
}

// ============================================
// BLUEPRINT 5: Batch POST Multiple Items
// ============================================
async function postBatch() {
    try {
        const items = [
            { id: 1, value: "item1" },
            { id: 2, value: "item2" },
            { id: 3, value: "item3" }
        ];

        for (const item of items) {
            const encodedData = encode(item);
            const response = await axios.post('http://localhost:3000/hello', encodedData, {
                headers: {
                    'Content-Type': 'application/x-msgpack'
                }
            });
            console.log(`Posted item ${item.id}:`, response.data);
        }
    } catch (error) {
        console.error('Batch Error:', error.message);
    }
}

// ============================================
// USAGE EXAMPLE - Uncomment one to run
// ============================================

// Test 1: Basic POST
// postBasic();

// Test 2: Array POST
// postArray();

// Test 3: With Error Handling
// postWithErrorHandling();

// Test 4: With Axios Instance
// postWithInstance();

// Test 5: Batch POST
// postBatch();

export { postBasic, postArray, postWithErrorHandling, postWithInstance, postBatch };
