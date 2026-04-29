/* Tweaks Panel — floating settings panel for prototyping */
(function () {
  const { useState, useEffect } = React;

  /* module-level store so TweakToggle can read/write without prop drilling */
  let _state = {};
  let _listeners = [];

  function notify(key, val) {
    _state = { ..._state, [key]: val };
    _listeners.forEach(fn => fn(key, val));
  }

  function useTweaks(initial) {
    /* initialise module store once */
    if (Object.keys(_state).length === 0) _state = { ...initial };

    const [tweaks, setTweaks] = useState({ ..._state });

    useEffect(() => {
      const handler = (key, val) => setTweaks(p => ({ ...p, [key]: val }));
      _listeners.push(handler);
      return () => { _listeners = _listeners.filter(l => l !== handler); };
    }, []);

    const setTweak = (key, val) => {
      const next = typeof val === 'function' ? val(_state[key]) : val;
      notify(key, next);
    };

    return [tweaks, setTweak];
  }

  function TweakToggle({ id, label }) {
    const [val, setVal] = useState(_state[id] ?? false);

    useEffect(() => {
      const handler = (key, newVal) => { if (key === id) setVal(newVal); };
      _listeners.push(handler);
      return () => { _listeners = _listeners.filter(l => l !== handler); };
    }, [id]);

    return (
      <label className="tweak-toggle">
        <input
          type="checkbox"
          checked={val}
          onChange={e => notify(id, e.target.checked)}
        />
        {label}
      </label>
    );
  }

  function TweakSection({ label, children }) {
    return (
      <div style={{ marginBottom: 14 }}>
        <div className="tweaks-section-label">{label}</div>
        {children}
      </div>
    );
  }

  function TweaksPanel({ children }) {
    const [open, setOpen] = useState(false);
    return (
      <>
        {open && (
          <div className="tweaks-panel">
            {children}
          </div>
        )}
        <button className="tweaks-trigger no-print" onClick={() => setOpen(o => !o)}>
          ⚙ {open ? 'Zavřít' : 'Nastavení'}
        </button>
      </>
    );
  }

  window.useTweaks = useTweaks;
  window.TweaksPanel = TweaksPanel;
  window.TweakSection = TweakSection;
  window.TweakToggle = TweakToggle;
})();
