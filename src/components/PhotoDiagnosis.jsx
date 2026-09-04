import { useState } from 'react'
import {
  Camera, ImageUp, X, ArrowRight, ArrowLeft, Check, Lock, Loader, Phone,
} from 'lucide-react'
import { usePhotoDiagnosis } from '../lib/usePhotoDiagnosis.js'
import { useCursorGlow } from '../lib/motion.js'
import { PHONE_DISPLAY, TEL } from '../lib/site.js'
import './photo.css'

/* ── The signature element ──────────────────────────────────────────────────
   Glass Panel Widget with Depth (visual-styles/interactive.md) over the navy
   field, laid out as a two-step form. The split is what keeps the panel inside
   the fold on a 390x844 screen while still collecting photo, description, name
   and phone — and the progress rail is what makes it read as an instrument
   rather than a contact form.
   Logic is the shared hook; every visual decision below is this site's.
   ───────────────────────────────────────────────────────────────────────── */

export default function PhotoDiagnosis() {
  const pd = usePhotoDiagnosis()
  const glowRef = useCursorGlow()
  const [step, setStep] = useState(1)
  const [stepErr, setStepErr] = useState('')

  const onContinue = () => {
    if (!pd.fields.description.trim()) {
      setStepErr('Tell us what you are seeing — a sentence is plenty.')
      return
    }
    setStepErr('')
    setStep(2)
  }

  const restart = () => { pd.reset(); setStep(1); setStepErr('') }
  const done = pd.status === 'done'

  return (
    <div className="pdx" ref={glowRef} data-glow-surface>
      <span className="pdx-tick pdx-tick--tl" aria-hidden="true" />
      <span className="pdx-tick pdx-tick--tr" aria-hidden="true" />
      <span className="pdx-tick pdx-tick--bl" aria-hidden="true" />
      <span className="pdx-tick pdx-tick--br" aria-hidden="true" />

      <div className="pdx-head">
        <div className="pdx-head-text">
          <p className="pdx-kicker">Photo Diagnosis</p>
          <h2 className="pdx-title">Show Us The Problem</h2>
        </div>
        <span className="pdx-count">{done ? 'Sent' : `${step} / 2`}</span>
      </div>

      <div className="steprail" aria-hidden="true">
        <span className="steprail-seg" data-done={step >= 1 ? 'true' : 'false'} />
        <span className="steprail-seg" data-done={step >= 2 || done ? 'true' : 'false'} />
      </div>

      {done ? (
        <div className="pdx-body pdx-done" data-step-panel role="status">
          <span className="pdx-check" aria-hidden="true">
            <Check className="lucide checkdraw" />
          </span>
          <h3 className="pdx-done-title">Photo Received</h3>
          <p className="pdx-done-copy">
            Thanks, {pd.fields.name.trim().split(' ')[0] || 'we have it'}. An electrician will look at
            what you sent and call you back on {pd.fields.phone} to talk through the load, the
            fixture and what the fix actually involves.
          </p>
          <div className="pdx-done-actions">
            <a className="btn btn--primary btn--sm" href={TEL}>
              <Phone className="lucide" aria-hidden="true" />
              Call {PHONE_DISPLAY}
            </a>
            <button type="button" className="pdx-restart tlink" onClick={restart}>
              Send another photo
            </button>
          </div>
          <p className="pdx-demo-note">
            Demonstration only — this form is not connected to a mailbox yet.
          </p>
        </div>
      ) : (
        <form className="pdx-body" onSubmit={pd.submit} noValidate>
          {step === 1 ? (
            <div className="pdx-panel" data-step-panel key="step-1">
              <div
                className="pdx-drop"
                data-dragging={pd.dragging ? 'true' : 'false'}
                data-has={pd.preview ? 'true' : 'false'}
                {...pd.dropProps}
              >
                {pd.preview ? (
                  <>
                    <img className="pdx-preview" src={pd.preview} alt="The photo you selected" />
                    <div className="pdx-preview-meta">
                      <span className="pdx-preview-name">{pd.file?.name}</span>
                      <button type="button" className="pdx-clear" onClick={pd.clearPhoto}>
                        <X className="lucide" aria-hidden="true" />
                        <span className="sr-only">Remove the photo</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <button type="button" className="pdx-drop-btn" onClick={pd.openPicker}>
                    <span className="pdx-drop-icon" aria-hidden="true"><ImageUp className="lucide" /></span>
                    <span className="pdx-drop-text">
                      <span className="pdx-drop-lead">Add a photo of the panel, fixture or outlet</span>
                      <span className="pdx-drop-sub">
                        <Camera className="lucide" aria-hidden="true" />
                        Drag one in, or take one on your phone — optional
                      </span>
                    </span>
                  </button>
                )}
                <input
                  ref={pd.inputRef}
                  className="sr-only"
                  type="file"
                  accept={pd.accepted}
                  onChange={pd.onFileInput}
                  aria-label="Upload a photo of the electrical problem"
                />
              </div>
              {pd.errors.file && <p className="pdx-err">{pd.errors.file}</p>}

              <div className="pdx-field">
                <label className="pdx-label" htmlFor="pdx-desc">What is it doing?</label>
                <textarea
                  id="pdx-desc"
                  className="pdx-input pdx-textarea"
                  rows={2}
                  placeholder="Kitchen pot lights flicker when the furnace starts."
                  value={pd.fields.description}
                  onChange={pd.setField('description')}
                />
                {stepErr && <p className="pdx-err">{stepErr}</p>}
              </div>

              <button type="button" className="btn btn--block pdx-next" onClick={onContinue}>
                Continue
                <ArrowRight className="lucide" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <div className="pdx-panel" data-step-panel key="step-2">
              <div className="pdx-recap">
                <span className="pdx-recap-thumb" aria-hidden="true">
                  {pd.preview
                    ? <img src={pd.preview} alt="" />
                    : <Camera className="lucide" />}
                </span>
                <p className="pdx-recap-copy">{pd.fields.description}</p>
              </div>

              <div className="pdx-pair">
                <div className="pdx-field">
                  <label className="pdx-label" htmlFor="pdx-name">Name</label>
                  <input
                    id="pdx-name"
                    className="pdx-input"
                    type="text"
                    autoComplete="name"
                    placeholder="Jordan Ellis"
                    value={pd.fields.name}
                    onChange={pd.setField('name')}
                  />
                  {pd.errors.name && <p className="pdx-err">{pd.errors.name}</p>}
                </div>
                <div className="pdx-field">
                  <label className="pdx-label" htmlFor="pdx-phone">Phone</label>
                  <input
                    id="pdx-phone"
                    className="pdx-input"
                    type="tel"
                    autoComplete="tel"
                    placeholder="403-555-0148"
                    value={pd.fields.phone}
                    onChange={pd.setField('phone')}
                  />
                  {pd.errors.phone && <p className="pdx-err">{pd.errors.phone}</p>}
                </div>
              </div>

              <div className="pdx-actions">
                <button type="button" className="pdx-back tlink" onClick={() => setStep(1)}>
                  <ArrowLeft className="lucide" aria-hidden="true" />
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn--primary pdx-submit"
                  disabled={pd.status === 'sending'}
                >
                  {pd.status === 'sending'
                    ? <><Loader className="lucide pdx-spin" aria-hidden="true" />Sending</>
                    : <>Send To An Electrician<ArrowRight className="lucide" aria-hidden="true" /></>}
                </button>
              </div>
            </div>
          )}

          <p className="reassure pdx-reassure">
            <Lock className="lucide" aria-hidden="true" />
            <span>
              No cost and no obligation. Your photo and number stay with our office — we don't
              pass them on, and nobody gets added to a list.
            </span>
          </p>
        </form>
      )}
    </div>
  )
}
