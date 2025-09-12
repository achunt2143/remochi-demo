import React, { useRef, useState } from 'react';
import './App.css';
import { MochiButton, MochiInput, MochiPopupPanel, MochiProgressBar, MochiRadio, MochiSlider, MochiToggle, Spinner } from 'remochi';

function App() {
  // State for radio selection
  const [selected, setSelected] = useState("alpha");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState(null);
  const [slider, setSlider] = useState(50);
  const buttonRef = useRef(null);

  // State for toggle
  const [isOn, setIsOn] = useState(false);

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
    alert("Selection cancelled");
  };

  const handleSet = () => {
    setDialogOpen(false);
    alert("Set action performed");
  };

  return (
    <div className="App">
      <h1 className="app-title">Remochi Demo</h1>

      <section className="section button-group">
        <h2>Buttons</h2>
        <div className="buttons-row">
          <MochiButton type="normal">Button</MochiButton>
          <MochiButton type="dropdown" ref={buttonRef} onClick={openPopup}>
            Dropdown Button
          </MochiButton>
          <MochiButton type="warning" onClick={openPopup}>
            Warning Button
          </MochiButton>
          <MochiButton type="disabled">Button Disabled</MochiButton>
        </div>
      </section>

      <section className="section radio-group">
        <h2>Radios</h2>
        <MochiRadio
          name="choice"
          value="alpha"
          checked={selected === "alpha"}
          onChange={() => setSelected("alpha")}
        >
          Alpha
        </MochiRadio>
        <MochiRadio
          name="choice"
          value="beta"
          checked={selected === "beta"}
          onChange={() => setSelected("beta")}
        >
          Beta
        </MochiRadio>
      </section>

      <section className="section toggle-group">
        <h2>Toggle</h2>
        <MochiToggle checked={isOn} onChange={() => setIsOn((on) => !on)} />
      </section>

      <section className="section input-group">
        <h2>Inputs</h2>
        <MochiInput />
        <MochiInput placeholder="Enter text here" />
        <MochiInput placeholder="Search term" type="search" />
        <MochiInput placeholder="Enter password" type="password" />
        <MochiInput placeholder="Disabled input" disabled />
      </section>

      <section className="section progress-slider-group">
        <h2>Progress Bars</h2>
        <MochiProgressBar value={slider} />
        <MochiProgressBar value={25} color="yellow" height="16px" />
        <MochiProgressBar value={80} color="red" width="300px" />

        <h2>Sliders</h2>
        <MochiSlider value={50} onChange={(v) => setSlider(v)} />
        <MochiSlider value={38} color="#ffb80d" width="280px" />
        <MochiSlider value={80} color="#d32f2f" />
      </section>

      <section className="section spinner-group">
        <h2>Spinners</h2>
        <div className="spinners-row">
          <Spinner active={true} styleType="light" size="normal" />
          <Spinner active={true} styleType="light" size="large" />
          <Spinner active={false} />
        </div>
      </section>

      <MochiPopupPanel
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
      </MochiPopupPanel>
    </div>
  );
}

export default App;
