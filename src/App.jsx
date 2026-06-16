import React, { useRef, useState } from 'react';
import './App.css';
import {
  // Button family
  Button,
  Radio,
  ViewSelectButton,
  // Toggle
  Toggle,
  // Input family
  Input,
  RichText,
  TextArea,
  // Popup
  PopupPanel,
  // Progress & Slider
  ProgressBar,
  Slider,
  // Spinner
  Spinner,
  // Badge
  Badge,
  // Checkbox
  Checkbox,
  // Collapsable
  Collapsable,
  // DateInput
  DateInput,
  // Dialog
  Dialog,
  // Divider
  Divider,
  NubbinDivider,
  // Dropdown
  Dropdown,
  // Headers
  Header,
  Subheader,
  // Item
  Item,
  // Lists
  List,
  ListItem,
  ListHeader,
  GridList,
  // MediaPlayer
  Video,
  // NumberInput
  NumberInput,
  // Pagination
  Pagination,
  // Panels
  StackedPanels,
  StackedPanel,
  Panel,
  FloatingPanel,
  // Table
  Table,
  // ThemeWrapper
  ThemeWrapper,
  useTheme,
  // Wizard
  Wizard,
} from 'remochi';

import SlidingMenu from './Menu/SlidingMenu';
import SlidingMenuItem from './Menu/SlidingMenuItem';
import SlidingMenuItemGroup from './Menu/SlidingMenuItemGroup';

