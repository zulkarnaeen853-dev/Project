import { useState } from 'react'
import {
  ArrowUpRight,
  Check,
  Eye,
  EyeOff,
  KeyRound,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import './App.css'

const initialForm = {
  name: '',
  email: '',
  password: '',
  profilePic: '',
  address: '',
  phone: '',
  gender: '',
  dob: '',
}
const REGISTER_URL = 'http://localhost:3000/api/v1/auth/register'

function App() {
  const [form, setForm] = useState(initialForm)
  const [showPassword, setShowPassword] = useState(false)
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState(null)

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
    setNotice(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setBusy(true)
    setNotice(null)

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      profilePic: form.profilePic.trim(),
      address: form.address.trim(),
      phone: form.phone.trim(),
      gender: form.gender.trim(),
      dob: form.dob,
    }

    try {
      const response = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json()

      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'The request could not be completed.')
      }

      setForm(initialForm)
      setNotice({ type: 'success', text: result.message || 'Record saved.' })
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
          <div className="form-heading">
            <div className="form-icon">
              <UserRound size={19} />
            </div>
            <div>
              <p className="eyebrow">NEW ENTRY</p>
              <h2>Add a person</h2>
            </div>
          </div>

          <form className="entry-form" onSubmit={handleSubmit}>
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

            <label className="field-label" htmlFor="password">Password</label>
            <div className="password-field">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Create a password"
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

            <label className="field-label" htmlFor="profilePic">Profile picture URL</label>
            <input
              id="profilePic"
              name="profilePic"
              type="url"
              placeholder="https://example.com/photo.jpg"
              value={form.profilePic}
              onChange={updateField}
            />

            <label className="field-label" htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              autoComplete="street-address"
              placeholder="Street, city, and region"
              value={form.address}
              onChange={updateField}
            />

            <label className="field-label" htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="e.g. +1 555 123 4567"
              value={form.phone}
              onChange={updateField}
            />

            <label className="field-label" htmlFor="gender">Gender</label>
            <input
              id="gender"
              name="gender"
              type="text"
              placeholder="Gender"
              value={form.gender}
              onChange={updateField}
            />

            <label className="field-label" htmlFor="dob">Date of birth</label>
            <input
              id="dob"
              name="dob"
              type="date"
              autoComplete="bday"
              value={form.dob}
              onChange={updateField}
            />

            {notice && (
              <p className={`notice ${notice.type}`} role="status">
                {notice.type === 'success' && <Check size={15} />}
                {notice.text}
              </p>
            )}

            <button className="submit-button" type="submit" disabled={busy}>
              <span>{busy ? 'Working…' : 'Save entry'}</span>
              <ArrowUpRight size={17} />
            </button>
          </form>

          <div className="panel-footnote">
            <span className="footnote-rule" />
            <p>ONE ENTRY AT A TIME</p>
          </div>
        </aside>
      </section>

      <footer className="page-footer">
        <span>KEYHOUSE PRIVATE DIRECTORY</span>
        <span>BUILT FOR THE PEOPLE YOU KNOW</span>
      </footer>
    </main>
  )
}

export default App
