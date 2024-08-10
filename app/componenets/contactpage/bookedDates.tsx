// 'use client';
// import React, { useEffect, useState } from 'react';
// import { Card, CardBody } from '@nextui-org/react';
// import { CalendarIcon } from '@mui/x-date-pickers';
// import dayjs from 'dayjs';
// const BookedDates = () => {
//   const [bookedDates, setBookedDates] = useState<
//     { date: string; time: string }[]
//   >([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchBookedDates = async () => {
//       try {
//         const response = await fetch('/api/get-booked-dates', {
//           headers: {
//             'Cache-Control':
//               'no-store, no-cache, must-revalidate, proxy-revalidate',
//             Pragma: 'no-cache',
//             Expires: '0',
//           },
//           cache: 'no-store',
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         setBookedDates(data);
//       } catch (error) {
//         setError('Failed to fetch booked dates.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookedDates();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <Card
//         isBlurred
//         className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
//         shadow="sm"
//       >
//         <CardBody className="flex flex-col justify-center items-center text-red-700 bg-red-100 border border-red-300 rounded-lg p-4  overflow-auto">
//           <ul className="list-none p-0">
//             {bookedDates.map((booking, index) => (
//               <li
//                 key={index}
//                 className="flex items-center p-4 mb-2 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200"
//               >
//                 <CalendarIcon className="h-6 w-6 text-blue-500 mr-4" />
//                 <div>
//                   <p className="text-xl font-semibold text-gray-700">
//                     {dayjs(booking.date).format('MMMM D, YYYY')}
//                   </p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default BookedDates;
