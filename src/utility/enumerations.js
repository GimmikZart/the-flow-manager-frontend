export class GenderEnumeration {
  static man = 0
  static woman = 1

  static Codes = [this.man, this.woman]
  static Labels = ['Maschio', 'Femmina']

  static toSelectOptions (from, to) {
    return enumToSelectOptions(this.Codes, this.Labels, from, to)
  }

  static codeToLabel (code) {
    return enumCodeToLabel(this.Codes, this.Labels, code)
  }
}

export class PaymentStatusEnumeration {
  static ok = 0
  static canceled = 1

  static Codes = [this.ok, this.canceled]
  static Labels = ['OK', 'ANNULLATO']

  static toSelectOptions (from, to) {
    return enumToSelectOptions(this.Codes, this.Labels, from, to)
  }

  static codeToLabel (code) {
    return enumCodeToLabel(this.Codes, this.Labels, code)
  }
}

/* FUNZIONI */

function enumToSelectOptions (codes, labels, from, to) {
  const options = []
  for (var i = 0; i < codes.length; i++) {
    const code = codes[i]
    const label = labels[i]
    if (from && code < from) continue
    if (to && code >= to) continue
    options.push({ value: code, text: label })
  }
  return options
}

function enumCodeToLabel (codes, labels, code) {
  for (var i = 0; i < codes.length; i++) {
    if (codes[i] === code) return labels[i]
  }
  return ''
}

/* function enumLabelToCode (codes, labels, label) {
  for (var i = 0; i < labels.length; i++) {
    if (labels[i] == label) return codes[i]
  }
  return ""
} */
