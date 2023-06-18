import Image from "next/image";
import {AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar} from "react-icons/ai";
import {client, urlFor} from "../../../../sanity/lib/client";
import Product from "@/components/Product";
import ProductDetails from "@/components/ProductDetails";


export default async function ProductDetailsPage({params}) {
    const productQuery = `*[_type == "product" && slug.current == \'${params.slug}\'][0]`;
    const product = await client.fetch(productQuery);

    const productsQuery = '*[_type == "product"]';
    const products = await client.fetch(productsQuery);

    return (
        <div>
            <ProductDetails product={product}/>

            <div className={"maylike-products-wrapper"}>
                <h2>You may also like</h2>
                <div className={"marquee"}>
                    <div className={"maylike-products-container track"}>
                        {products.map((item) => (
                            <Product key={item._id} product={item}/>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}