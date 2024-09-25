import React from 'react'

function CreateRoom() {
  return (
    <>
    <h1>Create a Room</h1>
    <form className='Create-user'  >

        <div className='user-NameColm' >
            <label htmlFor="user-name">UserName </label>
            <input type="text"
                className="user-Name"
                id="userName"
                placeholder="UserName"
                // value={userName}
                // onChange={userNameInputHandler} 
                />
        </div>


        <button type="submit" className="createUser-btn"> Create</button>
    </form>
</>
  )
}

export default CreateRoom