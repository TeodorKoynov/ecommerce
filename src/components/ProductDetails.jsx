"use client"

import {useState} from "react";
import Image from "next/image";
import {urlFor} from "../../sanity/lib/client";
import {AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar} from "react-icons/ai";
import {useStateContext} from "@/context/StateContext";

function ProductDetails({product}) {
    const { image, name, details, price } = product;

    const [index, setIndex] = useState(0);

    const {decQty, incQty, qty, onAdd} = useStateContext();

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
                            <span
                                className={"minus"}
                                onClick={decQty}
                            >
                                <AiOutlineMinus/>
                            </span>
                        <span className={"num"}>
                                {qty}
                            </span>
                        <span
                            className={"plus"}
                            onClick={incQty}
                        >
                                <AiOutlinePlus/>
                            </span>
                    </p>
                </div>
                {/*//todo abstract in client component*/}
                <div className={"buttons"}>
                    <button
                        type={"button"}
                        className={"add-to-cart"}
                        onClick={() => onAdd(product, qty)}
                    >
                        Add to Cart
                    </button>
                    <button type={"button"} className={"buy-now"}>
                        Buy Now
                    </button>
                </div>
            </div>
        </div>)
}

export default ProductDetails;