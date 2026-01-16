import React from "react";
import { Head } from "@inertiajs/react";

const SeoHead = ({
                     title,
                     description,
                     image,
                     slug = "",
                     keywords,
                     structuredData
                 }) => {

    const baseUrl = `${import.meta.env.VITE_APP_URL}:${import.meta.env.VITE_APP_PORT}` || "";
    const pageUrl = `${baseUrl}/${slug}`;
    const imageUrl = `${baseUrl}${image}`;

    const finalTitle = title ? `${title} | CFA Conseil` : "CFA Conseil";
    const finalDescription = description || "Cabinet Comptable Agréé CFA assure la tenue et le suivi complet de votre comptabilité, tout en partageant des articles et conseils utiles sur la gestion financière.";
    const finalImage = image ? imageUrl : `${baseUrl}/storage/images/fallback.png`;
    const finalKeywords = keywords || "comptabilité, gestion financière, cabinet comptable Agréé, CFA";

    return (
        <Head>
            <title key="title">{finalTitle}</title>
            <meta key="description" name="description" content={finalDescription} />
            <meta key="keywords" name="keywords" content={finalKeywords} />
            <meta key="robots" name="robots" content="index, follow" />
            <meta key="author" name="author" content="Cabinet Comptable Agréé CFA" />
            <link key="canonical" rel="canonical" href={pageUrl} />

            <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta key="theme-color" name="theme-color" content="#252550" />

            <meta key="og:type" property="og:type" content="website" />
            <meta key="og:title" property="og:title" content={finalTitle} />
            <meta key="og:description" property="og:description" content={finalDescription} />
            <meta key="og:image" property="og:image" content={finalImage} />
            <meta key="og:image:alt" property="og:image:alt" content={finalTitle} />
            <meta key="og:url" property="og:url" content={pageUrl} />
            <meta key="og:site_name" property="og:site_name" content="Cabinet Comptable Agréé CFA" />

            <link key="favicon" rel="icon" href="/favicon.ico" />

            {structuredData && (
                <script key="structured-data" type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Head>
    );
};

export default SeoHead;
