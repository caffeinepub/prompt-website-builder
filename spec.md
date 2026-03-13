# Prompt Website Builder

## Current State
New project with no existing implementation.

## Requested Changes (Diff)

### Add
- Landing page with prominent prompt input field
- AI-simulated website preview generator based on prompt keywords
- Generated preview renders sections: hero, features, about, contact -- populated from prompt content
- Example prompt gallery to inspire users
- History of previously generated sites (stored in backend)
- Color scheme customization (warm, cool, neutral, vibrant)
- Layout style toggle: minimal, bold, elegant
- Futuristic, clean Caffeine-inspired aesthetic

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend: Store generated site entries (id, prompt, colorScheme, layoutStyle, timestamp, sections data)
2. Backend: CRUD -- saveGeneration, getHistory, deleteGeneration
3. Frontend: Landing page with hero input section
4. Frontend: Example prompts gallery grid
5. Frontend: Generation result view with live preview iframe-like component
6. Frontend: Section renderers -- hero, features, about, contact -- driven by prompt keyword parsing
7. Frontend: Color/layout customization panel
8. Frontend: History sidebar/panel with clickable past generations
