'use client';
import React, { useEffect, useState } from 'react';

const BookedDates = () => {
  const [bookedDates, setBookedDates] = useState<
    { date: string; time: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await fetch('/api/get-booked-dates');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setBookedDates(data);
      } catch (error) {
        setError('Failed to fetch booked dates.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookedDates();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <ul>
        {bookedDates.map((booking, index) => (
          <li
            key={index}
            className="text-lg text-black m-3 underline font-bold"
          >
            <span className="icon-[gridicons--scheduled]"></span> {booking.date}{' '}
            at {booking.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookedDates;
