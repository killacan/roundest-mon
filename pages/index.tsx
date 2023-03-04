import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Roundest Mon Test</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <div className='h-screen w-screen flex flex-col justify-center align-middle items-center' >
          <div className='text-2xl text-center' >Which Pokemon is Rounder?</div>
          <div className='p-2' />
          <div className='border rounded p-8 flex justify-between items-center max-w-2xl' >
            <div className='w-16 h-16 bg-red-200'/>
            <div className='p-8'>VS</div>
            <div className='w-16 h-16 bg-red-200'/>
          </div>

        </div>

      </main>
    </>
  )
}
