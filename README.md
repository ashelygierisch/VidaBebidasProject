# VidaBebidasProject

VidaBebidas Project is a comprehensive, full-stack website designed to serve as a booking platform for a mobile bartender. The site features a professional video showcasing the client's expertise, along with written reviews from previous clients. Users can explore a detailed packages page to learn about the services offered and access a booking page to submit a booking form. The site is paired with Prisma + MongoDB + NodeMailer to offer a fluid method of creating users and bookings, while also providing a email template that is delivered to customers upon booking.

- **Home Page:** Introduces users a hero section with buttons dedicated to navigate to booking page, packages page, and to leave a review. As well as a video showcasing bartenders skills. Lastly a section for reviews left.
- **Leave a Review:** Introduces users a pop up Google Form to allow them to submit a review.
- **About:** Provides insight about bartender and a gallery of bartender at work.
- **Packages:** Details the three packages and what they come with that bartender offers, and navigation buttons that lead to booking page.
- **Booking:** Provides a booking form for users to fill out. Utilizing MUI's DatePicker Calendar Component , users can select date and time of event.Upon Continuing User is created and stored in the DB.
- **Waiver:** User is presented with Business Waiver Form, showcasing rules and commitment to service. Given choice to Provide Signature and to select they approved terms and conditions. Once signed and accepted, Booking is created and User signature property is updated on the DB. Email Template is also converted with data from DB to send to provided user's email to showcase Booking Details. Simultaneously , sending to business owner also to notify of new booking.
- **ThankYou:** User is presented with a Thank you Note, letting them know to check email for booking details.

## Features

- **Dynamic Routing:** Leveraging Next.js for server-side rendering and routing, ensuring fast and efficient page loading.
- **Responsive Design:** Tailwind CSS is utilized to ensure a visually appealing and responsive layout across devices.
- **Ease of Maintenance:** The modular structure of React components and the utility-first approach of Tailwind CSS make the codebase easy to maintain and extend.
- **Ease of Contact:** Utilized the power of Prisma + Node MAiler+ MongoDb to store, extract, and manipulate Booking Data as needed.

## Technologies

- **NextUI:** https://nextui.org/
- **Vercel:** https://vercel.com/home
- **DaisyUI:** https://daisyui.com/
- **Framer-Motion:** https://www.framer.com/motion/
- **Yes-Icons:** https://yesicon.app/
- **AWS S3 Bucket:** https://aws.amazon.com/s3/
- **React-Scroll-Up:** https://www.npmjs.com/package/react-scroll-up
- **Google Forms:** https://www.google.com/forms/about/
- **Prisma:** https://www.prisma.io/
- **React Hot Toast:** https://react-hot-toast.com/
- **MongoDB:** https://www.mongodb.com/
- **NodeMailer:** https://nodemailer.com/

## Desktop View

![](https://github.com/Oscarl214/VidaBebidasProject-/blob/main/public/desktopvida.png)

# Mobile View

![](https://github.com/Oscarl214/VidaBebidasProject-/blob/main/public/MobileVida.png)

## Live

- https://vida-bebidas-project.vercel.app/

## License

This project is licensed under the [MIT License](LICENSE).

---
