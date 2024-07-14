'use client';
import React, { useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  RadioGroup,
  Radio,
} from '@nextui-org/react';

import Link from 'next/link';
import BookingForm from './bookingform';

const BookingModel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState<
    'normal' | 'inside' | 'outside'
  >('inside');

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col gap-2">
        <Button
          onPress={onOpen}
          className="bg-transparent border rounded-sm border-[#DC143C] hover:border-white animate-pulse"
        >
          Open Form
        </Button>
        <RadioGroup
          label="Select scroll behavior"
          orientation="horizontal"
          value={scrollBehavior}
          onValueChange={(value) =>
            setScrollBehavior(value as 'normal' | 'inside' | 'outside')
          }
          className="hidden"
        >
          <Radio value="outside">outside</Radio>
        </RadioGroup>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          scrollBehavior={scrollBehavior}
          className="h-[1000px]"
        >
          <ModalContent className="flex justify-center items-center">
            {(closeModal) => (
              <>
                <ModalHeader className="flex flex-col text-center gap-1 text-[#FFD700]">
                  Booking Form
                </ModalHeader>
                <ModalBody>
                  <BookingForm />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={closeModal}>
                    Close
                  </Button>
                  <Link href="/packages">
                    <Button
                      color="primary"
                      onPress={closeModal}
                      className="bg-transparent border rounded-sm border-[#DC143C] hover:border-white hover:text-[#FFD700]"
                    >
                      Back To Packages
                    </Button>
                  </Link>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default BookingModel;
