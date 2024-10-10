// import React, { useState } from 'react';
// import commentorIcon from '../../../assets/avatar.png';
// import { FormDate } from '../../../utils/formateDate';
// import Ratingstaer from '../../../compents/RatingStar';

// const ReviewCart = ({ productReviews }) => {
//     const [isMOdelopen, setIsmodelOpen] = useState(false);
//     const reviews = productReviews || [];

//     const handleOpenReviewModel = () => {
//         setIsmodelOpen(true);
//     };

//     const handleCloseReviewModel = () => {
//         setIsmodelOpen(false);
//     };

//     return (
//         <div className="my-6 bg-white p-8">
//             <div>
//                 {reviews.length > 0 ? (
//                     <div>
//                         <h3 className="text-lg font-medium">All comments...</h3>
//                         {reviews.map((review, index) => (
//                             <div key={index} className="mt-4">
//                                 <div className='flex gap-4 items-center'>
//                                     <img src={commentorIcon} alt="" className='size-14' />
//                                     <div className='space-y-1'>
//                                         <p className='text-lg font-medium underline capitalize underline-offset-4'>{review?.userId?.username}</p>
//                                         <p className='text-[12px] italic'>{FormDate(review?.createdAt)}</p>
//                                         <Ratingstaer rating={review?.rating} />
//                                     </div> 
//                                 </div>
//                                 <div className='text-gray-600 mt-5 border p-8'>
//                                     <p className='md:w-4/5'>{review?.comment}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <p>No reviews</p>
//                 )}
//             </div>
//             <div>
//                 <button 
//                     onClick={handleOpenReviewModel}
//                     className='px-6 py-3 bg-primary text-white rounded-md'>
//                     Add a review
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ReviewCart;
