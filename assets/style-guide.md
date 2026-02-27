# Copper — Melio Content Design Foundations

> **For content designers:** This file is the source of truth for the StyleGuide AI plugin. Edit it directly — the plugin reads it on every generation. No technical knowledge required. Changes take effect after a developer rebuilds the plugin (or after we set up live fetching).

---

## 1. Introduction

### 1.1 What is Copper?

Welcome to Copper: Melio Content Design Foundations. As your trusted ally in streamlining B2B payments, we understand that clear and effective communication is essential for your success. This guide, named "Copper" as a key component of Melio's design system "Penny," serves as the cornerstone for all in-product microcopy and content created for Melio, ensuring a consistent, user-friendly, and accessible experience across our platform and communications.

### 1.2 Who is Copper for?

This guide is for all individuals contributing to Melio's in-product content ecosystem:

- Content designers
- UX writers
- Product managers
- Engineers
- Designers
- Any stakeholder creating user-facing content

Copper primarily governs in-product microcopy and UX content.

### 1.3 Melio's content principles

Our content is guided by five core principles:

- **Clarity** — Communicate in a way that is easy to understand. Avoid unnecessary complexity.
- **Conciseness** — Respect users' time. Get straight to the point.
- **Usefulness** — Provide practical value that helps users take action or make decisions.
- **Consistency** — Maintain unified voice, tone, terminology, and structure.
- **Accessibility** — Adhere to WCAG AA standards. Ensure content is usable by everyone.

### 1.4 Alignment with Melio's brand

Our content reflects Melio's role as a trusted ally. We aim to be:

- Strategic
- Reinforcing
- Enabling
- Practical
- Direct
- Highly competent

**Core message:** "You already know what needs to be done — let me help you get there faster."

We empower. We don't instruct from above.

---

## 2. Voice and Tone

### Our voice is:

- **Knowledgeable** — We know payments. We speak with authority.
- **Trustworthy** — We are reliable and transparent.
- **Approachable** — We are human, not corporate.

### Our tone is: Supportive and Equal

- Empathetic
- Collaborative
- Respectful
- Helpful

### Our voice is NOT:

- Pretentious
- Overpromising
- Arrogant
- Condescending
- Patronizing

### Applying voice and tone

Use "we" and "you" to foster partnership. Frame solutions collaboratively.

**Error message example**

| ❌ Less Ally | ✅ More Ally |
|---|---|
| "You must select a payment method." | "Please select a payment method so we can proceed." |

### Tone hierarchy

1. **Accessible voice** (always first)
2. **Useful voice**
3. **Delightful tone** (only when 1 and 2 are satisfied)

---

## 3. Grammar and Mechanics

### Capitalization

| Element | Rule | Correct | Incorrect |
|---|---|---|---|
| Buttons | Sentence case | Schedule payment | Schedule Payment |
| Headings | Sentence case | Schedule a payment | Schedule A Payment |
| Proper nouns | Always capitalize | Pay to Acme Supplies | Pay to acme supplies |
| Country/currency names | Sentence case | British pounds, US dollar | British Pounds, US Dollar |
| Acronyms | Always capitalize | ZIP code, EIN | zip code, ein |

**Acronyms:** Spell out on first use, then abbreviate.
> Employer Identification Number (EIN) → then use EIN.

### Numbers

Use numerals for payment amounts, dates, and technical contexts.

> $1,500.00 | Apr 15, 2025

### Writing style

**Active voice**

| ❌ Incorrect | ✅ Correct |
|---|---|
| Your payment details should be confirmed. | Confirm your payment details. |

**Strong verbs in CTAs**

| ✅ Use | ❌ Avoid |
|---|---|
| Schedule payment | Submit |
| Add vendor | Proceed |

**Second person** — Address users directly.
> ✅ "You have scheduled a payment."

**Oxford comma** — Always use it.
> Pay with Card, ACH bank transfer, or virtual card.

**Exclamation points** — Use sparingly. Avoid unnecessary excitement.

**Avoid redundant phrasing**

| ❌ Incorrect | ✅ Correct |
|---|---|
| Payment scheduled successfully | Payment scheduled |

> Only use "successfully" when failure is a realistic expectation in context.

**"Free" usage** — Only for specific plan allowances.

| ✅ Correct | ❌ Incorrect |
|---|---|
| 20 free ACH transfers per month | Melio is free to use |

**Component-specific wording**

| Component | Use |
|---|---|
| Dropdown | Select an option |
| Date picker | Choose a date |

---

## 4. Accessibility (WCAG AA)

### Text alternatives
- Provide alt text for meaningful images (under ~125 characters).
- Decorative images → empty alt attribute.

### Clear language
- Avoid jargon.
- Define technical terms on first use.

### Meaningful link text

| ❌ Incorrect | ✅ Correct |
|---|---|
| Click here | Learn more about payment methods |

### Headings and structure
- Use proper semantic hierarchy: H1 → H2 → H3.
- Do not skip levels.
- Headings must reflect the content below them.

### Form labels
- Every input must have a visible, associated label.
- Do not rely solely on placeholder text.

### Error messages

Error messages must:
1. Explain what went wrong
2. Explain how to fix it
3. Be associated with the specific field

| ❌ Incorrect | ✅ Correct |
|---|---|
| Invalid input. | The payment amount needs to be greater than $0. |

### Consistent terminology

| ✅ Use | ❌ Do not use |
|---|---|
| Payment method | Funding source, Payment type |

### Disabled UI elements

When disabling elements:
- Provide visual indication
- Apply `aria-disabled="true"`
- Explain why it is disabled and how to enable it

> **Example:** "The 'Send payment' button is disabled because you have not entered a payment amount."

### Avoid directional language

Do not use: "click here," "see below," "button on the right." Refer to named elements instead.

---

## 5. Content by Surface

### UI Text

| Element | Example |
|---|---|
| Label | Vendor name, Payment method |
| Button | Schedule payment, Add vendor |
| Tooltip | Choose how you want to fund this payment. |
| Error | The payment amount needs to be greater than $0. |
| Notification | Your payment to Acme Supplies has been scheduled. |

> **Avoid "must"** — Use softer phrasing.
> ❌ "You must select a payment method." → ✅ "Please select a payment method."

### Onboarding flows

| Moment | Example |
|---|---|
| Welcome | Welcome to Melio. Let's get you set up to make and receive payments. |
| Empty state | You haven't added any vendors yet. Select "Add vendor" to get started. |
| Success | Your bank account has been connected. |

Tone: Welcoming, encouraging, empowering, patient.

### Marketing and in-product marketing

| Surface | Example |
|---|---|
| Headline | Simplify your business payments and save time with Melio |
| Email subject | Tip: Schedule payments in advance to manage cash flow |
| Paywall | Unlock faster payments and enhanced control with Melio Pro. |
| Upsell banner | Simplify reconciliation. Connect your accounting software with Melio. |
| Promo notification | New! Instant transfers are now available for eligible payments. |

Tone: Helpful, informative, respectful, confident, empowering.

---

## 6. Maintaining This Guide

- **Major updates** → version number increase
- **Minor updates** → incremental revision
- **Feedback** → reviewed by the content design team
- **Formal review** → quarterly or bi-annually
- **Governance** → the content design team maintains authority; exceptions must be approved
