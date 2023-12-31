import Head from "next/head";

import styles from "./index.module.css";
import type { GetServerSideProps } from "next/types";

export default function Home({ test }: Test) {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h2>Data from endpoint</h2>
        <h3>{test}</h3>
      </main>
    </>
  );
}

export const getServerSideProps = (async () => {
  const res = await fetch("http://localhost:8080/ping");
  const { test }: Test = (await res.json()) as Test;
  return { props: { test } };
}) satisfies GetServerSideProps<Test>;

interface Test {
  test: string;
}
