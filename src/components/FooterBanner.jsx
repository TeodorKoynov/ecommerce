import {urlFor} from "../../sanity/lib/client";
import Link from "next/link";
import Image from "next/image";

function FooterBanner({
                          footerBanner: {
                              discount,
                              largeText1,
                              largeText2,
                              saleTime,
                              smallText,
                              midText,
                              desc,
                              product,
                              buttonText,
                              image
                          }
                      }) {
    return (
        <div className={"footer-banner-container"}>
            <div className={"banner-desc"}>
                <div className={"left"}>
                    <p>{discount}</p>
                    <h3>{largeText1}</h3>
                    <h3>{largeText2}</h3>
                    <p>{saleTime}</p>
                </div>

                <div className={"right"}>
                    <p>{smallText}</p>
                    <h3>{midText}</h3>
                    <p>{desc}</p>
                    <Link href={`/product/${product}`}>
                        <button type={"button"}>{buttonText}</button>
                    </Link>
                </div>

                <Image alt={product.name} width={520} height={520} src={urlFor(image).toString()} className={"footer-banner-image"}></Image>
            </div>
        </div>
    )
}

export default FooterBanner;