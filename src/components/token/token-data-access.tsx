'use client'

import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useState, useEffect } from 'react'
import { PublicKey } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

export function useTokenBalance() {
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const [tokenBalance, setTokenBalance] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkBalance() {
      if (!publicKey) {
        setTokenBalance(0)
        setIsLoading(false)
        return
      }

      try {
        const tokenMint = new PublicKey(process.env.NEXT_PUBLIC_BAIBAI_TOKEN_ADDRESS!)

        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
          publicKey,
          { programId: TOKEN_PROGRAM_ID }
        )

        const tokenAccount = tokenAccounts.value.find(
          (account) => account.account.data.parsed.info.mint === tokenMint.toString()
        )

        if (tokenAccount) {
          const balance = Number(tokenAccount.account.data.parsed.info.tokenAmount.amount)
          setTokenBalance(balance)
        } else {
          setTokenBalance(0)
        }
      } catch (error) {
        console.error('Error checking token balance:', error)
        setTokenBalance(0)
      }
      
      setIsLoading(false)
    }

    checkBalance()
    // Set up interval to check balance periodically
    const interval = setInterval(checkBalance, 10000)
    return () => clearInterval(interval)
  }, [connection, publicKey])

  return { tokenBalance, isLoading }
} 