import React from 'react';
import Head from 'next/head';

import {  titleSite, urlFavicon, descriptionDefault, urlSite } from '../utils';



export default function Home(props) {
 
  const isOpen = false
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="57x57" href={ `${urlFavicon}apple-icon-57x57.png`} />
        <link rel="apple-touch-icon" sizes="60x60" href={ `${urlFavicon}apple-icon-60x60.png`} />
        <link rel="apple-touch-icon" sizes="72x72" href={ `${urlFavicon}apple-icon-72x72.png`} />
        <link rel="apple-touch-icon" sizes="76x76" href={ `${urlFavicon}apple-icon-76x76.png`} />
        <link rel="apple-touch-icon" sizes="114x114" href={ `${urlFavicon}apple-icon-114x114.png`} />
        <link rel="apple-touch-icon" sizes="120x120" href={ `${urlFavicon}apple-icon-120x120.png`} />
        <link rel="apple-touch-icon" sizes="144x144" href={ `${urlFavicon}apple-icon-144x144.png`} />
        <link rel="apple-touch-icon" sizes="152x152" href={ `${urlFavicon}apple-icon-152x152.png`} />
        <link rel="apple-touch-icon" sizes="180x180" href={ `${urlFavicon}apple-icon-180x180.png`} />
        <link rel="icon" type="image/png" sizes="192x192"  href={ `${urlFavicon}android-icon-192x192.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={ `${urlFavicon}favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="96x96" href={ `${urlFavicon}favicon-96x96.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={ `${urlFavicon}favicon-16x16.png`} />
        <link rel="manifest" href={ `${urlFavicon}manifest.json`} />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content={ `${urlFavicon}ms-icon-144x144.png`} />
        <meta name="theme-color" content="#ffffff" />

        {/* <!-- Primary Meta Tags --> */}
        <title>{titleSite}</title>
        <meta name="title" content={titleSite} />
        <meta name="description" content={descriptionDefault} />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={urlSite} />
        <meta property="og:title" content={titleSite} />
        <meta property="og:description" content={descriptionDefault} />
        <meta property="og:image" content={`${urlFavicon}padrao.png`} />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={urlSite} />
        <meta property="twitter:title" content={titleSite} />
        <meta property="twitter:description" content={descriptionDefault} />
        <meta property="twitter:image" content={`${urlFavicon}padrao.png`} />
      </Head>

      <div className={`${isOpen ? 'open ': ''}main`}>
                      
      

          <div className="container py-4 px-4 px-sm-0">
          <div  className="d-none d-md-block  ">
            {/* <Image src={logo} alt="logo" /> */}
            </div>
              <div className="pb-3 pb-md-5">
                  <h2 className="color-primary font-28 m-0 pb-2">Imóveis em Destaque</h2>
                  <p className="font-14 w-50 pr-0 pr-md-5">Confira em nossos principais imóveis aquele que mais se adeque as suas necessidades</p>
              </div>
              {/* <div className={`${ pageSkeleton ? '' : 'd-none '}row`}> */}
          

              <div className="row">
                  
            

              </div>
          </div>

          <div className="container py-5 px-4 px-sm-0">
              <div className="pb-3 pb-md-5">
                  <h2 className="color-primary font-28 m-0 pb-2">Notícias Imobiliárias</h2>
                  <p className="font-14 w-50 pr-0 pr-md-5">Fique por dentro das últimas notícias do setor imobiliário.</p>
              </div>
              
        
              <div className="row">

    

              </div>
          </div> 

      </div>
    </>
  )
}
