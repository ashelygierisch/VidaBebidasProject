// 'use client';
// import React from 'react';
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
//   useDisclosure,
//   RadioGroup,
//   Radio,
// } from '@nextui-org/react';
// const GoogleForm = () => {
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   const [scrollBehavior, setScrollBehavior] = React.useState('inside');
//   return (
//     <div className="flex justify-center items-center ">
//       <div className="flex flex-col gap-2">
//         <Button onPress={onOpen}>Open Modal</Button>
//         <RadioGroup
//           label="Select scroll behavior"
//           orientation="horizontal"
//           value={scrollBehavior}
//           onValueChange={setScrollBehavior}
//         >
//           <Radio value="inside">inside</Radio>
//           <Radio value="outside">outside</Radio>
//         </RadioGroup>
//         <Modal
//           isOpen={isOpen}
//           onOpenChange={onOpenChange}
//           scrollBehavior={scrollBehavior}
//         >
//           <ModalContent>
//             {(onClose) => (
//               <>
//                 <ModalHeader className="flex flex-col gap-1">
//                   Modal Title
//                 </ModalHeader>
//                 <ModalBody>
//                   <iframe
//                     src="https://docs.google.com/forms/d/e/1FAIpQLSfhtDyMZ3aX_9JlM6v3N4aT8_LsdMdySORoGPSCtMsTib9m8g/viewform?embedded=true"
//                     width="640"
//                     height="2437"
//                   >
//                     Loading…
//                   </iframe>
//                 </ModalBody>
//                 <ModalFooter>
//                   <Button color="danger" variant="light" onPress={onClose}>
//                     Close
//                   </Button>
//                   <Button color="primary" onPress={onClose}>
//                     Action
//                   </Button>
//                 </ModalFooter>
//               </>
//             )}
//           </ModalContent>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default GoogleForm;

// // <div className="bg-black">
// //   <iframe
// //     src="https://docs.google.com/forms/d/e/1FAIpQLSfhtDyMZ3aX_9JlM6v3N4aT8_LsdMdySORoGPSCtMsTib9m8g/viewform?embedded=true"
// //     width="100%"
// //     height="1200"
// //   >
// //     Loading…
// //   </iframe>
// // </div>
// <></>;
