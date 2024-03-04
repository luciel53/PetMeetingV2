import React, { useState, useEffect } from "react";
import Abyssin from '../assets/images/grid-carousel/abyssin.png';
import Bengal from '../assets/images/grid-carousel/bengal.png';
import BritishLonghair from '../assets/images/grid-carousel/britishlonghair.png';
import BritishShorthair from '../assets/images/grid-carousel/britishshorthair.png';
import Ragdoll from '../assets/images/grid-carousel/ragdoll.png';
import Siamois from '../assets/images/grid-carousel/siamois.png';
import Scottish from '../assets/images/grid-carousel/scottishfold.png';

export default function Carousel() {
    const images = [
        {
            name: "Popeye",
            image: Abyssin,
            race: "Abyssin",
            sexe: "mâle",
        },
        {
            name: "Sahel",
            image: Bengal,
            race: "Bengal",
            sexe: "Mâle",
        },
        {
            name: "Sally",
            image: BritishLonghair,
            race: "British Longhair",
            sexe: "Femelle",
        },
        {
            name: "Christmas",
            image: Ragdoll,
            race: "Ragdoll",
            sexe: "mâle",
        },
        {
            name: "Shtroumpf",
            image: BritishShorthair,
            race: "British short hair",
            sexe: "mâle",
        },
        {
            name: "Apollo",
            image: Siamois,
            race: "Siamois",
            sexe: "mâle",
        },
        {
            name: "Maestro",
            image: Scottish,
            race: "Scottish Fold",
            sexe: "mâle",
        },
    ];

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
        window.addEventListener("resize", handleResize); // detect changes
        handleResize(); // Call function
        return () => window.removeEventListener("resize", handleResize); // avoid bugs/memory leaks
    }, []);

    function nextImages() {
        setStartIndex(prevIndex => (prevIndex + 1) % images.length);
    }

    function prevImages() {
        setStartIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
    }

    return (
        <div className="">
            <div className="bg-white w-80 md:w-[38rem] lg:w-[45rem] pt-2 pb-1.5 border-t-2 border-purple rounded-e-3xl shadow-lg">
                <h2 className="text-lg md:text-xl text-purple text-center uppercase">Annonces à la Une</h2>
            </div>

            {/* Carousel */}
            <div className="relative mt-4 md:mt-8 md:p-5 shadow-xl mb-5 flex flex-nowrap bg-white rounded-3xl font-semibold">
                {Array.from({ length: itemsToShow }).map((_, index) => {
                    const imageIndex = (startIndex + index) % images.length;
                    const image = images[imageIndex];
                    return (
                        <div key={index} className="container flex flex-col bg-white z-0 md:h-80 w-80 mx-auto mr-3 pb-2 rounded-3xl shadow-xl">
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
