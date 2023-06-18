import Product from "@/components/Product";
import HeroBanner from "@/components/HeroBanner";
import FooterBanner from "@/components/FooterBanner";
import {client} from "../../sanity/lib/client";

export default async function Home() {

    // todo abstraction
    const productQuery = '*[_type == "product"]';
    const products = await client.fetch(productQuery);

    const bannerQuery = '*[_type == "banner"]';
    const bannerData = await client.fetch(bannerQuery);

    return (
        <>
            <HeroBanner heroBanner={!!bannerData.length && bannerData[0]}/>

            <div className={"products-heading"}>
                <h2>Best Selling Products</h2>
                <p>Speakers of many variations</p>
            </div>

            <div className={"products-container"}>
                {products?.map((product) =>
                    <Product key={product._id} product={product}/>
                )}
            </div>

            <FooterBanner footerBanner={bannerData && bannerData[0]}/>
        </>
    )
}
