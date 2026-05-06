import React from 'react'

export default function Intro(): JSX.Element {
  return (
    <div>
      <h2>網站介紹</h2>
      <p>這是一個使用 React + TypeScript 與 Vite 建置的期中作品，包含三個主要區段：網站介紹、個人簡介與一個小遊戲。</p>
      <ul>
        <li>技術：React 19、TypeScript、Vite</li>
        <li>部署：GitHub Pages（由 GitHub Actions 自動發佈）</li>
      </ul>
    </div>
  )
}
