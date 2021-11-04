import { h } from 'aureolin'


export const Aureolin = ({ stars = 0 }) => {
    return (
        <div style={{
            backgroundColor: '#fefcea',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            margin: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'sans-serif',
            fontSize: '1.5em',
            fontWeight: 'bold',
            color: '#333',
        }}>
            <h1>Aureolin</h1>
            <p>Aureolin is a simple, fast, and powerful framework for Node.js with a focus on simplicity</p>
            <p>It is a framework for building web applications with ease</p>
            <p>Aureolin's Source Code is available on Github:</p>
            <p>
                <a href="https://github.com/AlenSaito1/Aureolin" target="_blank">https://github.com/AlenSaito1/Aureolin</a>
            </p>
            <p>
                ⭐ {stars} Stars
            </p>
        </div>
    )

}


export default Aureolin