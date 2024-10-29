import {React, useContext} from 'react'

import { TransactionContext } from '../../context/TransactionContext';

export const About = () => {
  const {value} = useContext(TransactionContext);

  return (
    <>
    <div className="text-center Home">
      <h1 className="text-white">About us</h1>
      <br />
      <div className="text-white">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi officia
        corporis at cum sint placeat quasi voluptatibus! Officia molestiae
        tenetur at distinctio, earum, saepe beatae debitis cupiditate nulla
        nisi laborum doloribus corrupti unde totam minima id, a praesentium
        explicabo aspernatur.
      </div>

    </div>
  </>
  )
}
