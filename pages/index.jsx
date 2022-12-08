import { useWallet } from "@solana/wallet-adapter-react";

import {
  useProgram,
  useClaimNFT,
  useClaimConditions,
  useBalance,
} from "@thirdweb-dev/react/solana";

import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const SOL_PRICE = 3;

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
const Home = () => {
  // Here's how to get the thirdweb SDK instance
  // const sdk = useSDK();
  // Here's how to get a nft collection
  const { program } = useProgram(
    "CX9BWjttmmPBENxz6rwRqaT24khhsVFZanAmGqnfYE5C",
    "nft-drop"
  );

  const wallet = useWallet();

  const { data: walletBalance } = useBalance();

  // const { data: nftsList, isLoading: IsNftsLoading } = useNFTs(program);

  const {
    mutateAsync: claim,
    isLoading,
    isSuccess,
    isError,
  } = useClaimNFT(program);

  const { data: claimData, isLoading: isClaimDataLoading } =
    useClaimConditions(program);

  const [amount, setAmount] = useState(1);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Sapiens - We are coming to Metaverse 🤯</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Sapiens - We are coming to Metaverse"
        />
        <meta
          name="google-site-verification"
          content="ffaI56OmzwjwP2WSMXbAD0BnysyVN8j8VoJO-a9Pgqc"
        />
        <meta
          name="twitter:description"
          content="A collection of utility enabled NFTs built on SOLANA."
        />
        <meta
          name="description"
          content="A collection of utility enabled NFTs built on SOLANA."
        />
        <meta
          property="og:title"
          content="Sapiens - We are coming to Metaverse"
        />
        <meta
          property="og:description"
          content="A collection of utility enabled NFTs built on SOLANA."
        />
        <meta
          property="og:image"
          content={`https://www.sapiensnft.io/home/banner.gif`}
        />
        <meta
          name="twitter:image:src"
          content={`https://www.sapiensnft.io/home/banner.gif`}
        />
        <meta
          name="twitter:image"
          content={`https://www.sapiensnft.io/home/banner.gif`}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.iconContainer}>
            <Image
              src="/banner.gif"
              height={300}
              width={300}
              style={{
                borderRadius: 8,
                objectFit: "contain",
              }}
              alt="sapiens"
            />
          </div>
          <Image
            src="/logo-white.svg"
            height={40}
            width={140}
            style={{
              objectFit: "contain",
            }}
            alt="sapiens"
          />
          <div className={styles.claimDataWrapper}>
            {isClaimDataLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <div>
                  {claimData && <p className={styles.live}>Minting LIVE</p>}
                  <p className={styles.solPriceWrapper}>
                    Price:
                    <span>{SOL_PRICE}</span>
                    <Image src={"/sol.png"} width={16} height={16} alt="sol" />
                  </p>
                </div>
                <div>
                  {claimData && (
                    <p
                      className={styles.claimData}
                    >{`${claimData?.claimedSupply} / ${claimData?.maxClaimable}`}</p>
                  )}
                </div>
              </>
            )}
          </div>

          <p className={styles.explain}>
            A collection of 10,000 utility enabled NFTs that are unique in terms
            of design, traits and concept. Each NFT provides additional benefits
            & perks as long as you Hold them.
          </p>
          <div className={styles.walletConnect}>
            <WalletMultiButtonDynamic />
          </div>
          {wallet.connected && (
            <>
              <div className={styles.claimWrapper}>
                <input
                  type="number"
                  placeholder="Enter amount"
                  name="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  min={1}
                />
                <button
                  className={styles.mintButton}
                  onClick={() => claim({ amount })}
                >
                  {isLoading ? (isSuccess ? "Claimed" : "Claiming") : "Claim"}
                </button>
              </div>
              <div>{isError && <p>Error Claiming.</p>}</div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
