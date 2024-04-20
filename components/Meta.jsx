import Head from "next/head";

const Meta = ({ title, keyword, desc }) => {
  return (
    <div>
      <Head>
        <title>ATHENE ENTERTAINMENT</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content={desc} />
        <meta name="keyword" content={keyword} />
      </Head>
    </div>
  );
};

Meta.defaultProps = {
  title: "Is a game studio established at the end of 2022 with the first game Astrark: STAGE ONE, an attractive tower defense strategy mobile game. In this game, you choose a commander, assemble your team, and create your own strategy for battle. You can choose many different battle modes, play against others or play with friends",
  keyword:
    "is a game studio established at the end of 2022 with the first game Astrark: STAGE ONE, an attractive tower defense strategy mobile game. In this game, you choose a commander, assemble your team, and create your own strategy for battle. You can choose many different battle modes, play against others or play with friends",
};

export default Meta;
