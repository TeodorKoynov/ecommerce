// "use client"

import Image from "next/image";
import Link from "next/link";
import {urlFor} from "../../sanity/lib/client";

function HeroBanner({heroBanner}) {
    const {smallText, midText, largeText1, image, product, buttonText, desc} = heroBanner;

    const src = urlFor(image)

    return (
        <div className={"hero-banner-container"}>
            <div>
                <p className={"beats-solo"}>{smallText}</p>
                <h3>{midText}</h3>
                <h1>{largeText1}</h1>
                <Image width={2890} height={2890} src={src.toString()} alt={"headphones"} className={"hero-banner-image"}/>
                <div>
                    <Link href={`/product/${product}`}>
                        <button type={"button"}>
                            {buttonText}
                        </button>
                    </Link>
                    <div className={"desc"}>
                        <h5>Description</h5>
                        <p>{desc}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner;