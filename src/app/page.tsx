import styles from './main.module.css';

export default function Page() {
  return (
    <ul>
      <div className={styles.mainBody}>
        <h1 className={`${styles.italicRainbow} ${styles.bounce} ${styles.rainbowShadow}`}>WELCOME TO LYCANEA.DEV</h1>
        <h3>I KNOW ITS UGLY OKAY ILL LIKE MAKE IT PRETTY LATER</h3>
        <p>i need a blog that just works for now okie :3</p>
        <p>enjoy me learning <a href="https://nextjs.org/">next.js</a> and stuff :3</p>
      </div>
    </ul>
  )
}