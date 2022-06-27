import React from 'react'
import { AmplifySignOut } from '@aws-amplify/ui-react-v1';


function Home() {
  return (
    <div>
        <AmplifySignOut />
        <h1>Home Page</h1>
        <h2>Sensegrass Amplify App</h2>
    </div>
  )
}

export default Home