# 📚 Design System Prompt Library

## Overview

This is your central prompt library for using AI to build with your design system. Each component has curated prompts that you can copy and paste directly into Claude or any MCP-enabled AI assistant.

## 🎯 How to Use This Library

### 1. **Copy Prompts Directly**
   - Visit: http://localhost:3000/docs/components/[component-name]
   - Scroll to the "🤖 AI Prompts" section
   - Click to copy any prompt
   - Paste into Claude and get instant code

### 2. **Customize for Your Needs**
   - Replace generic text with your specific use case
   - Combine multiple prompts for complex features
   - Reference multiple components in one prompt

### 3. **Share with Your Team**
   - Export prompts for common use cases
   - Create project-specific prompt collections
   - Document patterns that work well

## 🔥 Quick Start Prompts

### For New Users
```
"What components are available in my design system?"
"Show me all Button variants"
"Give me examples of using the Button component"
```

### For Building Features
```
"Create a hero section using my design system"
"Build a contact form with my components"
"Make a dashboard header with my Button and Badge components"
```

## 📦 Component-Specific Prompts

### Button Component

#### **Quick Prompts** (Copy & Use)
```
"Give me a Primary button"
"Create a Secondary button"
"I need a Ghost button"
"Show me a Large button"
"Create a Small button with Primary type"
```

#### **Advanced Prompts**
```
"Create a Primary Large button with a left icon"
"I need a Secondary Small button with disabled state"
"Give me a Ghost button with an icon on the right"
"Create a button group with Primary, Secondary, and Ghost buttons"
"Show me all button size variations for Primary type"
```

#### **Use Case Prompts**

**Hero Section CTA:**
```
Prompt: "Create primary and secondary CTA buttons for my hero section"

Expected Output:
<div className="flex gap-4">
  <Button Type="Primary" Size="Large">Get Started</Button>
  <Button Type="Secondary" Size="Large">Learn More</Button>
</div>
```

**Form Actions:**
```
Prompt: "Create submit and cancel buttons for a form"

Expected Output:
<div className="flex justify-end gap-3">
  <Button Type="Ghost" Size="Base">Cancel</Button>
  <Button Type="Primary" Size="Base">Submit</Button>
</div>
```

**Add Item Button:**
```
Prompt: "Create a button to add new items with a plus icon"

Expected Output:
<Button Type="Primary" Icon="Left">
  <PlusIcon className="w-4 h-4" />
  Add New Item
</Button>
```

**Delete Action:**
```
Prompt: "Create a destructive delete button"

Expected Output:
<Button Type="Secondary" Size="Base">
  <TrashIcon className="w-4 h-4 text-red-500" />
  Delete
</Button>
```

**Navigation:**
```
Prompt: "Create a continue button with arrow icon"

Expected Output:
<Button Type="Primary" Icon="Right">
  Continue
  <ArrowRightIcon className="w-4 h-4" />
</Button>
```

**Loading State:**
```
Prompt: "Show a button in loading/disabled state"

Expected Output:
<Button Type="Primary" State="Disabled">
  <Spinner className="w-4 h-4 mr-2" />
  Processing...
</Button>
```

## 🎨 Pattern Library

### Common UI Patterns

#### **Modal Actions**
```
"Create modal action buttons (confirm and cancel)"
```
Expected: Primary confirm button + Ghost cancel button

#### **Form Submit Section**
```
"Build form footer with save, cancel, and reset buttons"
```
Expected: Button group with appropriate types

#### **Pagination Controls**
```
"Create previous/next pagination buttons"
```
Expected: Buttons with left/right arrow icons

#### **Settings Actions**
```
"Make save settings button group"
```
Expected: Primary save + Secondary discard buttons

## 🚀 Advanced Patterns

### Multi-Component Prompts

#### **Complete Form**
```
"Create a contact form with my Button and Input components, including:
- Name and email fields
- Message textarea
- Submit button (Primary, Large)
- Cancel button (Ghost)"
```

#### **Dashboard Header**
```
"Build a dashboard header with:
- Title on the left
- Button group on the right (Add New button + Settings button)
- Use Primary button for Add New, Ghost for Settings"
```

