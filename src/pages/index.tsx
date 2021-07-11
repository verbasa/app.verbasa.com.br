import { Button, Input } from '@chakra-ui/react';
import { Form } from '@unform/web';
import Head from 'next/head';
import React, { useRef } from 'react';
import Layout from '../components/Layout';

export default function Home() {
  const formRef = useRef();

  function handleFormSubmit(data) {
    console.log(data);
    return;
  }

  return (
    <>
      <Head key="head">
        <title>Verbasa app</title>
      </Head>

      <Layout key="HomePage">
        <Form ref={formRef} onSubmit={handleFormSubmit}>
          <Input name="name" placeholder="Choose a username" />
          <Button type="submit">Save</Button>
        </Form>
      </Layout>
    </>
  );
}
