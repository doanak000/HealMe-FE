import { Content } from 'antd/lib/layout/layout'
import React from 'react'
import { memo } from 'react'

const LayoutLogin = ({ children }) => {
    return (
        <div className="container-fluid overflow-hidden px-0">
            <header>Header nè</header>
            <main className="container px-0">
                <Content>{children}</Content>
            </main>
            <footer>Footer nè</footer>
        </div>
    )
}

export default memo(LayoutLogin)