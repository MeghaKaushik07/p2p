import React from 'react';

const SharingCard = ({ title, description, buttonText, onClick, peerId, setConnectionId, fileInputRef, sendFile }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg text-white rounded-3xl shadow-2xl p-6 w-full max-w-xs sm:max-w-sm md:max-w-md border border-white/30 transform transition duration-300 hover:scale-105 hover:border-blue-400">
      <h3 className="text-lg font-semibold tracking-wide">{title}</h3>
      <p className="text-sm opacity-75">{description}</p>

      {/* Input Field */}
      {setConnectionId ? (
        <input 
          type="text" 
          placeholder="Enter sender's ID" 
          className="w-full mt-4 p-3 border border-white/20 rounded-lg bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
          onChange={(e) => setConnectionId(e.target.value)}
        />
      ) : (
        <p className="text-sm mt-2">Your ID: {peerId}</p>
      )}

      {/* File Input */}
      {fileInputRef && (
        <div className="mt-4">
          <input type="file" ref={fileInputRef} className="text-white" />
          <button 
            onClick={sendFile} 
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-400 hover:scale-105 transition duration-300"
          >
            Send File
          </button>
        </div>
      )}

      {/* Buttons */}
      <button 
        onClick={onClick} 
        className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 hover:scale-105 transition duration-300"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default SharingCard;