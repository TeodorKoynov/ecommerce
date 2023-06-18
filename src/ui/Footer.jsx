import {AiFillInstagram, AiOutlineTwitter} from "react-icons/ai";

function Footer() {
    return (
        <div className={"footer-container"}>
            <p>2023 Solid Headphones All rights reserved</p>
            <p className={"icons"}>
                <AiFillInstagram/>
                <AiOutlineTwitter/>
            </p>
        </div>
    )
}

export default Footer;