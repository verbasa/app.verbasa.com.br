import { Box, Button, Center, Flex } from '@chakra-ui/react';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import Layout from '../components/Layout';
import * as Yup from 'yup';
import MetaInput from '../components/MetaInput';
import getValidationErrors from '../utils/getValidationErrors';

import { validateCPF } from 'validations-br';

// import { Document, Page } from 'react-pdf';

import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// import PDFViewer from 'pdf-viewer-reactjs';

export default function Home() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function handlePageChange(change) {
    const newPage = Math.min(numPages, Math.max(1, pageNumber + change));
    setPageNumber(newPage);
  }

  const formRef = useRef(null);

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é um campo obrigatório!'),
    email: Yup.string()
      .email('Favor usar um e-mail válido')
      .required('O Email é um campo obrigatório!'),
    cpf: Yup.string().test('is-cpf', 'Favor usar um CPF válido.', (value) =>
      validateCPF(value)
    ),
    plan: Yup.string(),
  });

  const handleSubmit = useCallback(
    async (data, { reset }) => {
      console.log(data);
      try {
        formRef.current.setErrors({});
        const encodedData = new URLSearchParams(data).toString();
        await schema.validate(data, { abortEarly: false });

        fetch('/api/rdVerbasaSignup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encodedData,
        })
          .then(() => {
            // navigate('/newsletter/obrigado');
            reset();
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current.setErrors(errors);
          return;
        }
      }
    },
    [formRef]
  );

  return (
    <>
      <Layout key="HomePage">
        <Center py={10} h="100%" w="100%" overflow="hidden">
          {/* <Document
            file="/pdf/termsandpolices.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
            <Flex>
              {pageNumber > 1 && (
                <Button onClick={() => handlePageChange(-1)}>{`<`}</Button>
              )}
              {pageNumber < numPages && (
                <Button onClick={() => handlePageChange(1)}>{`>`}</Button>
              )}
            </Flex>
          </Document> */}
        </Center>
        <Form
          name="subscription"
          ref={formRef}
          onSubmit={handleSubmit}
          method="post"
        >
          <MetaInput name="name" placeholder="Nome completo" />
          <MetaInput name="email" placeholder="E-mail" />
          <MetaInput name="cpf" placeholder="CPF" />
          <MetaInput name="plan" defaultValue="nacional" hidden />
          <Button type="submit">Ir para página de pagamento</Button>
        </Form>
      </Layout>
    </>
  );
}
