import { useState } from 'react'
import {
  ArrowDownToLine,
  ArrowUpRight,
  Check,
  Eye,
  EyeOff,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  Plus,
  ShieldCheck,
  Trash2,
  UserRound,
} from 'lucide-react'
import './App.css'

const initialForm = { name: '', email: '', password: '' }
const API_BASE_URL = 'http://localhost:3000/api/v1'

function App() {
  const [mode, setMode] = useState('register')
  const [form, setForm] = useState(initialForm)
  const [showPassword, setShowPassword] = useState(false)
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState(null)
  const [records, setRecords] = useState([])
  const [unlocked, setUnlocked] = useState(false)

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
    setNotice(null)
  }

  const switchMode = (nextMode) => {
    setMode(nextMode)
    setNotice(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setBusy(true)
    setNotice(null)

    const payload = mode === 'register'
      ? { name: form.name.trim(), email: form.email.trim() }
      : { password: form.password }

    try {
      const response = await fetch(`${API_BASE_URL}/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json()

      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'The request could not be completed.')
      }

      if (mode === 'register') {
        setForm(initialForm)
        setNotice({ type: 'success', text: result.message || 'Record saved.' })
        setMode('unlock')
      } else {
        const nextRecords = Array.isArray(result.data)
          ? result.data
          : result.data ? [result.data] : []
        setRecords(nextRecords)
        setUnlocked(true)
        setForm((current) => ({ ...current, password: '' }))
        setNotice({ type: 'success', text: result.message || 'Index unlocked.' })
      }
    } catch (error) {
      setNotice({
        type: 'error',
        text: error instanceof TypeError
          ? 'Could not reach the server. Check that your backend is running on port 3000.'
          : error.message,
      })
    } finally {
      setBusy(false)
    }
  }

  const lockRecords = () => {
    setRecords([])
    setUnlocked(false)
    setNotice(null)
    setMode('unlock')
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Keyhouse home">
          <span className="brand-mark"><KeyRound size={18} strokeWidth={2.2} /></span>
          <span>KEYHOUSE<span className="wordmark-period">.</span></span>
        </a>
        <div className="topbar-meta">
          <span className="live-dot" />
          <span>PRIVATE INDEX</span>
          <span className="topbar-divider" />
          <span className="topbar-edition">NO. 001</span>
        </div>
      </header>

      <section className="page-heading" id="top">
        <div>
          <p className="eyebrow"><span>01</span> / THE DIRECTORY</p>
          <h1>People, kept <em>close.</em></h1>
        </div>
        <div className="heading-note">
          <ShieldCheck size={17} />
          <span>PERSONAL RECORDS<br />ACCESS CONTROLLED</span>
        </div>
      </section>

      <section className="workspace" aria-label="Private directory">
        <aside className="entry-panel">
          <div className="mode-switch" role="tablist" aria-label="Directory action">
            <button
              className={mode === 'register' ? 'mode-tab active' : 'mode-tab'}
              type="button"
              role="tab"
              aria-selected={mode === 'register'}
              onClick={() => switchMode('register')}
            >
              <Plus size={15} /> Add person
            </button>
            <button
              className={mode === 'unlock' ? 'mode-tab active' : 'mode-tab'}
              type="button"
              role="tab"
              aria-selected={mode === 'unlock'}
              onClick={() => switchMode('unlock')}
            >
              <LockKeyhole size={15} /> Unlock
            </button>
          </div>

          <div className="form-heading">
            <div className="form-icon">
              {mode === 'register' ? <UserRound size={19} /> : <Fingerprint size={19} />}
            </div>
            <div>
              <p className="eyebrow">{mode === 'register' ? 'NEW ENTRY' : 'ACCESS KEY'}</p>
              <h2>{mode === 'register' ? 'Add a person' : 'Open the index'}</h2>
            </div>
          </div>

          <form className="entry-form" onSubmit={handleSubmit}>
            {mode === 'register' ? (
              <>
                <label className="field-label" htmlFor="name">Full name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Alex Morgan"
                  value={form.name}
                  onChange={updateField}
                  required
                />

                <label className="field-label" htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="alex@example.com"
                  value={form.email}
                  onChange={updateField}
                  required
                />
              </>
            ) : (
              <>
                <label className="field-label" htmlFor="password">Master password</label>
                <div className="password-field">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter access key"
                    value={form.password}
                    onChange={updateField}
                    required
                  />
                  <button
                    className="visibility-button"
                    type="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword((visible) => !visible)}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                <p className="field-hint"><LockKeyhole size={13} /> The shared key opens every record.</p>
              </>
            )}

            {notice && (
              <p className={`notice ${notice.type}`} role="status">
                {notice.type === 'success' && <Check size={15} />}
                {notice.text}
              </p>
            )}

            <button className="submit-button" type="submit" disabled={busy}>
              <span>{busy ? 'Working…' : mode === 'register' ? 'Save entry' : 'Unlock records'}</span>
              {mode === 'register' ? <ArrowUpRight size={17} /> : <KeyRound size={17} />}
            </button>
          </form>

          <div className="panel-footnote">
            <span className="footnote-rule" />
            <p>{mode === 'register' ? 'ONE ENTRY AT A TIME' : 'KEYHOUSE MASTER ACCESS'}</p>
          </div>
        </aside>

        <section className="records-panel" aria-labelledby="records-title">
          <div className="records-header">
            <div>
              <p className="eyebrow">DATABASE / 01</p>
              <h2 id="records-title">Stored people</h2>
            </div>
            <div className="records-tools">
              <span className={unlocked ? 'status-pill open' : 'status-pill'}>
                <span className="status-dot" /> {unlocked ? 'UNLOCKED' : 'SEALED'}
              </span>
              {unlocked && (
                <button className="icon-button" type="button" onClick={lockRecords} aria-label="Lock records" title="Lock records">
                  <LockKeyhole size={17} />
                </button>
              )}
            </div>
          </div>

          <div className="table-labels" aria-hidden="true">
            <span>PERSON</span>
            <span>EMAIL ADDRESS</span>
            <span>REF.</span>
          </div>

          {unlocked && records.length > 0 ? (
            <div className="record-list">
              {records.map((record, index) => (
                <article className="record-row" key={record._id || record.email || index}>
                  <div className="record-person">
                    <span className="avatar">{record.name?.trim()?.charAt(0)?.toUpperCase() || '?'}</span>
                    <span>{record.name}</span>
                  </div>
                  <span className="record-email">{record.email}</span>
                  <span className="record-ref">{String(index + 1).padStart(3, '0')}</span>
                </article>
              ))}
            </div>
          ) : unlocked ? (
            <div className="empty-list">
              <Check size={20} />
              <p>The index is open, but there are no records yet.</p>
            </div>
          ) : (
            <div className="sealed-state">
              <div className="archive-image">
                <img
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=85"
                  alt="Rows of books in an archive library"
                />
                <div className="image-caption"><span>THE PRIVATE STACKS</span><span>FIG. 01</span></div>
              </div>
              <div className="sealed-message">
                <div className="sealed-lock"><LockKeyhole size={21} /></div>
                <div>
                  <p className="eyebrow">CONTENT WITHHELD</p>
                  <h3>Records are sealed.</h3>
                  <p className="sealed-copy">Unlock the index to view its people and contact details.</p>
                </div>
                <span className="sealed-count">•••</span>
              </div>
              <button className="text-action" type="button" onClick={() => switchMode('unlock')}>
                Enter master key <ArrowDownToLine size={15} />
              </button>
            </div>
          )}

          <footer className="records-footer">
            <span><span className="footer-dot" /> {unlocked ? `${records.length} RECORD${records.length === 1 ? '' : 'S'}` : 'ACCESS REQUIRED'}</span>
            <span>KEYHOUSE / 2026</span>
          </footer>
        </section>
      </section>

      <footer className="page-footer">
        <span>KEYHOUSE PRIVATE DIRECTORY</span>
        <span>BUILT FOR THE PEOPLE YOU KNOW</span>
      </footer>
    </main>
  )
}

export default App
