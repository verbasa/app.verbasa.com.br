import Head from 'next/head';
import React from 'react';
import Layout from '../components/Layout';

export default function Home() {
  return [
    <Head key="head">
      <title>Verbasa app</title>
    </Head>,
    <Layout key="HomePage">hello mama</Layout>,
  ];
}
