import Link from "next/link";

import {urlFor} from "../../sanity/lib/client";
import Image from "next/image";


function Product({product: {image, name, slug, price}}) {

    return (
        <div>
            <Link href={`/product/${slug.current}`}>
                <div className={"product-card"}>
                    <Image
                        alt={name}
                        width={250}
                        height={250}
                        src={urlFor(image && image[0]).toString()}
                        className={"product-image"}
                    />
                    <p className={"product-name"}>{name}</p>
                    <p className={"product-price"}>${price}</p>

                </div>
            </Link>
        </div>
    )
}

export default Product;