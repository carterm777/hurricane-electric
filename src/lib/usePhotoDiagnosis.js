/* ── Photo-diagnosis widget: logic only ─────────────────────────────────────
   The page's signature element. This hook owns file handling, drag state,
   validation and the client-side success state so every site gets the same
   correct plumbing — no backend, nothing posted anywhere. The markup, the
   composition and every visual decision belong to the individual site, and
   should look nothing like the next site's.
   ───────────────────────────────────────────────────────────────────────── */
import { useCallback, useEffect, useRef, useState } from 'react'

const MAX_BYTES = 10 * 1024 * 1024
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']

export function usePhotoDiagnosis({ requirePhoto = false } = {}) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [fields, setFields] = useState({ description: '', name: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')   // idle | sending | done
  const inputRef = useRef(null)
  const objectUrl = useRef(null)

  useEffect(() => () => { if (objectUrl.current) URL.revokeObjectURL(objectUrl.current) }, [])

  const accept = useCallback((f) => {
    if (!f) return
    if (!ACCEPTED.includes(f.type) && !/\.(jpe?g|png|webp|heic|heif)$/i.test(f.name)) {
      setErrors((e) => ({ ...e, file: 'That file type is not an image. Use a JPG, PNG or HEIC photo.' }))
      return
    }
    if (f.size > MAX_BYTES) {
      setErrors((e) => ({ ...e, file: 'That photo is over 10MB. Try a smaller one straight from your phone.' }))
      return
    }
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current)
    objectUrl.current = URL.createObjectURL(f)
    setFile(f)
    setPreview(objectUrl.current)
    setErrors((e) => { const { file: _drop, ...rest } = e; return rest })
  }, [])

  const onFileInput = useCallback((e) => accept(e.target.files?.[0]), [accept])
  const openPicker = useCallback(() => inputRef.current?.click(), [])

  const clearPhoto = useCallback(() => {
    if (objectUrl.current) { URL.revokeObjectURL(objectUrl.current); objectUrl.current = null }
    setFile(null); setPreview(null)
    if (inputRef.current) inputRef.current.value = ''
  }, [])

  const dropProps = {
    onDragOver: (e) => { e.preventDefault(); setDragging(true) },
    onDragEnter: (e) => { e.preventDefault(); setDragging(true) },
    onDragLeave: (e) => { e.preventDefault(); setDragging(false) },
    onDrop: (e) => { e.preventDefault(); setDragging(false); accept(e.dataTransfer.files?.[0]) },
  }

  const setField = useCallback((key) => (e) => {
    const value = e?.target ? e.target.value : e
    setFields((f) => ({ ...f, [key]: value }))
    setErrors((err) => { const { [key]: _drop, ...rest } = err; return rest })
  }, [])

  const validate = useCallback(() => {
    const next = {}
    if (!fields.description.trim()) next.description = 'Tell us what is going on, even a sentence helps.'
    if (!fields.name.trim()) next.name = 'We need a name to get back to you.'
    const digits = fields.phone.replace(/\D/g, '')
    if (digits.length < 10) next.phone = 'Enter a 10-digit phone number.'
    if (requirePhoto && !file) next.file = 'Add a photo so we can see what you are looking at.'
    setErrors(next)
    return Object.keys(next).length === 0
  }, [fields, file, requirePhoto])

  /* No backend. The delay exists so the success state reads as a real
     submission rather than an instant, obviously-fake flip. */
  const submit = useCallback((e) => {
    e?.preventDefault?.()
    if (!validate()) return
    setStatus('sending')
    setTimeout(() => setStatus('done'), 900)
  }, [validate])

  const reset = useCallback(() => {
    clearPhoto()
    setFields({ description: '', name: '', phone: '' })
    setErrors({})
    setStatus('idle')
  }, [clearPhoto])

  return {
    file, preview, dragging, fields, errors, status,
    inputRef, openPicker, onFileInput, clearPhoto, dropProps,
    setField, submit, reset,
    accepted: ACCEPTED.join(','),
  }
}

/* Generic non-backend form (contact / quote / final CTA), same success-state
   discipline as above. */
export function useDemoForm(initial = {}, { required = [] } = {}) {
  const [fields, setFields] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const setField = useCallback((key) => (e) => {
    const value = e?.target ? e.target.value : e
    setFields((f) => ({ ...f, [key]: value }))
    setErrors((err) => { const { [key]: _drop, ...rest } = err; return rest })
  }, [])

  const submit = useCallback((e) => {
    e?.preventDefault?.()
    const next = {}
    for (const key of required) {
      if (!String(fields[key] ?? '').trim()) next[key] = 'This one is required.'
    }
    if (Object.prototype.hasOwnProperty.call(fields, 'phone')) {
      const digits = String(fields.phone ?? '').replace(/\D/g, '')
      if (required.includes('phone') && digits.length < 10) next.phone = 'Enter a 10-digit phone number.'
    }
    setErrors(next)
    if (Object.keys(next).length) return
    setStatus('sending')
    setTimeout(() => setStatus('done'), 850)
  }, [fields, required])

  const reset = useCallback(() => { setFields(initial); setErrors({}); setStatus('idle') }, [initial])

  return { fields, errors, status, setField, submit, reset }
}
