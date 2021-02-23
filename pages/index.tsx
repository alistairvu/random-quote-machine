import Head from "next/head"
import { GetServerSideProps } from "next"
import useQuote from "../zustand/useQuote"
import { useEffect } from "react"
import axios from "axios"
import { Center, Button, VStack, Link, Heading } from "@chakra-ui/react"

interface HomeProps {
  content: string
  author: string
}

export default function Home({ content, author }: HomeProps) {
  const [loading, error, quote] = useQuote((state) => [
    state.loading,
    state.error,
    state.quote,
  ])
  const [setQuote, fetchNewQuote] = useQuote((state) => [
    state.setQuote,
    state.fetchNewQuote,
  ])

  useEffect(() => {
    setQuote(content, author)
  }, [setQuote])

  return (
    <div>
      <Head>
        <title>Quote Machine</title>
        <link rel="icon" href="/favicon.ico" />
        <script
          defer
          src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"
        />
      </Head>

      <main>
        <Center width="100vw" height="100vh" p={10}>
          {loading && <Heading size="md">Loading...</Heading>}

          {!loading && !error && (
            <VStack w={{ base: "60vw", sm: "80vw" }} id="quote-box">
              <Heading id="text" textAlign="center">
                {quote.content}
              </Heading>
              <Heading id="author" size="md">
                {quote.author}
              </Heading>
              <Button
                colorScheme="blue"
                variant="solid"
                onClick={fetchNewQuote}
                id="new-quote"
              >
                Get new quote
              </Button>
              <Link
                isExternal
                href={`https://twitter.com/intent/tweet?text=${quote.content}`}
                id="tweet-quote"
              >
                Tweet
              </Link>
            </VStack>
          )}
        </Center>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get(
    "https://api.quotable.io/random?tags=wisdom|ispirational"
  )
  const { content, author } = data
  return { props: { content, author } }
}
