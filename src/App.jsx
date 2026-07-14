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
  RepanelStack,
  Repanel,
  FloatingPanel,
  // Table
  Table,
  // ThemeWrapper
  ThemeWrapper,
  useTheme,
  // Wizard
  Wizard,
} from 'remochi';
import 'remochi/css';

import SlidingMenu from './Menu/SlidingMenu';
import SlidingMenuItem from './Menu/SlidingMenuItem';
import SlidingMenuItemGroup from './Menu/SlidingMenuItemGroup';

// ── Inner app wrapped by ThemeWrapper ─────────────────────────────────────────
function InnerApp() {
  const { theme, toggleTheme } = useTheme();

  // Shared state
  const [log, setLog] = useState([]);
  const addLog = (msg) => setLog((prev) => [msg, ...prev.slice(0, 9)]);

  // Button / Popup
  const dropdownBtnRef = useRef(null);
  const repanelRef = useRef(null);
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
  const wizardSteps = [
    { label: 'Account' },
    { label: 'Profile' },
    { label: 'Review' },
  ];

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
              <span style={{ fontSize: 13, color: 'var(--mochi-text-muted)' }}>Theme:</span>
              <Button onClick={() => { toggleTheme(); addLog(`Theme: ${theme === 'light' ? 'dark' : 'light'}`); }}>
                {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
              </Button>
            </div>
          </header>

          {/* ── Headers ────────────────────────────────────────────────── */}
          <section className="section">
            <h1>Header Component — H1</h1>
            <h2>Subheader Component — H2</h2>
            <h3>Subheader Component — H3</h3>
            <h4>Subheader Component — H4</h4>
          </section>



          {/* ── Button family ──────────────────────────────────────────── */}
          <section className="section">
            <h2>Button / Radio / ViewSelectButton</h2>
            <div className="buttons-row">
              <Button onClick={() => addLog('Button: normal')}>Normal</Button>
              <Button type="warning" onClick={() => addLog('Button: warning')}>Warning</Button>
              <Button type="disabled">Disabled</Button>
              <Button ref={dropdownBtnRef} type="dropdown" onClick={openPopup}>Open Popup</Button>
            </div>
            <div className="buttons-row" style={{ marginTop: 12 }}>
              <ViewSelectButton
                items={[
                  { content: '⊞ Grid', value: 'grid', active: viewMode === 'grid' },
                  { content: '☰ List', value: 'list', active: viewMode === 'list' },
                ]}
                onSelect={(item) => { setViewMode(item.value); addLog(`View: ${item.value}`); }}
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

          <section>
            <h2>Dividers</h2>
            {/* ── NubbinDivider — corner variant ──────────────────────────── */}
            {/* A corner nubbin (borrowed from Popup) marks the END of the
              line rather than a bump in the middle of it, so it renders
              with just one cap instead of two. */}
            <div style={{ margin: '20px 0' }}>
              <p style={{ fontSize: 12, color: 'var(--mochi-text-muted)', marginBottom: 6 }}>
                Divider (Gradient from start to center, then center to end)
              </p>
              <Divider />
            </div>
            {/* ── NubbinDivider — corner variant ──────────────────────────── */}
            {/* A corner nubbin (borrowed from Popup) marks the END of the
              line rather than a bump in the middle of it, so it renders
              with just one cap instead of two. */}
            <div style={{ margin: '20px 0' }}>
              <p style={{ fontSize: 12, color: 'var(--mochi-text-muted)', marginBottom: 6 }}>
                NubbinDivider — middle up variant (single bump; the nubbin sits flush
                in the middle of the line)
              </p>
              <NubbinDivider />
            </div>

            {/* ── NubbinDivider — corner variant ──────────────────────────── */}
            {/* A corner nubbin (borrowed from Popup) marks the END of the
              line rather than a bump in the middle of it, so it renders
              with just one cap instead of two. */}
            <div style={{ margin: '20px 0' }}>
              <p style={{ fontSize: 12, color: 'var(--mochi-text-muted)', marginBottom: 6 }}>
                NubbinDivider — corner variant (single cap; the nubbin sits flush
                at the end of the line instead of a bump in the middle)
              </p>
              <NubbinDivider nubbin="top-left-up" />
            </div>

          </section>

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
                <label style={{ fontSize: 13, color: 'var(--mochi-text-muted)', display: 'block', marginBottom: 4 }}>NumberInput</label>
                <NumberInput value={numVal} onChange={(v) => { setNumVal(v); addLog(`Number: ${v}`); }} />
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--mochi-text-muted)', display: 'block', marginBottom: 4 }}>DateInput</label>
                <DateInput value={dateVal} onChange={(v) => { setDateVal(v); addLog(`Date: ${v}`); }} />
              </div>
            </div>
          </section>

          <Divider />

          {/* ── ProgressBar & Slider ────────────────────────────────────── */}
          <section className="section progress-slider-group">
            <h2>ProgressBar (live) &amp; Slider</h2>
            <p style={{ color: 'var(--mochi-text-muted)', fontSize: 13, marginBottom: 8 }}>Value: <strong>{sliderVal}%</strong></p>
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
                  <p style={{ fontSize: 12, color: 'var(--mochi-text-muted)', marginBottom: 4 }}>{st}/{sz}</p>
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
              <p style={{ padding: '12px 0', color: 'var(--mochi-text-muted)' }}>
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

          {/* ── RepanelStack (stacked panels) ─────────────────────────── */}
          <section className="section">
            <h2>RepanelStack — stacked panels</h2>
            <p style={{ fontSize: 13, color: 'var(--mochi-text-muted)', marginBottom: 12 }}>
              A webOS/Mochi master-detail stack. The front (active) panel takes the
              remaining width; earlier panels stay revealed to its left as real,
              readable columns — <strong>every visible panel is independently
                scrollable and clickable</strong>, not just the front one. Every panel
              but the first has a <strong>nubbin grabber</strong> at its bottom-left
              edge. On a parent panel it's a plain reveal-adjust: drag it to grow or
              shrink how many columns are shown — it isn't capped at the default
              3-column window, drag far enough and it reveals the whole stack back
              to the first panel. The <strong>active panel's own grabber</strong>{' '}
              does the same reveal-adjust (both directions, as long as there's more
              to reveal) — that's what lets you get back to an earlier panel even
              after collapsing all the way down to just the front one. Once nothing
              is left to reveal, dragging it right instead becomes a{' '}
              <strong>swipe-to-close</strong>: drag past ~45%, flick it, or
              double-click it, and the front panel closes, handing the front to
              whatever was behind it — release short of that and it springs back
              open. Use the buttons below for the same moves without dragging.
            </p>

            <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
              <Button onClick={() => repanelRef.current?.prev()}>◀ Prev</Button>
              <Button onClick={() => repanelRef.current?.next()}>Next ▶</Button>
              <Button onClick={() => repanelRef.current?.expand()}>Expand</Button>
              <Button onClick={() => repanelRef.current?.collapse()}>Collapse</Button>
            </div>

            <div style={{ height: 380 }}>
              <RepanelStack
                ref={repanelRef}
                defaultActiveIndex={3}
                defaultReveal={3}
                onActiveIndexChange={(index, detail) =>
                  addLog(`RepanelStack: front → ${index} (${detail.reason})`)
                }
                onRevealChange={(reveal, detail) =>
                  addLog(`RepanelStack: reveal → ${reveal} (${detail.reason})`)
                }
              >
                {[
                  {
                    title: 'Library',
                    items: ['Recently Added', 'Artists', 'Albums', 'Genres'],
                  },
                  {
                    title: 'Albums',
                    items: ['Discovery', 'In Rainbows', 'Currents', 'Random Access Memories'],
                  },
                  {
                    title: 'Tracks',
                    items: ['One More Time', 'Aerodynamic', 'Digital Love', 'Harder Better Faster Stronger'],
                  },
                  {
                    title: 'Now Playing',
                    body: 'The front panel. Drag its grabber left (or right, if there’s still more to reveal) to adjust the stack behind it — once fully expanded, drag right to close it, or try a flick or double-click.',
                  },
                ].map((panel) => (
                  <Repanel key={panel.title}>
                    <div style={{ padding: '52px 20px 28px' }}>
                      <h3 style={{ margin: '0 0 10px' }}>{panel.title}</h3>
                      {panel.items ? (
                        <ul style={{ listStyle: 'none', margin: 0, padding: 0, fontSize: 13, color: 'var(--mochi-text)' }}>
                          {panel.items.map((item) => (
                            <li
                              key={item}
                              style={{ padding: '8px 4px', borderBottom: '1px solid var(--mochi-border)', cursor: 'pointer' }}
                              onClick={() => addLog(`RepanelStack: clicked "${item}" inside ${panel.title}`)}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p style={{ fontSize: 13, color: 'var(--mochi-text-muted)', margin: 0 }}>{panel.body}</p>
                      )}
                    </div>
                  </Repanel>
                ))}
              </RepanelStack>
            </div>
          </section>

          <Divider />

          {/* ── Repanel ────────────────────────────────────────────────── */}
          <section className="section">
            <h2>Repanel</h2>
            <p style={{ fontSize: 13, color: 'var(--mochi-text-muted)', marginBottom: 12 }}>
              Width-percentage panels — full height of their row container. Also the
              stackable card surface used inside <code>RepanelStack</code> above.
            </p>

            {/* default style row */}
            <p style={{ fontSize: 12, color: 'var(--mochi-text-muted)', marginBottom: 6 }}>style="default"</p>
            <div style={{ display: 'flex', height: 120, gap: 0, marginBottom: 16 }}>
              <Repanel width={25} style="default">
                <div style={{ padding: 12 }}>
                  <strong>25%</strong>
                  <p style={{ fontSize: 12, color: 'var(--mochi-text-muted)', marginTop: 4 }}>Sidebar</p>
                </div>
              </Repanel>
              <Repanel width={50} style="default">
                <div style={{ padding: 12 }}>
                  <strong>50%</strong>
                  <p style={{ fontSize: 12, color: 'var(--mochi-text-muted)', marginTop: 4 }}>Main</p>
                </div>
              </Repanel>
              <Repanel width={25} style="default">
                <div style={{ padding: 12 }}>
                  <strong>25%</strong>
                  <p style={{ fontSize: 12, color: 'var(--mochi-text-muted)', marginTop: 4 }}>Detail</p>
                </div>
              </Repanel>
            </div>

            {/* shadow style row */}
            <p style={{ fontSize: 12, color: 'var(--mochi-text-muted)', marginBottom: 6 }}>style="shadow"</p>
            <div style={{ display: 'flex', height: 120, gap: 0 }}>
              <Repanel width={33} style="shadow">
                <div style={{ padding: 12 }}>
                  <strong>33%</strong>
                  <p style={{ fontSize: 12, color: 'var(--mochi-text-muted)', marginTop: 4 }}>Shadow A</p>
                </div>
              </Repanel>
              <Repanel width={34} style="shadow">
                <div style={{ padding: 12 }}>
                  <strong>34%</strong>
                  <p style={{ fontSize: 12, color: 'var(--mochi-text-muted)', marginTop: 4 }}>Shadow B</p>
                </div>
              </Repanel>
              <Repanel width={33} style="shadow">
                <div style={{ padding: 12 }}>
                  <strong>33%</strong>
                  <p style={{ fontSize: 12, color: 'var(--mochi-text-muted)', marginTop: 4 }}>Shadow C</p>
                </div>
              </Repanel>
            </div>
          </section>

          <Divider />

          {/* ── FloatingPanel ──────────────────────────────────────────── */}
          <section className="section">
            <h2>FloatingPanel</h2>
            <p style={{ fontSize: 13, color: 'var(--mochi-text-muted)', marginBottom: 12 }}>
              Fills its container — 16px radius on all corners.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {/* default */}
              <div style={{ width: 220, height: 130 }}>
                <FloatingPanel style="default">
                  <div style={{ padding: 16 }}>
                    <strong>Default</strong>
                    <p style={{ fontSize: 12, color: 'var(--mochi-text-muted)', marginTop: 6 }}>
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
                    <p style={{ fontSize: 12, color: 'var(--mochi-text-muted)', marginTop: 6 }}>
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
              <div style={{ padding: '16px 0', color: 'var(--mochi-text-muted)' }}>
                Step {wizardStep + 1} of {wizardSteps.length}: <strong>{wizardSteps[wizardStep]}</strong>
              </div>
            </Wizard>
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
            <p style={{ color: 'var(--mochi-text-muted)', fontSize: 13, marginBottom: 10 }}>
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
            <p style={{ color: 'var(--mochi-text-muted)', fontSize: 13, marginBottom: 10 }}>
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
        <p style={{ padding: '8px 0', color: 'var(--mochi-text-muted)' }}>Choose an action to proceed.</p>
      </PopupPanel>
    </>
  );
}

// ── Root: wrap everything in ThemeWrapper ─────────────────────────────────────
function App() {
  return (
    <ThemeWrapper defaultTheme="light" fontFamily="Prelude">
      <InnerApp />
    </ThemeWrapper>
  );
}

export default App;
