export default function Profile() {
  return (
    <div className="profile-card">
      <h2 className="profile-title">PILOT PROFILE</h2>
      <div className="profile-info">
        <div className="info-item">
          <span className="label">IDENTIFIER:</span>
          <span className="value">陳昱瑄 (Chen Yu-Xuan)</span>
        </div>
        <div className="info-item">
          <span className="label">RANK:</span>
          <span className="value">資工三 (CS Junior)</span>
        </div>
        <div className="info-item">
          <span className="label">SPECIALIZATION:</span>
          <span className="value">Frontend / Game Dev / Algorithmic Chess</span>
        </div>
      </div>
      <div className="profile-bio">
        <p>沉迷於代碼與邏輯的交界，致力於構建具有極致視覺與流暢體驗的虛擬空間。</p>
      </div>
    </div>
  )
}
