import React from "react";

export default function Load() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-yellow-200 h-12 w-12 mb-4"></div>
        <h2 className="text-center text-yellow-500 text-xl font-semibold">
          Loading...
        </h2>
        <p className="w-1/3 text-center text-yellow-500">
          This may take a few seconds, please don't close this page.
        </p>
      </div>

      <button>hey</button>
    </>
  );
}
