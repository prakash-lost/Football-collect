import React from 'react'

const Header = () => {
  return (
    <div>
      <div className='flex'>
        <img src='./favigon.svg'/>
        <div>
          <input type='text'placeholder='Search Games'/>
        </div>
      </div>
    </div>
  )
}

export default Header