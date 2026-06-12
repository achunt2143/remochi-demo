import React, { useRef, useState } from 'react';
import './App.css';
import {
  MochiButton,
  MochiRadio,
  MochiToggle,
  MochiInput,
  MochiPopupPanel,
  MochiProgressBar,
  MochiSlider,
  Spinner,
} from 'remochi';

function App() {
  const [selected, setSelected] = useState('alpha');
  const [popupOpen, setPopupOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState(null);
  const [sliderVal, setSliderVal] = useState(50);
  const [isOn, setIsOn] = useState(false);
  const [log, setLog] = useState([]);
  const dropdownBtnRef = useRef(null);

  const addLog = (msg) => setLog((prev) => [msg, ...prev.slice(0, 6)]);

  const openPopup = () => {
    if (dropdownBtnRef.current) {
      const rect = dropdownBtnRef.current.getBoundingClientRect();
      setAnchorRect({
        top: rect.top,
        left: rect.left,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
      });
      setPopupOpen(true);
    }
  };

  return (
    <div className="App">
      <h1 className="app-title">Remochi Component Sampler</h1>

      {/* ── Buttons ────────────────────────────────────── */}
      <section className="section button-group">
        <h2>Buttons</h2>
        <div className="buttons-row">
          <MochiButton type="normal" onClick={() => addLog('Normal clicked')}>
            Normal
          </MochiButton>

          <MochiButton
            type="dropdown"
            ref={dropdownBtnRef}
            onClick={openPopup}
          >
            Open Popup
          </MochiButton>

          <MochiButton type="warning" onClick={() => addLog('Warning clicked')}>
            Warning
          </MochiButton>

          <MochiButton type="disabled">
            Disabled
          </MochiButton>
        </div>
      </section>

      {/* ── Radio ──────────────────────────────────────── */}
      <section className="section">
        <h2>Radio</h2>
        <div className="radio-group">
          {['alpha', 'beta', 'gamma'].map((val) => (
            <MochiRadio
              key={val}
              name="choice"
              value={val}
              checked={selected === val}
              onChange={() => {
                setSelected(val);
                addLog(`Radio: ${val}`);
              }}
            >
              {val.charAt(0).toUpperCase() + val.slice(1)}
            </MochiRadio>
          ))}
        </div>
        <p style={{ marginTop: 8, color: '#888', fontStyle: 'italic' }}>
          Selected: <strong>{selected}</strong>
        </p>
      </section>

      {/* ── Toggle ─────────────────────────────────────── */}
      <section className="section toggle-group">
        <h2>Toggle</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <MochiToggle
            checked={isOn}
            onChange={() => {
              setIsOn((v) => !v);
              addLog(`Toggle: ${!isOn ? 'on' : 'off'}`);
            }}
          />
          <span style={{ color: '#555' }}>{isOn ? 'On' : 'Off'}</span>
        </div>
      </section>

      {/* ── Input ──────────────────────────────────────── */}
      <section className="section input-group">
        <h2>Input</h2>
        <MochiInput placeholder="Default input" />
        <MochiInput placeholder="Search…" type="search" />
        <MochiInput placeholder="Password" type="password" />
        <MochiInput placeholder="Disabled" disabled />
      </section>

      {/* ── Progress Bar ───────────────────────────────── */}
      <section className="section progress-slider-group">
        <h2>Progress Bar</h2>
        <p style={{ marginBottom: 8, color: '#555' }}>Value tied to slider below: {sliderVal}%</p>
        <MochiProgressBar value={sliderVal} />
        <MochiProgressBar value={25} color="yellow" height="16px" />
        <MochiProgressBar value={80} color="red" width="300px" />

        {/* ── Slider ───────────────────────────────────── */}
        <h2 style={{ marginTop: 28 }}>Slider</h2>
        <MochiSlider
          value={sliderVal}
          onChange={(v) => {
            setSliderVal(v);
            addLog(`Slider: ${v}`);
          }}
        />
        <MochiSlider value={38} color="#ffb80d" width="280px" />
        <MochiSlider value={80} color="#d32f2f" />
      </section>

      {/* ── Spinner ────────────────────────────────────── */}
      <section className="section spinner-group">
        <h2>Spinner</h2>
        <div className="spinners-row">
          <div>
            <p style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>light / normal</p>
            <Spinner active={true} styleType="light" size="normal" />
          </div>
          <div>
            <p style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>light / large</p>
            <Spinner active={true} styleType="light" size="large" />
          </div>
          <div>
            <p style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>dark / normal</p>
            <Spinner active={true} styleType="dark" size="normal" />
          </div>
          <div>
            <p style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>inactive</p>
            <Spinner active={false} />
          </div>
        </div>
      </section>

      {/* ── Activity Log ───────────────────────────────── */}
      <section className="section">
        <h2>Activity Log</h2>
        <div className="log-container">
          {log.length === 0 ? (
            <p className="log-empty">Interact with components above to see events…</p>
          ) : (
            log.map((msg, i) => (
              <div key={i} className="log-entry">{msg}</div>
            ))
          )}
        </div>
      </section>

      {/* ── Popup Panel ────────────────────────────────── */}
      <MochiPopupPanel
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        anchorRect={anchorRect}
        title="Alarm Picker"
        actions={[
          {
            label: 'Cancel',
            onClick: () => { setPopupOpen(false); addLog('Popup: cancelled'); },
            type: 'warning',
          },
          {
            label: 'Set Alarm',
            onClick: () => { setPopupOpen(false); addLog('Popup: alarm set'); },
          },
        ]}
      >
        <div className="popup-time">
          11:00 am <span>▼</span>
        </div>
      </MochiPopupPanel>
    </div>
  );
}

export default App;
