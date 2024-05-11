import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import male from "../assets/images/icons/male.png";
import female from "../assets/images/icons/female.png";

export default function Carousel({ offers }) {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(0);

  useEffect(() => {
    // Update number of elements to display depending on the screen size
    function handleResize() {
      if (window.innerWidth >= 1200) {
        setItemsToShow(5); // full screen : 5 elements
      } else if (window.innerWidth < 1200 && window.innerHeight >= 768) {
        setItemsToShow(3); // tablet : 3 elements
      } else {
        setItemsToShow(2); // mobile : 2 elements
      }
    }

    const intervalId = setInterval(() => {
      setStartIndex((prevIndex) => prevIndex + 1);
    }, 5000);

    window.addEventListener("resize", handleResize); // detect changes
    handleResize(); // Call function
    return () => {
      window.removeEventListener("resize", handleResize); // avoid bugs/memory leaks
      clearInterval(intervalId); // clear interval
    };
  }, [offers.length]);

  function nextImages() {
    setStartIndex((prevIndex) => (prevIndex + 1) % offers.length);
  }

  function prevImages() {
    setStartIndex(
      (prevIndex) => (prevIndex - 1 + offers.length) % offers.length
    );
  }

  return (
    <div>
      <div className="bg-white w-80 md:w-[38rem] lg:w-[45rem] pt-2 pb-1.5 border-t-2 border-purple rounded-e-3xl shadow-lg animate-fade-right animate-duration-[800ms] animate-ease-linear">
        <h2 className="text-lg md:text-xl text-purple text-center uppercase">
          Annonces à la Une
        </h2>
      </div>

      {/* Carousel */}
      <div className="relative mt-4 md:mt-2 md:p-5 shadow-xl mb-5 flex flex-nowrap bg-white rounded-3xl font-semibold snap-mandatory">
        {Array.from({ length: itemsToShow }).map((_, index) => {
          const offerIndex = (startIndex + index) % offers.length;
          const offer = offers[offerIndex];
          if (!offer) {
            return null;
          }

          return (
            <NavLink key={offer.id} to={`/Annonces/${offer.id}`}>
              <div
                key={index}
                className="container flex flex-col bg-white z-0 md:h-80 w-72 mx-auto mr-2 pt-2 pb-2 rounded-3xl shadow-xl transition-transform duration-4000 ease-out hover:scale-105 cursor-pointer"
              >
                <p className="text-center">{offer.name}</p>
                <img
                  src={`http://127.0.0.1:8000${offer.picture}`}
                  className="z-20 h-[100px] md:h-[235px] md:w-[200px] my-3 object-cover mx-auto rounded-lg"
                  alt={offer.name}
                />
                <p className="flex flex-row mx-auto text-center">
                    {offer.race}
                    {offer.sex === "Mâle" ? (
                      <img src={male} alt="mâle" className="pl-4" />
                    ) : (
                      <img src={female} alt="femelle" />
                    )}
                </p>
              </div>
            </NavLink>
          );
        })}

        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-purple py-3 px-5 rounded-full text-white shadow-xl hover:opacity-60 opacity-90"
          onClick={prevImages}
        >
          &lt;
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-purple py-3 px-5 rounded-full text-white shadow-xl hover:opacity-60 opacity-90"
          onClick={nextImages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
