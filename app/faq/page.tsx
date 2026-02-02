'use client';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Divider, Image } from '@nextui-org/react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

const faqData: FAQItem[] = [
  {
    question: "If I prefer only two cocktails instead of three, is that acceptable? Do you also assist with creating signature cocktails?",
    answer: "Yes! If you would only like two cocktails for your event, we are more than happy to create 2 signature cocktails tailored to your preferences and theme."
  },
  {
    question: "Are the shots of the night optional?",
    answer: "Yes, shots are optional. It's up to the venue first (we'll confirm if shots are permitted), then the client can decide if they'd like to include them."
  },
  {
    question: "If my chosen signature cocktails don't require limes or oranges, can those garnishes be substituted for something else?",
    answer: (
      <div>
        <p className="mb-2">Yes! The garnishes can be substituted for whatever you prefer. Some popular alternatives include:</p>
        <ul className="list-disc list-inside ml-4 text-gray-300">
          <li>Watermelon</li>
          <li>Pineapple</li>
          <li>Cherries</li>
          <li>Mint</li>
          <li>And more!</li>
        </ul>
      </div>
    )
  },
  {
    question: "Can I see a photo of the cups included in the package?",
    answer: "Yes! For events, we prioritize using high-quality disposable cups for convenience and safety. We're happy to share photos upon request so you know exactly what to expect."
  },
  {
    question: "What is included with the bar setup?",
    answer: (
      <div>
        <p className="mb-2">Whether there&apos;s a designated bar area at your venue or we provide our mobile bar, the setup includes:</p>
        <ul className="list-disc list-inside ml-4 text-gray-300 space-y-1">
          <li>Bar materials (shakers, strainers, jiggers, etc.)</li>
          <li>Bar mats</li>
          <li>Rags for cleaning</li>
          <li>Ice management & coolers</li>
          <li>Pre-setup and post-breakdown</li>
          <li>Drink building area</li>
          <li>Waste area (trash can)</li>
        </ul>
      </div>
    )
  },
  {
    question: "When referencing mixers for the bar, does this mean you provide all standard mixers?",
    answer: (
      <div>
        <p className="mb-2">Mixers are provided based on your selected cocktails and drinks:</p>
        <ul className="list-disc list-inside ml-4 text-gray-300 space-y-1">
          <li>If you select Tequila & Pineapple, we provide the pineapple juice</li>
          <li>If you have a Paloma as a signature cocktail, we provide the Squirt</li>
          <li>Other beverages for the event (like sodas for general mixing) are provided by the host</li>
        </ul>
        <p className="mt-2 text-sm italic text-gray-400">We handle the cocktail-specific mixers; you handle the general refreshments.</p>
      </div>
    )
  }
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-[100px] min-h-screen px-4 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl text-[#FFD700] text-center m-5">Frequently Asked Questions</h1>
        <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
          Have questions about our bartending services? Find answers to commonly asked questions below. 
          If you don&apos;t see your question here, feel free to <Link href="/booking" className="text-[#FFD700] underline hover:text-[#DC143C]">contact us</Link>.
        </p>

        <Card className="max-w-3xl mx-auto bg-background/60 dark:bg-default-100/50">
          <CardHeader className="flex gap-3 justify-center">
            <Image
              alt="Vida Bebidas Logo"
              height={40}
              radius="sm"
              src="https://mikessite.s3.us-east-2.amazonaws.com/logo-tab.png"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-lg font-bold">Questions & Answers</p>
              <p className="text-small text-default-500">Click a question to see the answer</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="p-0">
            {faqData.map((faq, index) => (
              <div key={index} className="border-b border-gray-700 last:border-b-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-4 hover:bg-gray-800/50 transition-colors flex justify-between items-center gap-4"
                >
                  <span className="font-semibold text-[#FFD700]">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[#DC143C] text-xl flex-shrink-0"
                  >
                    ▼
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 pl-6 text-white bg-gray-900/30">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-10">
          <p className="text-gray-400 mb-4">Ready to book your event?</p>
          <Link href="/booking">
            <button className="bg-transparent border border-[#DC143C] text-[#FFD700] px-6 py-3 rounded-sm hover:bg-[#DC143C] hover:animate-pulse transition-colors">
              Book Now
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQPage;
