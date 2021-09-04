import { useWallet } from '@parrotfi/wallets'
import React, { useCallback } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Button } from '../components/button'
import { Header } from '../components/header'
import CardBase from '../components/ido/CardBase'
import PoolCard from '../components/ido/PoolCard'
import { useIDO } from '../hooks/useIDO'
import useWalletStore from '../stores/useWalletStore'

const Main = () => {
  const { endpoint } = useWallet()
  const { loadIDO, loadingIDO, loadingError } = useIDO()
  const pools = useWalletStore((s) => s.pools)

  const handleReload = useCallback(() => {
    loadIDO(endpoint)
  }, [endpoint, loadIDO])

  return (
    <main className="w-full flex flex-col items-center justify-center my-4 space-y-4 sm:my-6 md:space-x-6 md:flex-row md:space-y-0">
      {pools.map((pool, index) => (
        <PoolCard
          key={pool.publicKey.toBase58()}
          pool={pool}
          round={`${index + 1}`}
        />
      ))}
      {!!loadingError && (
        <CardBase title="Error" className="md:col-span-2">
          <p className="leading-snug mb-6">{loadingError}</p>
          <Button size="sm" onClick={handleReload}>
            Retry
          </Button>
        </CardBase>
      )}
      {loadingIDO &&
        [1, 2].map((key) => (
          <CardBase key={key} title="Loading...">
            <Skeleton count={3} height={90} className="my-1" />
          </CardBase>
        ))}
    </main>
  )
}

const Page: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-scaffold">
      <Header />
      <Main />
    </div>
  )
}

export default Page
