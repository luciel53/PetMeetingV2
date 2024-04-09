import cats from "./Cats";
import React, { useState, useEffect } from "react";

export default function Carousel() {
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
            setStartIndex(prevIndex => (prevIndex + 1));
        }, 5000);

        window.addEventListener("resize", handleResize); // detect changes
        handleResize(); // Call function
        return () => {
            window.removeEventListener("resize", handleResize); // avoid bugs/memory leaks
            clearInterval(intervalId); // clear interval
        };
    }, [cats.length]);

    function nextImages() {
        setStartIndex(prevIndex => (prevIndex + 1) % cats.length);
    }

    function prevImages() {
        setStartIndex(prevIndex => (prevIndex - 1 + cats.length) % cats.length);
    }

    return (
        <div className="">
            <div className="bg-white w-80 md:w-[38rem] lg:w-[45rem] pt-2 pb-1.5 border-t-2 border-purple rounded-e-3xl shadow-lg animate-fade-right animate-duration-[800ms] animate-ease-linear">
                <h2 className="text-lg md:text-xl text-purple text-center uppercase">Annonces à la Une</h2>
            </div>

            {/* Carousel */}
            <div className="relative mt-4 md:mt-8 md:p-5 shadow-xl mb-5 flex flex-nowrap bg-white rounded-3xl font-semibold">
                {Array.from({ length: itemsToShow }).map((_, index) => {
                    const imageIndex = (startIndex + index) % cats.length;
                    const image = cats[imageIndex];
                    return (
                        <div key={index} className="container flex flex-col bg-white z-0 md:h-80 w-80 mx-auto mr-3 pb-2 rounded-3xl shadow-xl transition: all 0.5s ease-in-out hover:scale-125 transition duration-500 cursor-pointer">
                            <p className="text-center">{image.name}</p>
                            <img src={image.image} className="z-20 h-40 md:h-72 my-3 object-cover mx-auto" alt={image.name} />
                            <p className="text-center">{image.race}</p>

                        </div>
                    );
                })}

                <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-purple py-3 px-5 rounded-full text-white shadow-xl hover:opacity-60 opacity-90" onClick={prevImages}>
                    &lt;
                </button>
                <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-purple py-3 px-5 rounded-full text-white shadow-xl hover:opacity-60 opacity-90" onClick={nextImages}>
                    &gt;
                </button>
            </div>
        </div>
    );
}
