export default function Intro() {
  return (
    <div className="intro-container">
      <h2>關於本站</h2>
      <p className="intro-text">
        這是一個融合現代前端技術與經典博弈樂趣的互動空間。
        本站致力於展示技術與藝術的結合，透過流暢的介面與生動的視覺效果，為使用者提供最佳的瀏覽體驗。
      </p>
      <div className="tech-stack">
        <h3>核心技術</h3>
        <div className="tags">
          <span className="tag">React 19</span>
          <span className="tag">TypeScript</span>
          <span className="tag">Vite</span>
          <span className="tag">Modern CSS</span>
        </div>
      </div>
      <p className="vision">
        在這裡，你可以了解我的專業背景，也能在休閒之餘，與朋友或自己來一場腦力激盪的西洋棋對決。
      </p>
    </div>
  )
}
