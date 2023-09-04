'use client'

import Layout from "@/components/Layout";
import { useEffect } from "react";
import axios from "axios";
import constants from "@/utils/constants";

export default function Success({ params, searchParams }: {
    params: { source: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    useEffect(() => {
        if (searchParams?.source !== undefined) {
            (
                async () => {
                    await axios.post(`${constants.endpoint}/orders/confirm`, {
                        source: searchParams?.source
                    });
                }
            )()
        }
    }, [searchParams?.source]);

    return (
        <Layout>
            <div className="py-5 text-center">
                <h2>Success</h2>
                <p className="lead">Your purchase has been completed!</p>
            </div>
        </Layout>
    )
}
