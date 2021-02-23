import create, { State } from "zustand"
import { devtools } from "zustand/middleware"
import axios from "axios"

interface QuoteInterface {
  content: string
  author: string
}

interface QuoteState extends State {
  loading: boolean
  error: string
  quote: QuoteInterface

  setQuote: (text: string, author: string) => void
  fetchNewQuote: () => void
}

const initialQuoteState = {
  loading: false,
  error: "",
  quote: {} as QuoteInterface,
}

const useQuote = create<QuoteState>(
  devtools(
    (set) => ({
      ...initialQuoteState,

      setQuote: (content: string, author: string) =>
        set((state) => ({ ...state, quote: { content, author } })),

      fetchNewQuote: async () => {
        try {
          set({ ...initialQuoteState, loading: true })
          const { data } = await axios.get(
            "https://api.quotable.io/random?tags=wisdom|ispirational"
          )
          const { content, author } = data
          set({ ...initialQuoteState, quote: { content, author } })
        } catch (err) {
          set({ ...initialQuoteState, err: err.message })
        }
      },
    }),
    "quotes"
  )
)

export default useQuote
