


// /******* */
// "use client";
// import { useState } from "react";
// import axios from "axios"; // Import Axios
// import { useSignTx, useWalletAddress } from "bitcoin-wallet-adapter";

// type ISingleInput = {
//   address: string;
//   amount: number;
// };

// export default function FileUpload() {
//   const [userInfos, setuserInfos] = useState<ISingleInput[]>([{ address: "", amount: "" }]);
//   const [addedInputs, setAddedInputs] = useState<ISingleInput[]>([]); 
//   const walletDetails = useWalletAddress(); // Assuming you may need wallet details for the API call

//   // Handler to add a new input field
//   const addBtnHandler = () => {
//     setuserInfos(prevValue => [...prevValue, { address: "", amount: "" }]);
//   };

//   // Handler to change input values
//   const onChangeHandler = (newValue: string, changingIndex: number, toChange: "address" | "amount") => {
//     const tempState = [...userInfos];
//     tempState[changingIndex][toChange] = newValue;
//     setuserInfos(tempState);
//     console.log(tempState);
//   };

//   // Function to make the API call using Axios
//   const createPsbtHandler = async () => {
//     try {
//       const response = await axios.post('/api/create-psbt', {
//         user: userInfos,
//         wallets: walletDetails
//       });

//       console.log('PSBT created successfully:', response.data);

//       // Update addedInputs to reflect the userInfos after API call
//       setAddedInputs(userInfos);
      
//     } catch (error) {
//       console.error('Failed to create PSBT:', error);
//     }
//   };

//   return (
//     <div className="mt-16">
//       {userInfos.map((inputState, index) => (
//         <div key={index} className="flex gap-4 mb-5">
//           <input
//             className="text-black border p-2 rounded"
//             placeholder="Enter Receiver's Address"
//             value={inputState.address}
//             onChange={(e) => onChangeHandler(e.target.value, index, "address")}
//           />
//           <input
//             className="text-black border p-2 rounded"
//             placeholder="Enter Amount"
//             type="number" // Ensure this is treated as a number but keep value as string
//             min={0}
//             value={inputState.amount}
//             onChange={(e) => onChangeHandler(e.target.value, index, "amount")}
//           />
//           {userInfos.length - 1 === index && (
//             <button className="bg-blue-500 text-white p-2 rounded" onClick={addBtnHandler}>Add</button>
//           )}
//         </div>
//       ))}

//       <button 
//         className="bg-red-500 text-white p-2 rounded"
//         onClick={createPsbtHandler} // Call the API on button click
//       >
//         Create Psbt
//       </button>

//       <div className="mt-8">
//         {addedInputs.length > 0 && <h3 className="text-lg font-bold">Added Inputs:</h3>}
//         {addedInputs.map((input, index) => (
//           <div key={index} className="mt-2 text-white">
//             <p>Address: {input.address}</p>
//             <p>Amount: {input.amount}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



"use client";
import { useState } from "react";
import axios from "axios"; // Import Axios
import { useSignTx, useWalletAddress } from "bitcoin-wallet-adapter";

type ISingleInput = {
  address: string;
  amount: number;
};

export default function FileUpload() {
  const [userInfos, setuserInfos] = useState<ISingleInput[]>([{ address: "", amount: 0 }]); // Initialize amount as 0
  const [addedInputs, setAddedInputs] = useState<ISingleInput[]>([]); 
  const walletDetails = useWalletAddress(); // Assuming you may need wallet details for the API call

  // Handler to add a new input field
  const addBtnHandler = () => {
    setuserInfos(prevValue => [...prevValue, { address: "", amount: 0 }]); // Initialize amount as 0
  };

  // Handler to change input values
  const onChangeHandler = (newValue: string | number, changingIndex: number, toChange: "address" | "amount") => {
    const tempState = [...userInfos];
    // @ts-ignore
    tempState[changingIndex][toChange] = newValue;
    setuserInfos(tempState);
    console.log(tempState);
  };

  // Function to make the API call using Axios
  const createPsbtHandler = async () => {
    try {
      const response = await axios.post('/api/create-psbt', {
        user: userInfos,
        wallets: walletDetails
      });

      console.log('PSBT created successfully:', response.data);

      // Update addedInputs to reflect the userInfos after API call
      setAddedInputs(userInfos);
      
    } catch (error) {
      console.error('Failed to create PSBT:', error);
    }
  };

  return (
    <div className="mt-16">
      {userInfos.map((inputState, index) => (
        <div key={index} className="flex gap-4 mb-5">
          <input
            className="text-black border p-2 rounded"
            placeholder="Enter Receiver's Address"
            value={inputState.address}
            onChange={(e) => onChangeHandler(e.target.value, index, "address")}
          />
          <input
            className="text-black border p-2 rounded"
            placeholder="Enter Amount"
            type="number"
            min={0}
            value={inputState.amount.toString()} // Convert number to string for the input value
            onChange={(e) => onChangeHandler(Number(e.target.value), index, "amount")}
          />
          {userInfos.length - 1 === index && (
            <button className="bg-blue-500 text-white p-2 rounded" onClick={addBtnHandler}>Add</button>
          )}
        </div>
      ))}

      <button 
        className="bg-red-500 text-white p-2 rounded"
        onClick={createPsbtHandler} // Call the API on button click
      >
        Create Psbt
      </button>

      <div className="mt-8">
        {addedInputs.length > 0 && <h3 className="text-lg font-bold">Added Inputs:</h3>}
        {addedInputs.map((input, index) => (
          <div key={index} className="mt-2 text-white">
            <p>Address: {input.address}</p>
            <p>Amount: {input.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

