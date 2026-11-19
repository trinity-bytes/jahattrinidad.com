# Contact Chat Specification

> New capability (visual-design task 7.7, decided 2026-11-17). Design and states: `design.md` section 3 of this change. The questions and the email template come from the chat design (visual-design task 7.11).

## Purpose

Let a visitor reach the owner from the Contact section through a short guided conversation that collects who they are and what they want, shows an editable summary, and sends it, without leaving the site and without a language model.

## Requirements

### Requirement: Scripted, Not Model-Written

Every reply in the chat MUST come from a fixed script driven by a state machine. The chat MUST NOT call a language model or any service other than the form service.

#### Scenario: No model call

- GIVEN a complete conversation from first message to "Sent"
- WHEN the network requests are inspected
- THEN the only request the chat makes MUST be the POST to the form service

### Requirement: Free Text and Suggestions Both Work

The composer MUST accept free text and the suggestion chips ("I'm hiring", "I have a project"). A first free-text message MUST be scanned: an email address in it MUST fill the email field, and branch keywords MUST pick the branch. A question whose answer is already known MUST be skipped.

#### Scenario: Email in the first message

- GIVEN the visitor's first message contains `sam@alder.dev`
- WHEN the conversation reaches the point where it would ask for an email
- THEN the email question MUST be skipped
- AND the summary MUST show `sam@alder.dev`

#### Scenario: Branch from keywords

- GIVEN the first message "We're hiring a frontend intern"
- WHEN the engine processes it
- THEN the branch MUST be `hiring` without asking the visitor to pick one

### Requirement: Feels Conversational

Before each scripted reply the chat MUST show a typing indicator whose duration grows with the reply length, capped at 1.4 s, and is zero under reduced motion. Replies MUST reuse fields already captured. The composer placeholder MUST change with each question. All strings MUST come from the `Dictionary`.

#### Scenario: Typing delay is capped

- GIVEN a scripted reply of 400 characters
- WHEN it is about to appear
- THEN the typing indicator MUST show for no more than 1.4 s

#### Scenario: Reduced motion skips the delay

- GIVEN `prefers-reduced-motion: reduce`
- WHEN a reply is due
- THEN it MUST appear with no typing delay

### Requirement: Editable Summary Before Sending

Before anything is sent, the chat MUST show a summary of every captured field, each with an edit control that reopens only that question and returns to the summary. Nothing MUST be sent until the visitor confirms.

#### Scenario: Editing one field

- GIVEN the summary is shown
- WHEN the visitor edits the company field and answers again
- THEN the chat MUST return to the summary with the new company
- AND every other field MUST be unchanged

### Requirement: Sending Through a Form Service, With Fallbacks

On confirm, the chat MUST POST the fields and a plain-text body built from the email template to the configured form service, including a honeypot field. On success it MUST show a sent state and one next step for the branch. On failure it MUST keep every field, offer a retry, and offer "Copy my email" as a fallback. A one-line privacy note MUST sit under the composer.

#### Scenario: Failed send keeps the data

- GIVEN the form service returns an error
- WHEN the chat shows the failure
- THEN the summary fields MUST still be filled
- AND a retry control and a "Copy my email" control MUST be available

#### Scenario: Success shows a next step

- GIVEN the form service returns 2xx on the `hiring` branch
- WHEN the chat shows the sent state
- THEN it MUST offer a link to the Inspiration Garden case study

### Requirement: Accessible Conversation

The message list MUST be an `aria-live="polite"` log, every chip and edit control MUST be a real button reachable by keyboard, focus MUST return to the composer after each reply, and the I shortcut of the lens MUST be ignored while the composer has focus.

#### Scenario: Keyboard-only conversation

- GIVEN a keyboard-only visitor
- WHEN they complete the conversation with Tab, Enter and typing only
- THEN they MUST reach the sent state without a pointer
- AND each new reply MUST be announced by the live region
