'use client';
import React, { useEffect, useState } from 'react';
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

const FeedbackForm = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState<
    'normal' | 'inside' | 'outside'
  >('inside');

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <div className="flex justify-center items-center ">
      <div className="flex flex-col gap-2">
        <Button
          onPress={onOpen}
          className="bg-transparent border  rounded-sm border-[#DC143C] hover:border-white animate-pulse"
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
          onOpenChange={onOpenChange}
          scrollBehavior={scrollBehavior}
          className="h-[1000px]"
        >
          <ModalContent className="flex justify-center items-center">
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col text-center gap-1 text-[#FFD700]">
                  Leave a Review
                </ModalHeader>
                <ModalBody>
                  <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSczRs-7TTUYJOsab9bmhRK_p4kUsqmtJTENHMz_vyJcNSF0vg/viewform?embedded=true"
                    width="400"
                    height="2700"
                  >
                    Loading…
                  </iframe>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Link href="/">
                    <Button
                      color="primary"
                      onPress={onClose}
                      className="bg-transparent border  rounded-sm border-[#DC143C] hover:border-white hover:text-[#FFD700] "
                    >
                      HomePage
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

export default FeedbackForm;
