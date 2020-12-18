
import React from 'react'
import styled from 'styled-components'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'

const Bg = styled.div`
    width: 100vw;
    position :relative;
    
`

const MainSection = styled.div`
    
    width: 100%;
    z-index: 1;
    background-color: aqua;
    margin: 0 auto;
    margin-top: 10vh;
`

function Layout(props) {
    return (
        <Bg>
            <NavBar />
            <MainSection>
                {props.children}
            </MainSection>
            <Footer />
        </Bg>
    )
}

export default Layout
