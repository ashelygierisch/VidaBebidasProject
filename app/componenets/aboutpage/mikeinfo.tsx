import React from 'react';

const MikeInfo = () => {
  return (
    <div className="flex flex-row justify-evenly flex-wrap  m-10 ">
      <div className="flex flex-col gap-5 border-b-1 border-[#FFFFF0]">
        <h2 className="text-4xl text-center text-[#FFD700]">Michael Estrada</h2>
        <p className="text-wrap text-center lg:text-2xl leading-7 m-3">
          Michael is a dedicated and professional bartender who brings
          exceptional service to every event through his business,
          VidaBebidasProject. With three customizable packages, he caters to a
          variety of customer needs, ensuring a tailored and memorable
          experience for all. When he&apos;s not providing top-notch bartending
          at venues, Michael works full-time at a restaurant, honing his skills
          and passion for mixology. His commitment to excellence and
          professionalism makes VidaBebidasProject a trusted choice for any
          occasion.
        </p>
      </div>
      <div>
        <span className="icon-[material-symbols--swipe-outline] text-3xl mt-10 mb-0"></span>
      </div>
    </div>
  );
};

export default MikeInfo;
