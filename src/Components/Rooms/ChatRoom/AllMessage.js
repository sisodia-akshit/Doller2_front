import React, { useEffect, useState } from 'react'

function AllMessage(props) {
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        props.socket.on('new message', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
            window.scrollTo(0, document.body.scrollHeight);

            const boxMessage = document.querySelector('.messageBox')
            boxMessage.scrollTop = boxMessage.scrollHeight - boxMessage.clientHeight;

            // console.log(boxMessage.scrollHeight)
            // console.log(boxMessage.clientHeight)
            // console.log(boxMessage.scrollTop)
        });

        return () => {
            props.socket.off('new message');
        };

    }, []);

    if (!messages) return <div>Loading...</div>;


    return (
        <>
            <ul className='messageBox' style={{ color: '#fff' }} >
                <div style={{ border: '.5px solid #fff', margin: '0 1rem', padding: '2rem 1rem' }}>
                    <h1 style={{ textAlign: 'center' }}>Admin</h1>
                    <br />
                    <p style={{ textAlign: 'center', color: '#fff8' }}>Hello all, this is a friendly chat Web Application, i knoww this is not great but i am working on this application.</p>
                </div>

                <br />
                <h3 style={{ textAlign: 'center' }}>NOTE:</h3>
                <p style={{ textAlign: 'center', color: '#fff9', padding: '0 1rem' }}>Anyone  can join this chat, try not to use your your actual name as <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Username</span> while SignUp or Creating your account.</p>
                <br></br>
                <br></br>
                {messages.map((msg, index) => {
                    if (msg.userName === props.userName) {
                        return <li key={index} className='boxMessage' style={{ textAlign: 'right' }}><span className='senderMessage'>{msg.message}</span></li>
                    }
                    return <li key={index} className='boxMessage'><span className='messageSender'>{msg.userName}: </span><span className='othersMessage'>{msg.message}</span></li>
                })}
            </ul>
        </>
    )
}

export default AllMessage