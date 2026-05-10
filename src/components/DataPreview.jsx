import React from 'react'
import './DataPreview.css'

const DataPreview = ({ mappingResult, previewData, fileName }) => {
  if (!mappingResult && !previewData) {
    return (
      <div className="data-preview-empty">
        <p>📤 Upload file CSV untuk melihat hasil mapping dan preview data</p>
      </div>
    )
  }

  return (
    <div className="data-preview-container">
      {fileName && (
        <div className="preview-header">
          <h3 className="preview-title">📊 Hasil Processing: {fileName}</h3>
          <span className="success-badge">✓ Berhasil Diproses</span>
        </div>
      )}

      {mappingResult && (
        <div className="mapping-section">
          <h4 className="section-title">Mapping Kolom</h4>
          <div className="mapping-grid">
            {Object.entries(mappingResult).map(([source, target]) => (
              <div key={source} className="mapping-item">
                <div className="mapping-source">{source}</div>
                <div className="mapping-arrow">→</div>
                <div className="mapping-target">{target}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {previewData && previewData.length > 0 && (
        <div className="preview-data-section">
          <h4 className="section-title">Preview Data ({previewData.length} rows)</h4>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="col-no">#</th>
                  {previewData[0] && Object.keys(previewData[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'even' : 'odd'}>
                    <td className="col-no">{idx + 1}</td>
                    {Object.values(row).map((value, colIdx) => (
                      <td key={colIdx} className="data-cell">
                        {value === null || value === undefined ? (
                          <span className="null-value">-</span>
                        ) : (
                          String(value).length > 50 ? (
                            <span title={String(value)}>
                              {String(value).substring(0, 50)}...
                            </span>
                          ) : (
                            String(value)
                          )
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataPreview
