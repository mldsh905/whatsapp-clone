import {Html, Head, Main, NextScript} from 'next/document'
import Sidebar from "@/components/Sidebar";

export default function Document() {
    return (
        <Html lang="en">
            <Head/>
            <body className='grid'>

                <Main/>
                <NextScript/>

            </body>
        </Html>
    )
}
