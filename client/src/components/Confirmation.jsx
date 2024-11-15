import React from 'react';
import image2 from '../assets/image2.png'; 

const Confirmation = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-lightBlue  text-center">
      <h1 className="text-4xl font-bold mb-4">ZapSlot confirmed</h1>
      <img src={image2} alt="Charging Station Confirmation" className="max-w-3xl mx-auto " />
      <p className="text-3xl font-semibold mb-8">Full charge ahead - your spot's secured!</p>
    </div>
  );
}

export default Confirmation;
