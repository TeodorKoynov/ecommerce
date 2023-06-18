"use client"

import {useState} from "react";
import Image from "next/image";
import {urlFor} from "../../sanity/lib/client";
import {AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar} from "react-icons/ai";

function ProductDetails({product : {image, name, details, price}}) {
    const [index, setIndex] = useState(0)


    return (
        <div className={"product-detail-container"}>
            <div>
                <div className={"image-container"}>
                    <Image
                        className={"product-detail-image"}
                        alt={name}
                        width={460}
                        height={460}
                        src={urlFor(image && image[index]).toString()}/>
                </div>
                <div className={"small-images-container"}>
                    {image?.map((item, i) => (
                        <Image
                            key={i}
                            className={i === index ? "small-image selected-image" : "small-image "}
                            height={160}
                            width={160}
                            src={urlFor(item).toString()}
                            alt={item}
                            onMouseEnter={() => setIndex(i)}
                        />
                    ))}
                </div>
            </div>


            <div className={"product-detail-desc"}>
                <h1>{name}</h1>
                <div className={"reviews"}>
                    <div>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiOutlineStar/>
                    </div>
                    <p>
                        (20)
                    </p>
                </div>
                <h4>Details:</h4>
                <p>{details}</p>
                <p className={"price"}>${price}</p>
                {/*//todo abstract in client component*/}
                <div className={"quantity"}>
                    <h3>Quantity:</h3>
                    <p className={"quantity-desc"}>
                            <span className={"minus"}>
                                <AiOutlineMinus/>
                            </span>
                        <span className={"num"}>
                                0
                            </span>
                        <span className={"plus"}>
                                <AiOutlinePlus/>
                            </span>
                    </p>
                </div>
                {/*//todo abstract in client component*/}
                <div className={"buttons"}>
                    <button type={"button"} className={"add-to-cart"}>
                        Add to Cart
                    </button>
                    <button type={"button"} className={"buy-now"}>
                        Buy Now
                    </button>
                </div>
            </div>
        </div>    )
}

export default ProductDetails;