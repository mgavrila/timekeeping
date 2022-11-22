import React from 'react'
import { trpc } from '../../trpc'

const Dashboard: React.FC = () => {
  const hello = trpc.sayHello.useQuery()
  // const isAuth = trpc.getMe.useQuery();
  // if (!isAuth.data) {
  //   return <main>{isAuth.failureReason?.message}</main>;
  // }
  return <main className="p-2">aaa</main>
}

export default Dashboard
