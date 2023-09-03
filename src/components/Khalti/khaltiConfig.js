import axios from 'axios';
import myKey from './khaltiKey'
import { useNavigate } from 'react-router-dom';
 

let khaltiConfig = {
    // replace this key with yours
    "publicKey": myKey.publicTestKey,
    "productIdentity": "64b0215eabac68b3a947a07c",
    "productName": "Drogon",
    "productUrl": "http://localhost:3000/products/64b0215eabac68b3a947a07c",
    "eventHandler": {
        onSuccess (payload) {
            // hit merchant api for initiating verfication
            console.log(payload);
            let data = {
                "token": payload.token,
                "amount": payload.amount,
            };
            let config = {
                headers: {"Authorization": myKey.secretKey}
            };
            axios.post("http://localhost:5000/user/khalti", data, config)
            .then(response => {
                console.log(response.data);
                
            })
            .catch(error=> {
                console.log(error)
            });
        },
        // onError handler is optional
        onError (error) {
            // handle errors    
            console.log(error);
        },
        onClose () {
            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};

export default khaltiConfig;