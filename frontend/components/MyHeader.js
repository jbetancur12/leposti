import styles from "../styles/New.module.css"

import { useState } from "react"
import { FaBars } from "react-icons/fa"
import Image from 'next/image'
import { Layout, Button, Drawer, Menu } from 'antd'

import MyMenu from "./MyMenu"

const { Header } = Layout

const MyHeader = () => {
    const [visible, setVisible] = useState(false)

    const showDrawer = () => {
      setVisible(true)
    }

    const onClose = () => {
      setVisible(false)
    }

    return (
        <Header className={styles.header} id="header">
        <script
          dangerouslySetInnerHTML={{
            __html: `window.callbellSettings = {
            token: "YyHsMyjm9oSczzf9t5T3uvXQ"};`,
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: ` (function(){var w=window;var ic=w.callbell;if(typeof ic==="function"){ic('reattach_activator');ic('update',callbellSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Callbell=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://dash.callbell.eu/include/'+window.callbellSettings.token+'.js';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()`,
          }}
        ></script>
        <div className={styles.img}>
          <Image
            src="/logoprincipalBlanco.png"
            alt="Logo de Leposti"
            width={140}
            height={33}
          />
        </div>
        <div className={styles.myMenu}>
          <MyMenu type="horizontal"/>
        </div>
        <Button className={styles.barsMenu} type="primary" onClick={showDrawer}>
          <FaBars/>
        </Button>
        <Drawer
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ padding: 0 }}
        >
          <MyMenu type="vertical"/>
        </Drawer>
      </Header>
    )
}

export default MyHeader;