import React, { useRef, useState } from 'react';
import './App.css';
import 'remochi/styles';
import {
  Button,
  Input,
  PopupPanel,
  ProgressBar,
  Radio,
  Slider,
  Toggle,
  Spinner,
  StackedPanel,
  StackedPanels,
  Dialog,
  DateInput,
  NumberInput,
  Dropdown,
  Table,
  Pagination,
  Item,
  Video,
  Wizard,
  ThemeWrapper,
  Divider,
} from 'remochi';
import SlidingMenu from './Menu/SlidingMenu';
import SlidingMenuItem from './Menu/SlidingMenuItem';
import SlidingMenuItemGroup from './Menu/SlidingMenuItemGroup';

function AppContent() {
  // Existing state
  const [selected, setSelected] = useState("alpha");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState(null);
  const [slider, setSlider] = useState(50);
  const buttonRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(6); // Start with new components panel
  const [arrangement, setArrangement] = useState('mostly');
  const panelsRef = useRef(null);
  const [log, setLog] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // New component state
  const [wizardOpen, setWizardOpen] = useState(false);
  const [tablePage, setTablePage] = useState(1);
  const [dateValue, setDateValue] = useState(null);
  const [numberValue, setNumberValue] = useState(42);
  const [dropdownValue, setDropdownValue] = useState('option2');

  const openPopup = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setAnchorRect({
        top: rect.top,
        left: rect.left,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
      });
      setDialogOpen(true);
    }
  };

  const handleCancel = () => {
    setDialogOpen(false);
    addLog("Popup cancelled");
  };

  const handleSet = () => {
    setDialogOpen(false);
    addLog("Alarm set!");
  };

  const addLog = (message) => {
    setLog((prev) => [message, ...prev.slice(0, 4)]);
  };

  // Sample data for new components
  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', sales: 2500 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Pending', sales: 1800 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active', sales: 3200 },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Inactive', sales: 1200 },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', status: 'Active', sales: 2900 },
  ];

  const tableColumns = [
    { key: 'name', label: 'Name', width: '30%' },
    { key: 'email', label: 'Email', width: '35%' },
    { key: 'status', label: 'Status', width: '20%' },
    {
      key: 'sales',
      label: 'Sales ($)',
      width: '15%',
      render: (value) => `$${value.toLocaleString()}`
    },
  ];

  const dropdownOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
  ];

  const wizardSteps = [
    {
      label: 'Personal Info',
      title: 'Welcome to the Wizard!',
      description: 'Let\'s start by collecting some basic information.',
      content: (
        <div>
          <Input placeholder="Full Name" />
          <Input placeholder="Email Address" type="email" />
        </div>
      ),
      onNext: () => true
    },
    {
      label: 'Preferences',
      title: 'Your Preferences',
      content: (
        <div>
          <Toggle checked={isOn} onChange={() => setIsOn(!isOn)} />
          <Slider value={slider} onChange={setSlider} />
        </div>
      )
    },
    {
      label: 'Confirmation',
      title: 'Review & Complete',
      content: (
        <div>
          <h3>Summary</h3>
          <p>Ready to complete the setup? All data will be saved.</p>
        </div>
      ),
      skippable: false
    }
  ];

  return (
    <>
      <SlidingMenu
        position="top"
        isOpen={menuOpen}
        onOpenChange={setMenuOpen}
        style={{ '--menu-width': '280px' }}
      >
        <SlidingMenuItemGroup label="Navigation">
          <SlidingMenuItem
            icon="🏠"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </SlidingMenuItem>
          <SlidingMenuItem
            icon="📊"
            onClick={() => setMenuOpen(false)}
          >
            Analytics
          </SlidingMenuItem>
        </SlidingMenuItemGroup>

        <SlidingMenuItemGroup label="Account" divider>
          <SlidingMenuItem
            icon="👤"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </SlidingMenuItem>
          <SlidingMenuItem
            icon="🚪"
            variant="danger"
            onClick={() => setMenuOpen(false)}
          >
            Logout
          </SlidingMenuItem>
        </SlidingMenuItemGroup>
      </SlidingMenu>

      <SlidingMenu.ContentShifter
        position="top"
        isMenuOpen={menuOpen}
        menuWidth="280px"
      >
        <div className="App" style={{ flex: 1 }}>
          <header className="app-header">
            <Button
              type="normal"
              onClick={() => setMenuOpen(!menuOpen)}
              className="menu-toggle"
            >
              ☰ Menu
            </Button>
            <h1 className="app-title">Remochi Demo - Complete Components</h1>
            <Button type="normal" onClick={() => setWizardOpen(true)}>
              Open Wizard
            </Button>
          </header>
          <Divider />
          <div style={{margin: '16px'}} />
          <div className="demo-grid">
            <div className="main-content">
              <StackedPanels
                ref={panelsRef}
                index={activeIndex}
                onIndexChange={(idx) => {
                  setActiveIndex(idx);
                  addLog(`Changed to panel ${idx}`);
                }}
                animate={true}
                draggable={true}
                narrowFit={true}
                narrowFitWidth={800}
                showControls={true}
                wrap={false}
                arrangement={arrangement}
                onTransitionStart={({ from, to, isNarrow }) => {
                  addLog(`Transitioning: ${from} → ${to} (narrow: ${isNarrow})`);
                }}
                onTransitionFinish={({ from, to }) => {
                  addLog(`Finished: ${from} → ${to}`);
                }}
              >
                {/* Original Panels */}
                <StackedPanel>
                  <section className="section button-group">
                    <h2>Buttons</h2>
                    <div className="buttons-row">
                      <Button type="normal">Button</Button>
                      <Button type="dropdown" ref={buttonRef} onClick={openPopup}>
                        Dropdown Button
                      </Button>
                      <Button type="warning" onClick={openPopup}>
                        Warning Button
                      </Button>
                      <Button type="disabled">Button Disabled</Button>
                    </div>
                  </section>
                </StackedPanel>

                <StackedPanel>
                  <section className="section radio-group">
                    <h2>Radios</h2>
                    <Radio
                      name="choice"
                      value="alpha"
                      checked={selected === "alpha"}
                      onChange={() => setSelected("alpha")}
                    >
                      Alpha
                    </Radio>
                    <Radio
                      name="choice"
                      value="beta"
                      checked={selected === "beta"}
                      onChange={() => setSelected("beta")}
                    >
                      Beta
                    </Radio>
                  </section>
                </StackedPanel>

                {/* New Components Panel */}
                <StackedPanel>
                  <section className="section new-components">
                    <h2>New Components Demo</h2>

                    <div className="demo-row">
                      <div className="demo-card">
                        <h3>Date & Number Inputs</h3>
                        <DateInput
                          label="Select Date"
                          value={dateValue}
                          onChange={setDateValue}
                        />
                        <NumberInput
                          label="Quantity"
                          value={numberValue}
                          min={0}
                          max={100}
                          step={1}
                          onChange={setNumberValue}
                        />
                      </div>

                      <div className="demo-card">
                        <h3>Dropdown</h3>
                        <Dropdown
                          options={dropdownOptions}
                          value={dropdownValue}
                          onChange={setDropdownValue}
                          placeholder="Select an option"
                          searchable
                        />
                      </div>
                    </div>

                    <div className="demo-row">
                      <div className="demo-card full-width">
                        <h3>Interactive Table</h3>
                        <Table
                          columns={tableColumns}
                          data={tableData}
                          sortable
                          hoverable
                          striped
                        />
                        <Pagination
                          currentPage={tablePage}
                          totalPages={3}
                          onPageChange={setTablePage}
                          showFirstLast
                        />
                      </div>
                    </div>
                  </section>
                </StackedPanel>

                {/* Video & Items Panel */}
                <StackedPanel>
                  <section className="section video-items">
                    <div className="demo-row">
                      <div className="demo-card">
                        <h3>Video Player</h3>
                        <Video
                          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                          poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400"
                          controls
                        />
                      </div>

                      <div className="demo-card">
                        <h3>List Items</h3>
                        <Item icon="👤" title="John Doe" subtitle="john@example.com">
                          Software Engineer
                        </Item>
                        <Item
                          icon="📊"
                          title="Jane Smith"
                          subtitle="jane@example.com"
                          rightContent="$2,500"
                          selected
                        >
                          Marketing Manager
                        </Item>
                        <Item
                          icon="🎨"
                          title="Bob Johnson"
                          subtitle="bob@example.com"
                          variant="compact"
                        >
                          Designer
                        </Item>
                      </div>
                    </div>
                  </section>
                </StackedPanel>

                {/* Existing panels continue... */}
                <StackedPanel>
                  <section className="section toggle-group">
                    <h2>Toggle</h2>
                    <Toggle checked={isOn} onChange={() => setIsOn((on) => !on)} />
                  </section>
                </StackedPanel>

                <StackedPanel>
                  <section className="section input-group">
                    <h2>Inputs</h2>
                    <Input />
                    <Input placeholder="Enter text here" />
                    <Input placeholder="Search term" type="search" />
                    <Input placeholder="Enter password" type="password" />
                    <Input placeholder="Disabled input" disabled />
                  </section>
                </StackedPanel>

                <StackedPanel>
                  <section className="section progress-slider-group">
                    <h2>Progress Bars</h2>
                    <ProgressBar value={slider} />
                    <ProgressBar value={25} color="yellow" height="16px" />
                    <ProgressBar value={80} color="red" width="300px" />

                    <h2>Sliders</h2>
                    <Slider value={50} onChange={(v) => setSlider(v)} />
                    <Slider value={38} color="#ffb80d" width="280px" />
                    <Slider value={80} color="#d32f2f" />
                  </section>
                </StackedPanel>

                <StackedPanel>
                  <section className="section spinner-group">
                    <h2>Spinners</h2>
                    <div className="spinners-row">
                      <Spinner active={true} styleType="light" size="normal" />
                      <Spinner active={true} styleType="light" size="large" />
                      <Spinner active={false} />
                    </div>
                  </section>
                </StackedPanel>
              </StackedPanels>
            </div>

            {/* Enhanced Control Panel */}
            <aside className="control-panel">
              <h3>Controls</h3>

              <div className="control-section">
                <label className="control-label">Current Panel: {activeIndex + 1}</label>
                <div className="panel-buttons">
                  {[0,1,2,3,4,5,6].map((idx) => (
                    <Button
                      key={idx}
                      type={idx === activeIndex ? "normal" : "secondary"}
                      size="small"
                      onClick={() => {
                        panelsRef.current.setIndex(idx);
                        setActiveIndex(idx);
                      }}
                    >
                      {idx + 1}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="control-section">
                <Button
                  type="secondary"
                  fullWidth
                  onClick={() => panelsRef.current?.prev()}
                >
                  ← Previous
                </Button>
                <Button
                  type="normal"
                  fullWidth
                  onClick={() => panelsRef.current?.next()}
                >
                  Next →
                </Button>
              </div>

              <div className="control-section">
                <Button
                  type="warning"
                  fullWidth
                  onClick={() => panelsRef.current?.toggleArrangement()}
                >
                  Toggle Arrangement
                </Button>
              </div>

              <div className="control-section">
                <h4>Activity Log</h4>
                <div className="log-container">
                  {log.length === 0 ? (
                    <p className="log-empty">Waiting for events...</p>
                  ) : (
                    log.map((msg, idx) => (
                      <div key={idx} className="log-entry">{msg}</div>
                    ))
                  )}
                </div>
              </div>
            </aside>
          </div>

          {/* Popup Panel */}
          <PopupPanel
            isOpen={dialogOpen}
            onClose={() => setDialogOpen(false)}
            anchorRect={anchorRect}
            title="Alarm Picker"
            actions={[
              { label: "Cancel", onClick: handleCancel, type: "warning" },
              { label: "Set Alarm", onClick: handleSet },
            ]}
          >
            <div className="popup-time">
              11:00 am <span>▼</span>
            </div>
          </PopupPanel>

          {/* New Components Dialogs */}
          <Dialog
            isOpen={wizardOpen}
            onClose={() => setWizardOpen(false)}
            title="Setup Wizard"
            size="large"
          >
            <Wizard
              steps={wizardSteps}
              onComplete={() => {
                setWizardOpen(false);
                addLog("Wizard completed!");
              }}
              onCancel={() => setWizardOpen(false)}
            />
          </Dialog>
        </div>
      </SlidingMenu.ContentShifter>
    </>
  );
}

function App() {
  return (
    <ThemeWrapper defaultTheme="light" fontFamily="Prelude">
      <AppContent />
    </ThemeWrapper>
  );
}

export default App;
