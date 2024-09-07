import Head from "next/head";
import Header from "../components/Header";
import DatePicker from "../components/DatePicker";
import Footer from "../components/Footer";
import { RecurrenceProvider } from "../components/RecurrenceContext";

export default function Home() {
  return (
    <RecurrenceProvider>
      <div className="App">
        <Head>
          <title>My Next.js App</title>
          <meta name="description" content="A description of my Next.js app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <DatePicker />
        <Footer />
      </div>
    </RecurrenceProvider>
  );
}
