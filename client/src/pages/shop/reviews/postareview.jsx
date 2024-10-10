// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { useFetchProductByIdQuery } from '../../../api'; // Assuming this import

// const Postareview = ({ isModelopen, handleClose }) => {
//   const { id } = useParams();
//   const { user } = useSelector((state) => state.auth);
//   const [rating, setRating] = useState(0);
//   const { refetch } = useFetchProductByIdQuery(id, { skip: !id });

//   const handleRating = (value) => {
//     setRating(value);
//   };

//   return (
//     <div className={`fixed inset-0 bg-black/90 flex items-center justify-center z-40 px-2 ${isModelopen ? 'block' : 'hidden'}`}>
//       <div className='bg-white p-6 rounded-md shadow-lg w-96 z-50'>
//         <h2 className='text-lg font-medium mb-4'>Post a review</h2>
//         <div className='flex items-center mb-4'>
//           { [1, 2, 3, 4, 5].map((star) => (
//               <span 
//                 className='cursor-pointer text-yellow-500 text-lg'
//                 key={star}
//                 onClick={() => handleRating(star)}
//               >
//                 {rating >= star ? <i className='ri-star-fill'></i> : <i className='ri-star-line'></i>}
//               </span>
//             ))
//           }
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Postareview;