// ── Inner app wrapped by ThemeWrapper ─────────────────────────────────────────
function InnerApp() {
  const { theme, setTheme } = useTheme();

  // Shared state
  const [log, setLog] = useState([]);
  const addLog = (msg) => setLog((prev) => [msg, ...prev.slice(0, 9)]);

  // Button / Popup
  const dropdownBtnRef = useRef(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState(null);
  const openPopup = () => {
    if (dropdownBtnRef.current) {
      setAnchorRect(dropdownBtnRef.current.getBoundingClientRect());
      setPopupOpen(true);
    }
  };

  // Radio
  const [radioVal, setRadioVal] = useState('alpha');

  // Toggle
  const [toggleOn, setToggleOn] = useState(false);

  // Checkbox
  const [checked, setChecked] = useState(false);

  // Slider / ProgressBar
  const [sliderVal, setSliderVal] = useState(50);

  // NumberInput / DateInput
  const [numVal, setNumVal] = useState(42);
  const [dateVal, setDateVal] = useState('');

  // Dropdown
  const [dropdownVal, setDropdownVal] = useState('');
  const dropdownOptions = [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c' },
  ];

  // Dialog
  const [dialogOpen, setDialogOpen] = useState(false);

  // Collapsable
  const [collapsed, setCollapsed] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);

  // ViewSelectButton
  const [viewMode, setViewMode] = useState('grid');

  // Wizard
  const [wizardStep, setWizardStep] = useState(0);
  const wizardSteps = ['Account', 'Profile', 'Review'];

  // SlidingMenu
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState('left');
  const [activeNav, setActiveNav] = useState('dashboard');
  const navItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'analytics', icon: '📊', label: 'Analytics' },
    { id: 'projects', icon: '📁', label: 'Projects', badge: '3' },
    { id: 'messages', icon: '💬', label: 'Messages', badge: '12' },
  ];

  // Table data
  const tableColumns = ['Name', 'Role', 'Status'];
  const tableRows = [
    ['Alice', 'Engineer', 'Active'],
    ['Bob', 'Designer', 'Away'],
    ['Carol', 'PM', 'Active'],
  ];

  return (
    <>
      {/* ── SlidingMenu ────────────────────────────────────────────────── */}
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
              isActive={activeNav === item.id}
              onClick={() => { setActiveNav(item.id); setMenuOpen(false); addLog(`Nav: ${item.label}`); }}
            >
              {item.label}
            </SlidingMenuItem>
          ))}
        </SlidingMenuItemGroup>
        <SlidingMenuItemGroup label="Account" divider>
          <SlidingMenuItem icon="⚙️" onClick={() => { setMenuOpen(false); addLog('Settings'); }}>Settings</SlidingMenuItem>
          <SlidingMenuItem icon="🚪" variant="danger" onClick={() => { setMenuOpen(false); addLog('Logout'); }}>Logout</SlidingMenuItem>
        </SlidingMenuItemGroup>
      </SlidingMenu>

      <SlidingMenu.ContentShifter
        position={menuPosition}
        isMenuOpen={menuOpen}
        menuWidth="280px"
        menuHeight="320px"
        duration={300}
      >
        <div className="App">

          {/* ── App Header ─────────────────────────────────────────────── */}
          <header className="app-header">
            <Button onClick={() => setMenuOpen((v) => !v)}>☰ Menu</Button>
            <h1 className="app-title">Remochi Sampler</h1>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: '#888' }}>Theme:</span>
              <Button onClick={() => { setTheme(theme === 'light' ? 'dark' : 'light'); addLog(`Theme: ${theme === 'light' ? 'dark' : 'light'}`); }}>
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
              </Button>
            </div>
          </header>

          {/* ── Headers ────────────────────────────────────────────────── */}
          <section className="section">
            <Header>Header Component</Header>
            <Subheader>Subheader Component — sits below a Header</Subheader>
          </section>

          <Divider />

          {/* ── Button family ──────────────────────────────────────────── */}
          <section className="section">
            <h2>Button / Radio / ViewSelectButton</h2>
            <div className="buttons-row">
              <Button onClick={() => addLog('Button: normal')}>Normal</Button>
              <Button type="warning" onClick={() => addLog('Button: warning')}>Warning</Button>
              <Button type="disabled">Disabled</Button>
              <Button ref={dropdownBtnRef} type="dropdown" onClick={openPopup}>Open Popup ▾</Button>
            </div>
            <div className="buttons-row" style={{ marginTop: 12 }}>
              <ViewSelectButton
                value={viewMode}
                options={[{ value: 'grid', label: '⊞ Grid' }, { value: 'list', label: '☰ List' }]}
                onChange={(v) => { setViewMode(v); addLog(`View: ${v}`); }}
              />
            </div>
            <div className="radio-group" style={{ marginTop: 12 }}>
              {['alpha', 'beta', 'gamma'].map((v) => (
                <Radio key={v} name="demo" value={v} checked={radioVal === v}
                  onChange={() => { setRadioVal(v); addLog(`Radio: ${v}`); }}>
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </Radio>
              ))}
            </div>
          </section>

          <NubbinDivider />

          {/* ── Toggle & Checkbox ──────────────────────────────────────── */}
          <section className="section">
            <h2>Toggle &amp; Checkbox</h2>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Toggle checked={toggleOn} onChange={() => { setToggleOn((v) => !v); addLog(`Toggle: ${!toggleOn ? 'on' : 'off'}`); }} />
                <span>{toggleOn ? 'On ✓' : 'Off'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Checkbox checked={checked} onChange={() => { setChecked((v) => !v); addLog(`Checkbox: ${!checked}`); }} />
                <span>Checkbox {checked ? '☑' : '☐'}</span>
              </div>
            </div>
          </section>

          <Divider />

          {/* ── Input family ───────────────────────────────────────────── */}
          <section className="section input-group">
            <h2>Input / TextArea / RichText</h2>
            <Input placeholder="Text input" />
            <Input placeholder="Search…" type="search" />
            <Input placeholder="Password" type="password" />
            <Input placeholder="Disabled" disabled />
            <TextArea placeholder="TextArea — multiline input" rows={3} style={{ marginTop: 8, width: '100%' }} />
            <div style={{ marginTop: 8 }}>
              <RichText placeholder="RichText editor" />
            </div>
          </section>

          <Divider />

          {/* ── NumberInput & DateInput ─────────────────────────────────── */}
          <section className="section">
            <h2>NumberInput &amp; DateInput</h2>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div>
                <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 4 }}>NumberInput</label>
                <NumberInput value={numVal} onChange={(v) => { setNumVal(v); addLog(`Number: ${v}`); }} />
              </div>
              <div>
                <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 4 }}>DateInput</label>
                <DateInput value={dateVal} onChange={(v) => { setDateVal(v); addLog(`Date: ${v}`); }} />
              </div>
            </div>
          </section>

          <Divider />

          {/* ── ProgressBar & Slider ────────────────────────────────────── */}
          <section className="section progress-slider-group">
            <h2>ProgressBar (live) &amp; Slider</h2>
            <p style={{ color: '#666', fontSize: 13, marginBottom: 8 }}>Value: <strong>{sliderVal}%</strong></p>
            <ProgressBar value={sliderVal} />
            <ProgressBar value={25} color="yellow" height="16px" />
            <ProgressBar value={80} color="red" width="300px" />
            <div style={{ marginTop: 16 }}>
              <Slider value={sliderVal} onChange={(v) => { setSliderVal(v); addLog(`Slider: ${v}`); }} />
              <Slider value={38} color="#ffb80d" width="280px" />
              <Slider value={80} color="#d32f2f" />
            </div>
          </section>

          <Divider />

          {/* ── Spinner ────────────────────────────────────────────────── */}
          <section className="section spinner-group">
            <h2>Spinner</h2>
            <div className="spinners-row">
              {[['light', 'normal'], ['light', 'large'], ['dark', 'normal'], ['dark', 'large']].map(([st, sz]) => (
                <div key={`${st}-${sz}`}>
                  <p style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>{st}/{sz}</p>
                  <Spinner active={true} styleType={st} size={sz} />
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* ── Badge ──────────────────────────────────────────────────── */}
          <section className="section">
            <h2>Badge</h2>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <Badge>Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
              <Badge count={7}>Notifications</Badge>
            </div>
          </section>

          <Divider />

          {/* ── Dropdown ───────────────────────────────────────────────── */}
          <section className="section">
            <h2>Dropdown</h2>
            <Dropdown
              options={dropdownOptions}
              value={dropdownVal}
              placeholder="Select an option…"
              onChange={(v) => { setDropdownVal(v); addLog(`Dropdown: ${v}`); }}
            />
          </section>

          <Divider />

          {/* ── Item ───────────────────────────────────────────────────── */}
          <section className="section">
            <h2>Item</h2>
            <Item label="Full Name" value="Alice Johnson" />
            <Item label="Role" value="Senior Engineer" />
            <Item label="Status" value="Active" />
          </section>

          <Divider />

          {/* ── Lists ──────────────────────────────────────────────────── */}
          <section className="section">
            <h2>List / GridList</h2>
            <List>
              <ListHeader>Team Members</ListHeader>
              <ListItem onClick={() => addLog('List: Alice')}>Alice — Engineer</ListItem>
              <ListItem onClick={() => addLog('List: Bob')}>Bob — Designer</ListItem>
              <ListItem onClick={() => addLog('List: Carol')}>Carol — PM</ListItem>
            </List>
            <div style={{ marginTop: 16 }}>
              <GridList items={['React', 'Rust', 'TypeScript', 'Wayland', 'Node.js', 'SCSS']}
                onItemClick={(item) => addLog(`GridList: ${item}`)} />
            </div>
          </section>

          <Divider />

          {/* ── Table ──────────────────────────────────────────────────── */}
          <section className="section">
            <h2>Table</h2>
            <Table columns={tableColumns} rows={tableRows} onRowClick={(row) => addLog(`Row: ${row[0]}`)} />
          </section>

          <Divider />

          {/* ── Pagination ─────────────────────────────────────────────── */}
          <section className="section">
            <h2>Pagination</h2>
            <Pagination
              currentPage={page}
              totalPages={8}
              onPageChange={(p) => { setPage(p); addLog(`Page: ${p}`); }}
            />
          </section>

          <Divider />

          {/* ── Collapsable ────────────────────────────────────────────── */}
          <section className="section">
            <h2>Collapsable</h2>
            <Collapsable
              title="Click to expand"
              isOpen={!collapsed}
              onToggle={() => setCollapsed((v) => !v)}
            >
              <p style={{ padding: '12px 0', color: '#555' }}>
                Hidden content revealed when expanded. Can nest any components inside.
              </p>
            </Collapsable>
          </section>

          <Divider />

          {/* ── Dialog ─────────────────────────────────────────────────── */}
          <section className="section">
            <h2>Dialog</h2>
            <Button onClick={() => { setDialogOpen(true); addLog('Dialog: opened'); }}>Open Dialog</Button>
            <Dialog
              isOpen={dialogOpen}
              title="Confirm Action"
              onClose={() => setDialogOpen(false)}
              actions={[
                { label: 'Cancel', onClick: () => { setDialogOpen(false); addLog('Dialog: cancelled'); }, type: 'warning' },
                { label: 'Confirm', onClick: () => { setDialogOpen(false); addLog('Dialog: confirmed'); } },
              ]}
            >
              <p>Are you sure you want to proceed with this action?</p>
            </Dialog>
          </section>

          <Divider />

          {/* ── StackedPanels ──────────────────────────────────────────── */}
          <section className="section">
            <h2>StackedPanels</h2>
            <StackedPanels>
              <StackedPanel title="Panel One">Content inside panel one.</StackedPanel>
              <StackedPanel title="Panel Two">Content inside panel two.</StackedPanel>
              <StackedPanel title="Panel Three">Content inside panel three.</StackedPanel>
            </StackedPanels>
          </section>

          <Divider />

          {/* ── Panel ──────────────────────────────────────────────────── */}
          <section className="section">
            <h2>Panel</h2>
            <p style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>
              Width-percentage panels — full height of their row container.
            </p>

            {/* default style row */}
            <p style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>style="default"</p>
            <div style={{ display: 'flex', height: 120, gap: 0, marginBottom: 16 }}>
              <Panel width={25} style="default">
                <div style={{ padding: 12 }}>
                  <strong>25%</strong>
                  <p style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Sidebar</p>
                </div>
              </Panel>
              <Panel width={50} style="default">
                <div style={{ padding: 12 }}>
                  <strong>50%</strong>
                  <p style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Main</p>
                </div>
              </Panel>
              <Panel width={25} style="default">
                <div style={{ padding: 12 }}>
                  <strong>25%</strong>
                  <p style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Detail</p>
                </div>
              </Panel>
            </div>

            {/* shadow style row */}
            <p style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>style="shadow"</p>
            <div style={{ display: 'flex', height: 120, gap: 0 }}>
              <Panel width={33} style="shadow">
                <div style={{ padding: 12 }}>
                  <strong>33%</strong>
                  <p style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Shadow A</p>
                </div>
              </Panel>
              <Panel width={34} style="shadow">
                <div style={{ padding: 12 }}>
                  <strong>34%</strong>
                  <p style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Shadow B</p>
                </div>
              </Panel>
              <Panel width={33} style="shadow">
                <div style={{ padding: 12 }}>
                  <strong>33%</strong>
                  <p style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Shadow C</p>
                </div>
              </Panel>
            </div>
          </section>

          <Divider />

          {/* ── FloatingPanel ──────────────────────────────────────────── */}
          <section className="section">
            <h2>FloatingPanel</h2>
            <p style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>
              Fills its container — 16px radius on all corners.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {/* default */}
              <div style={{ width: 220, height: 130 }}>
                <FloatingPanel style="default">
                  <div style={{ padding: 16 }}>
                    <strong>Default</strong>
                    <p style={{ fontSize: 12, color: '#666', marginTop: 6 }}>
                      Border + flat #F5F5F5 background.
                    </p>
                  </div>
                </FloatingPanel>
              </div>
              {/* shadow */}
              <div style={{ width: 220, height: 130 }}>
                <FloatingPanel style="shadow">
                  <div style={{ padding: 16 }}>
                    <strong>Shadow</strong>
                    <p style={{ fontSize: 12, color: '#666', marginTop: 6 }}>
                      Same surface with inset depth shadow.
                    </p>
                  </div>
                </FloatingPanel>
              </div>
            </div>
          </section>

          <Divider />

          {/* ── Wizard ─────────────────────────────────────────────────── */}
          <section className="section">
            <h2>Wizard</h2>
            <Wizard steps={wizardSteps} currentStep={wizardStep}>
              <div style={{ padding: '16px 0', color: '#555' }}>
                Step {wizardStep + 1} of {wizardSteps.length}: <strong>{wizardSteps[wizardStep]}</strong>
              </div>
            </Wizard>
            <div className="buttons-row" style={{ marginTop: 12 }}>
              <Button onClick={() => { setWizardStep((s) => Math.max(0, s - 1)); addLog('Wizard: back'); }}
                type={wizardStep === 0 ? 'disabled' : 'normal'}>
                ← Back
              </Button>
              <Button onClick={() => { setWizardStep((s) => Math.min(wizardSteps.length - 1, s + 1)); addLog('Wizard: next'); }}
                type={wizardStep === wizardSteps.length - 1 ? 'disabled' : 'normal'}>
                Next →
              </Button>
            </div>
          </section>

          <Divider />

          {/* ── Video (MediaPlayer) ────────────────────────────────────── */}
          <section className="section">
            <h2>Video</h2>
            <Video
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              poster="https://www.w3schools.com/html/pic_trulli.jpg"
              width="100%"
            />
          </section>

          <Divider />

          {/* ── SlidingMenu controls ───────────────────────────────────── */}
          <section className="section">
            <h2>SlidingMenu</h2>
            <p style={{ color: '#666', fontSize: 13, marginBottom: 10 }}>
              Choose a side then click ☰ Menu in the header to slide it open.
            </p>
            <div className="buttons-row">
              {['left', 'right', 'top', 'bottom'].map((pos) => (
                <Button key={pos} type={menuPosition === pos ? 'normal' : 'dropdown'}
                  onClick={() => { setMenuPosition(pos); addLog(`Menu position: ${pos}`); }}>
                  {pos}
                </Button>
              ))}
            </div>
          </section>

          <Divider />

          {/* ── PopupPanel ─────────────────────────────────────────────── */}
          <section className="section">
            <h2>PopupPanel</h2>
            <p style={{ color: '#666', fontSize: 13, marginBottom: 10 }}>
              Triggered from the "Open Popup ▾" button in the Button section above.
            </p>
          </section>

          <Divider />

          {/* ── Activity Log ───────────────────────────────────────────── */}
          <section className="section">
            <h2>Activity Log</h2>
            <div className="log-container">
              {log.length === 0
                ? <p className="log-empty">Interact with components above to see events…</p>
                : log.map((msg, i) => <div key={i} className="log-entry">{msg}</div>)
              }
            </div>
          </section>

        </div>
      </SlidingMenu.ContentShifter>

      {/* PopupPanel outside shifter so it stays fixed */}
      <PopupPanel
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        anchorRect={anchorRect}
        title="Quick Actions"
        actions={[
          { label: 'Cancel', onClick: () => { setPopupOpen(false); addLog('Popup: cancelled'); }, type: 'warning' },
          { label: 'Confirm', onClick: () => { setPopupOpen(false); addLog('Popup: confirmed!'); } },
        ]}
      >
        <p style={{ padding: '8px 0', color: '#555' }}>Choose an action to proceed.</p>
      </PopupPanel>
    </>
  );
}

// ── Root: wrap everything in ThemeWrapper ─────────────────────────────────────
function App() {
  return (
    <ThemeWrapper>
      <InnerApp />
    </ThemeWrapper>
  );
}

export default App;
