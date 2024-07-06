import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import MainLayout from "../../components/layout/MainLayout";
import Card from "../../components/small-components/Card";
import { getAnimeSearch } from '../../src/handlers/index';

export const getServerSideProps = async (context) => {
  const { searchId } = context.query;

  const data = await getAnimeSearch(searchId, 24);

  return {
    props: {
      data,
    },
  };
};

function SearchPage({ data }) {
  const router = useRouter();
  const { searchId } = router.query;

  return (
    <>
      <Head>
        <title>{"Search Results > " + searchId + " - KawaiiWatch"}</title>
        <meta
          name="description"
          content="An ad-free anime streaming website aimed at minimality and responsive design. Share this with friends!"
        />
        <meta
          property="og:title"
          content={"Search Results > " + searchId + " - KawaiiWatch"}
        />
        <meta
          property="og:description"
          content="An ad-free anime streaming website aimed at minimality and responsive design. Share this with friends!"
        />
        <meta name="theme-color" content="#C4AD8A" />
        {/* Maybe change this to scan image and return main color */}
        <link rel="manifest" href="manifest.json" />
        <link rel="shortcut icon" href="favicon.ico" />
        <link rel="icon" type="image/png" href="android-chrome-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>
      <MainLayout useHead={false}>

        {data && (
          <>
            <div className=" ">
              <h1 className=" text-2xl font-bold">Search Results &gt; {searchId}</h1>

              {data.length === 0 && (
                <div className=" mt-10 text-2xl ">No Results Found</div>
              )}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-8">
              {data &&
                data.results
                  // .filter((anime) => !anime.animeTitle.toLowerCase().includes("dub"))
                  .map((anime) => (
                    <Card key={anime.id} data={anime} />
                  ))}
            </div>
          </>
        )}
      </MainLayout>
    </>
  );
}

export default SearchPage;
