// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import { HiInformationCircle } from 'react-icons/hi';

// // Define the custom styles for the modal
// const customModalStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     borderRadius: '0.5rem',
//     padding: '2rem',
//     border: 'none',
//     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
//     maxWidth: '1000px',
//     width: '100%',
//   },
//   overlay: {
//     backgroundColor: 'rgba(0, 0, 0, 0.75)',
//     zIndex: 1000,
//   },
// };

// const MoreFactsButton = () => {
//   // Define a state variable to track whether the modal is open
//   const [modalIsOpen, setModalIsOpen] = useState(false);

//   function validateAndReturnImages(images){
//     // console.log('products', images)
//     if (images == null) {
//       return [];
//     }
//     else if (images == "undefined") {
//       // console.log('condiotion2')
//       return [];
//     }
//     else if (images == undefined) {
//       // console.log('condiotion2')
//       return [];
//     }
//     else{
//       // console.log('condiotion3')
//       return JSON.parse(window.sessionStorage.getItem("subImages"));
//     }
//    }

//   let Products =validateAndReturnImages(window.sessionStorage.getItem("subImages"))
    

//   //  console.log('records', Products)

  
 
//   // Define a function to handle clicking the "More Facts" button
//   const handleButtonClick = () => {
//     setModalIsOpen(true);
//   };

//   return (
//     <div className="absolute">
//       <button
//         onClick={handleButtonClick}
     
//       >
//         <HiInformationCircle size={40} />
//       </button>
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={() => setModalIsOpen(false)}
//         style={customModalStyles}
//         contentLabel="More Facts Modal"
//       >
//         <div className="text-center ">
//           <h2 className="text-2xl font-bold mb-4">More Facts</h2>
//          <div className=' grid grid-cols-2 gap-x-2 '>
//           {Products.followImage &&
//             Products.followImage.map((product) => {
//                 return (
//           <img src={product.image} alt=""  className="h-80 w-75 border-double border-4 border-pink" />
//                 );
//         })}
//         </div>
//           <button
//             onClick={() => setModalIsOpen(false)}
//             className="mt-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8 py-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 "
//           >
//             Close
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default MoreFactsButton;
