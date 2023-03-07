import Head from "next/head";
import { Inter } from "next/font/google";
import { useState } from "react";
import Timer from "@/components/timer";
import Welcome from "@/components/welcome";

const inter = Inter({ subsets: ["latin"] });

export default function About() {
  const [step, setStep] = useState(0);
  const [seq, setSeq] = useState(-1);
  const [pre, setPre] = useState('')
  const [state, setState] = useState('running')
  const [time, setTime] = useState(71726);
  const [parax, setParax] = useState('')

  const unused = async () => {
    const api = '/api/hello'
    const url = "https://dbs.arms.workers.dev/countries/ps/rand/10";
    const rs = await fetch(url)
    if (rs.ok) {
      const json = await rs.json()
      setPre(JSON.stringify(json.data[0], null, 2))
    }
  }

  const fetchPara = async () => {
    console.log("fetchPara");
    const api = "/api/para";
    const rs = await fetch(api);
    if (rs.ok) {
      const json = await rs.json();
      setParax(json.para)
      setSeq(seq + 1)
    }
  };

  const postJawaban = async () => {
    if (seq > 100) return;
    console.log("postJawaban");
    const api = "/api/para";
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ seq, value: seq + 200 })
    };
    const rs = await fetch(api, init)
    const json = await rs.json()
    if (rs.ok) {
      if (json.seq) {
        setParax(json.soal)
        setSeq(json.seq)
      } else {
        setParax(json.para);
        setSeq(1000)
      }
    }
  }

  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container px-4">
        <h1 className="text-3xl font-medium mt-3 mb-2">Hello world! ({`${seq}`})</h1>
        <div id="welcome">
          {seq < 0 && <Welcome />}
        </div>
        {parax && <div dangerouslySetInnerHTML={{ __html: parax }} />}
        <button onClick={seq < 0 ? fetchPara : postJawaban} className="bg-gray-200 active:bg-gray-300 px-6 py-2">
          API GET
        </button>
        <span>{Math.ceil(time / 1000)}</span>
        <Timer duration={time} counter={setTime} state={state} />
        <pre id="pre" className="text-xs my-4">
          {pre || "PLACEHOLDER"}
        </pre>
      </main>
    </>
  );
}
