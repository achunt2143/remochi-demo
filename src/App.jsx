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
import SlidingMenu from './Menu/SlidingMenu';
import SlidingMenuItem from './Menu/SlidingMenuItem';
import SlidingMenuItemGroup from './Menu/SlidingMenuItemGroup';

function App() {
  // ── remochi state ──────────────────────────────────────────────
  const [selected, setSelected] = useState('alpha');
  const [popupOpen, setPopupOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState(null);
  const [sliderVal, setSliderVal] = useState(50);
  const [isOn, setIsOn] = useState(false);
  const [log, setLog] = useState([]);
  const dropdownBtnRef = useRef(null);

  // ── SlidingMenu state ──────────────────────────────────────────
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState('left');
  const [activeNavItem, setActiveNavItem] = useState('dashboard');

  const addLog = (msg) => setLog((prev) => [msg, ...prev.slice(0, 6)]);

  const openPopup = () => {
    if (dropdownBtnRef.current) {
      const rect = dropdownBtnRef.current.getBoundingClientRect();
      setAnchorRect({ top: rect.top, left: rect.left, bottom: rect.bottom, width: rect.width, height: rect.height });
      setPopupOpen(true);
    }
  };

  const navItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'analytics', icon: '📊', label: 'Analytics' },
    { id: 'projects', icon: '📁', label: 'Projects', badge: '3' },
    { id: 'messages', icon: '💬', label: 'Messages', badge: '12' },
  ];

  const accountItems = [
    { id: 'profile', icon: '👤', label: 'Profile' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
    { id: 'logout', icon: '🚪', label: 'Logout', variant: 'danger' },
  ];

  return (
    <>
      {/* ── SlidingMenu (renders behind content) ─────────────────── */}
      <SlidingMenu
        position={menuPosition}
        isOpen={menuOpen}
        onOpenChange={setMenuOpen}
        duration={300}
        backdropColor="rgba(0,0,0,0.45)"
      >
        <SlidingMenuItemGroup label="Navigation">
          {navItems.map((item) => (
            <SlidingMenuItem
              key={item.id}
              icon={item.icon}
              badge={item.badge}
              isActive={activeNavItem === item.id}
              onClick={() => {
                setActiveNavItem(item.id);
                setMenuOpen(false);
                addLog(`Nav: ${item.label}`);
              }}
            >
              {item.label}
            </SlidingMenuItem>
          ))}
        </SlidingMenuItemGroup>

        <SlidingMenuItemGroup label="Account" divider>
          {accountItems.map((item) => (
            <SlidingMenuItem
              key={item.id}
              icon={item.icon}
              variant={item.variant || 'default'}
              onClick={() => {
                setMenuOpen(false);
                addLog(`Account: ${item.label}`);
              }}
            >
              {item.label}
            </SlidingMenuItem>
          ))}
        </SlidingMenuItemGroup>
      </SlidingMenu>

      {/* ── ContentShifter wraps all app content ─────────────────── */}
      <SlidingMenu.ContentShifter
        position={menuPosition}
        isMenuOpen={menuOpen}
        menuWidth="280px"
        menuHeight="320px"
        duration={300}
      >
        <div className="App">
          {/* ── Header ─────────────────────────────────────────────── */}
          <header className="app-header">
            <MochiButton type="normal" onClick={() => setMenuOpen((v) => !v)}>
              ☰ Menu
            </MochiButton>
            <h1 className="app-title">Remochi Component Sampler</h1>
            <span style={{ color: '#888', fontSize: 13, fontStyle: 'italic' }}>
              Active: {activeNavItem}
            </span>
          </header>

          {/* ── SlidingMenu controls ──────────────────────────────── */}
          <section className="section">
            <h2>SlidingMenu</h2>
            <p style={{ color: '#666', marginBottom: 14, fontSize: 14 }}>
              A menu that slides content to reveal itself from behind. Choose a position then click ☰ Menu above.
            </p>
            <div className="buttons-row" style={{ marginBottom: 12 }}>
              {['left', 'right', 'top', 'bottom'].map((pos) => (
                <MochiButton
                  key={pos}
                  type={menuPosition === pos ? 'normal' : 'dropdown'}
                  onClick={() => { setMenuPosition(pos); addLog(`Menu position: ${pos}`); }}
                >
                  {pos}
                </MochiButton>
              ))}
            </div>
            <div className="menu-demo-note" style={{
              background: '#f0f7ff',
              border: '1px solid #c0d8f0',
              borderRadius: 8,
              padding: '10px 14px',
              fontSize: 13,
              color: '#555',
            }}>
              <strong>SlidingMenuItemGroup</strong> organises items into labelled sections with an optional divider.
              {' '}<strong>SlidingMenuItem</strong> supports icon, badge, isActive, disabled, and variant="danger".
            </div>
          </section>

          {/* ── MochiButton ──────────────────────────────────────── */}
          <section className="section button-group">
            <h2>MochiButton</h2>
            <div className="buttons-row">
              <MochiButton type="normal" onClick={() => addLog('Button: normal')}>Normal</MochiButton>
              <MochiButton
                type="dropdown"
                ref={dropdownBtnRef}
                onClick={openPopup}
              >
                Open Popup
              </MochiButton>
              <MochiButton type="warning" onClick={() => addLog('Button: warning')}>Warning</MochiButton>
              <MochiButton type="disabled">Disabled</MochiButton>
            </div>
          </section>

          {/* ── MochiRadio ───────────────────────────────────────── */}
          <section className="section">
            <h2>MochiRadio</h2>
            <div className="radio-group">
              {['alpha', 'beta', 'gamma'].map((val) => (
                <MochiRadio
                  key={val}
                  name="choice"
                  value={val}
                  checked={selected === val}
                  onChange={() => { setSelected(val); addLog(`Radio: ${val}`); }}
                >
                  {val.charAt(0).toUpperCase() + val.slice(1)}
                </MochiRadio>
              ))}
            </div>
            <p style={{ marginTop: 8, color: '#888', fontStyle: 'italic', fontSize: 13 }}>
              Selected: <strong>{selected}</strong>
            </p>
          </section>

          {/* ── MochiToggle ─────────────────────────────────────── */}
          <section className="section toggle-group">
            <h2>MochiToggle</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <MochiToggle
                checked={isOn}
                onChange={() => { setIsOn((v) => !v); addLog(`Toggle: ${!isOn ? 'on' : 'off'}`); }}
              />
              <span style={{ color: '#555' }}>{isOn ? 'On ✓' : 'Off'}</span>
            </div>
          </section>

          {/* ── MochiInput ──────────────────────────────────────── */}
          <section className="section input-group">
            <h2>MochiInput</h2>
            <MochiInput placeholder="Default input" />
            <MochiInput placeholder="Search…" type="search" />
            <MochiInput placeholder="Password" type="password" />
            <MochiInput placeholder="Disabled" disabled />
          </section>

          {/* ── MochiProgressBar + MochiSlider ──────────────────── */}
          <section className="section progress-slider-group">
            <h2>MochiProgressBar</h2>
            <p style={{ marginBottom: 8, color: '#666', fontSize: 13 }}>
              Top bar is tied to the slider below — value: <strong>{sliderVal}%</strong>
            </p>
            <MochiProgressBar value={sliderVal} />
            <MochiProgressBar value={25} color="yellow" height="16px" />
            <MochiProgressBar value={80} color="red" width="300px" />

            <h2 style={{ marginTop: 28 }}>MochiSlider</h2>
            <MochiSlider
              value={sliderVal}
              onChange={(v) => { setSliderVal(v); addLog(`Slider: ${v}`); }}
            />
            <MochiSlider value={38} color="#ffb80d" width="280px" />
            <MochiSlider value={80} color="#d32f2f" />
          </section>

          {/* ── Spinner ─────────────────────────────────────────── */}
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
                <span style={{ fontSize: 11, color: '#bbb' }}>(hidden)</span>
              </div>
            </div>
          </section>

          {/* ── Activity Log ────────────────────────────────────── */}
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
        </div>
      </SlidingMenu.ContentShifter>

      {/* ── MochiPopupPanel (rendered outside shifter so it stays fixed) */}
      <MochiPopupPanel
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        anchorRect={anchorRect}
        title="Alarm Picker"
        actions={[
          { label: 'Cancel', onClick: () => { setPopupOpen(false); addLog('Popup: cancelled'); }, type: 'warning' },
          { label: 'Set Alarm', onClick: () => { setPopupOpen(false); addLog('Popup: alarm set!'); } },
        ]}
      >
        <div className="popup-time">
          11:00 am <span>▼</span>
        </div>
      </MochiPopupPanel>
    </>
  );
}

export default App;