#### **Modal Dialog**
```
"Create a delete confirmation modal with:
- Warning message
- Destructive delete button (Primary)
- Cancel button (Ghost)
- Buttons aligned right"
```

## 💡 Pro Tips

### 1. **Be Specific About Context**
❌ "Give me a button"
✅ "Give me a primary button for submitting a form"

### 2. **Reference Visual Hierarchy**
✅ "Primary button for main action, Secondary for alternative"
✅ "Ghost button for tertiary/least important action"

### 3. **Mention Icon Position**
✅ "Button with plus icon on the left"
✅ "Navigation button with arrow on the right"

### 4. **Specify Size for Context**
✅ "Large button for hero section"
✅ "Small button for table row actions"

### 5. **Combine Multiple Requests**
✅ "Create a button group with submit (Primary, Large) and cancel (Ghost, Base)"

## 📖 Prompt Templates

### Template 1: Single Component
```
"Create a [Type] [Size] [Component] for [use case]"

Example:
"Create a Primary Large Button for hero CTA"
```

### Template 2: Component with Icon
```
"Create a [Component] with [icon position] icon for [action]"

Example:
"Create a Button with left icon for adding items"
```

### Template 3: Component Group
```
"Create a [component] group for [use case] with:
- [Item 1]: [Type] [Size]
- [Item 2]: [Type] [Size]"

Example:
"Create a button group for form actions with:
- Submit: Primary Base
- Cancel: Ghost Base"
```

### Template 4: Complete Feature
```
"Build a [feature] using my design system components:
- [Component 1]: [specifications]
- [Component 2]: [specifications]
- [Layout]: [arrangement]"

Example:
"Build a hero section using my design system components:
- Heading with title
- Two buttons: Primary Large (Get Started) and Secondary Large (Learn More)
- Layout: Buttons in a horizontal flex row with gap"
```

## 🎯 Component Quick Reference

### Button Props
| Prop | Values | Use When |
|------|--------|----------|
| Type | Primary | Main action, CTA |
| Type | Secondary | Alternative action |
| Type | Ghost | Tertiary/subtle action |
| Type | White | Light backgrounds |
| Size | Small | Compact spaces, tables |
| Size | Base | Default, most common |
| Size | Large | Hero, emphasis |
| Icon | Left | Add, create actions |
| Icon | Right | Navigation, forward |

## 🔄 Workflow Examples

### Scenario 1: Building a New Page

**Step 1:** Start with layout
```
"Create a page header with title and action buttons using my components"
```

**Step 2:** Add sections
```
"Create a form section with my Button and Input components"
```

**Step 3:** Add interactions
```
"Add save and cancel buttons to the form footer"
```

### Scenario 2: Refactoring Existing Code

**Step 1:** Identify pattern
```
"I have a form with custom button styles. Show me how to use my Button component instead"
```

**Step 2:** Get replacement code
```
"Convert this button: <button className='bg-blue-500...'>Submit</button> to use my Button component"
```

### Scenario 3: Exploring Options

**Step 1:** See all variants
```
"Show me all Button type variations"
```

**Step 2:** See use cases
```
"When should I use each Button type?"
```

**Step 3:** Get recommendation
```
"What button style should I use for a delete action?"
```

## 📚 Resources

- **Live Prompt Library:** http://localhost:3000/docs/components
- **MCP Setup Guide:** `./MCP_INTEGRATION.md`
- **Usage Examples:** `./USING_COMPONENTS_WITH_AI.md`
- **Component Docs:** `http://localhost:3000/docs`

## 🆕 Adding Prompts to New Components

When you add new components, include:

1. **Basic Prompts** (5-7 simple variations)
2. **Advanced Prompts** (3-5 complex combinations)
3. **Use Cases** (4-6 real-world scenarios with code)

Example structure:
```json
{
  "prompts": {
    "basic": [
      "Simple request 1",
      "Simple request 2",
      ...
    ],
    "advanced": [
      "Complex request 1",
      "Complex request 2",
      ...
    ],
    "useCases": [
      {
        "scenario": "Use case name",
        "prompt": "What to ask",
        "output": "Expected code"
      }
    ]
  }
}
```

---

**Start using AI with your design system now!** 🚀

Copy any prompt, paste it into Claude, and get production-ready code instantly.

