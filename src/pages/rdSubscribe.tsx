import {
  Box,
  Button,
  Center,
  Text,
  SimpleGrid,
  UnorderedList,
  ListItem,
  Heading,
  Flex,
} from '@chakra-ui/react';
import Head from 'next/head';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import Layout from '../components/Layout';
import * as Yup from 'yup';
import MetaInput from '../components/MetaInput';
import getValidationErrors from '../utils/getValidationErrors';
import uriEncode from '../utils/uriEncode';
import { validateCPF } from 'validations-br';

// import { Document, Page } from 'react-pdf';

// import { pdfjs } from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// import PDFViewer from 'pdf-viewer-reactjs';

const linkEduzz = 'https://sun.eduzz.com/922109';
// const linkEduzz = 'https://nocuda.paulinholamana.com/operenaverbasa';

const facebookPixelID = '523637392210523';

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
      try {
        formRef.current.setErrors({});
        const encodedData = new URLSearchParams(data).toString();
        await schema.validate(data, { abortEarly: false });
        const eduzzPaymentUri = uriEncode(linkEduzz, {
          name: data.name,
          email: data.email,
        });

        fetch('/api/rdVerbasaSignup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encodedData,
        })
          .then(() => {
            setTimeout(() => {
              window.location.assign(eduzzPaymentUri);
            }, 800);

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
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${facebookPixelID}');
              fbq('track', 'PageView');`,
          }}
        />
      </Head>
      <Layout key="HomePage">
        <Box maxW={720} mx="auto" p={4}>
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
          <Box>
            <Heading textAlign="center">Termos e condições de uso</Heading>
            <Text mt={12}>
              Você está contratando um serviço de avaliação da mesa proprietária
              Verbasa Holding SA. Este é um serviço de avaliação, que garante
              sua entrada na mesa proprietária apenas se passar nos critérios
              estabelecidos pela Verbasa Holding SA.
            </Text>
            <Text mt={4}>
              Você será avaliado por 4 semanas, na ferramenta Profit Chart One
              em conta Demo. É de responsabilidade do candidato ter o
              conhecimento da plataforma Profit Chart One.
            </Text>
            <Text mt={4}>
              Você receberá seu login e senha para acesso a ferramenta Profit
              Chart One no e-mail que informar na inscrição, o prazo para
              receber é de até 10 dias uteis. Você terá acesso a conteúdos
              educativos após a conclusão de sua inscrição, que se dará após a
              validação do pagamento que é feito pela Eduzz (isso pode levar até
              3 dias úteis).
            </Text>
            <Text mt={4}>
              Critérios de avaliação para o mercado futuro brasileiro:
            </Text>
            <Text mt={4}>Mercado Nacional:</Text>
            <UnorderedList>
              <ListItem>
                A avaliação do mercado futuro brasileiro será em uma conta de
                avaliação (DEMO) com valor nominal aproximado de R$ 100.000,00
                (ou o equivalente em outra moeda) com um limite operacional de
                25 minis contratos ou 5 contratos cheios (1 contrato cheio = 5
                minis contratos).
              </ListItem>
              <ListItem>
                Os valores descritos são baseados no capital acumulado.
              </ListItem>
              <ListItem>
                Resultado líquido mínimo para ser aprovado: 3,5% do valor
                nominal (R$ 100.000,00 ou equivalente em outra moeda) ou seja,
                R$ 3.500,00.
              </ListItem>
              <ListItem>
                Não poderá superar uma perda máxima diária de 0,50% do valor
                nominal inicial da conta de avaliação, o equivalente a R$
                500,00.
              </ListItem>
              <ListItem>
                Não poderá superar uma perda máxima total de 3% diante do valor
                acumulado. Inicialmente a perda máxima total admitida será de R$
                3.000,00.
              </ListItem>
              <ListItem>
                Abrir operações em pelo menos 12 dias diferentes.
              </ListItem>
              <ListItem>
                Operações exclusivamente na modalidade daytrade, sendo que
                faltando 15 minutos para o início do leilão de fechamento, todas
                as ordens abertas serão fechadas automaticamente, não importando
                o resultado em andamento.
              </ListItem>
            </UnorderedList>
            <Text mt={4}>
              <strong>Importante:</strong> O não cumprimento de qualquer uma das
              exigências descritas acima, impossibilitará o ingresso do
              candidato a nossa equipe de operadores parceiros.
            </Text>
            <Text mt={4}>
              CLICANDO EM ACEITO OS TERMOS, VOCÊ TORNA-SE CIENTE DO ESCRITO
              ACIMA E QUE PARTICIPA DE UMA AVALIAÇÃO E NÃO UMA CONTRATAÇÃO.
            </Text>
          </Box>
        </Box>
        <Box bg="blue.500">
          <Box maxW={720} mx="auto" py={12} mt={10} px={4}>
            <Form
              name="subscription"
              ref={formRef}
              onSubmit={handleSubmit}
              method="post"
            >
              <Flex width="100%" direction="column">
                <MetaInput name="name" placeholder="Nome completo" />

                <Text mb={2} color="white">
                  Favor usar um email DIFERENTE ao que usou na B3 ou corretoras.
                </Text>
                <MetaInput name="email" placeholder="E-mail" />
                <MetaInput name="cpf" placeholder="CPF" />
                <MetaInput name="plan" defaultValue="nacional" hidden />

                <Button
                  type="submit"
                  colorScheme="gray"
                  mt={4}
                  width="100%"
                  borderRadius={4}
                  fontSize={{ base: 'sm', md: 'xl' }}
                >
                  Li e aceito os termos e condições
                </Button>
              </Flex>
            </Form>
          </Box>
        </Box>
      </Layout>
    </>
  );
}
