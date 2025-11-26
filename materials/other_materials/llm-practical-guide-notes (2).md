# A Practical Guide to Using LLMs: Video Notes

**Original Source**: Andrej Karpathy's video on practical LLM usage (2025)
**Last Updated**: November 2025 with current ecosystem information

---

## Introduction to the Growing LLM Ecosystem (00:00:00)

ChatGPT, developed by OpenAI and deployed in 2022, was the first widely accessible text interface for interacting with a large language model. Since then, the ecosystem has grown substantially.

### Major LLM Providers

- **OpenAI** – ChatGPT (the "Original Gangster" incumbent, most feature-rich)
- **Big Tech**
  - Google → Gemini
  - Meta → Meta AI
  - Microsoft → Copilot
- **Startups**
  - Anthropic → Claude (Claude 4 released May 2025)
  - xAI (Elon Musk) → Grok (Grok 3 released February 2025, Grok 4 available)
  - DeepSeek (China) → DeepSeek R1 and V3 (January 2025)
  - Mistral / Le Chat (France)
- **Open Source**
  - Meta → Llama 4 (includes Scout with 10M token context window)

### Tracking Model Quality

Two useful leaderboards for comparing models:
1. **Chatbot Arena (LMSYS)** – Available at lmarena.ai, ranks models by Elo score based on crowdsourced human preferences from 5M+ user votes
2. **SEAL Leaderboards** (from Scale AI) – Expert-driven evaluations across coding, instruction following, math, and multilingual benchmarks using curated private datasets. Also includes **SEAL Showdown** (as of September 2025), which ranks models based on preferences from users in 100+ countries and 70+ languages
3. **Vellum LLM Leaderboard** – Additional centralized leaderboard tracking multiple evaluation metrics

---

## ChatGPT Interaction Under the Hood (00:02:54)

### The Token Stream Mental Model

When you interact with ChatGPT, you're collaboratively building a **one-dimensional token sequence** with the model:

1. Your query is chopped into **tokens** (small text chunks, ~15 tokens for a short sentence)
2. The model responds with its own tokens (~19 tokens for a haiku)
3. Together, you build out a **context window** – the working memory of the conversation

You can visualize tokenization using tools like **Tik Tokenizer**. GPT-4o has a vocabulary of roughly 200,000 possible tokens.

When you click "New Chat," you **wipe the token window** and restart from zero.

### What Is the Model?

Think of the LLM as a **"zip file"** of the internet:

- **Pre-training**: The model reads essentially all of the internet, compressing it into neural network parameters (e.g., ~1 trillion parameters = ~1TB file). This creates a lossy, probabilistic representation of world knowledge.
- **Post-training**: Human labelers fine-tune the model to take on an assistant persona that responds helpfully to queries.

**Key insight**: By default, you're talking to a fully self-contained entity. There's no calculator, no Python interpreter, no web browsing – just a neural network predicting the next token based on compressed internet knowledge.

### The Model's Self-Introduction (Conceptual Understanding)

> "Hi, I'm ChatGPT. I am a 1TB compressed representation of internet knowledge. My knowledge comes from training data that was current several months ago, and I recall it probabilistically, not perfectly. My helpful assistant personality was shaped through fine-tuning by human labelers at OpenAI."

---

## Basic LLM Interactions Examples (00:13:12)

### Good Use Cases for the "Zip File"

1. **Common knowledge questions**: "How much caffeine is in one shot of Americano?" – This information is extremely frequent on the internet, so the model likely has good recall.

2. **General health queries** (with caveats): Asking about DayQuil vs NyQuil ingredients for a runny nose. The model gave correct information, but Karpathy verified against the actual box.

### Important Caveats

- You're not guaranteed correct answers – it's a **probabilistic recollection**
- Always verify against primary sources for anything important
- This works best for **common information that isn't recent**
- Low-stakes situations where small errors don't matter much

### Context Window Management Tips

- **Start a new chat when switching topics** – Don't overload the context window with irrelevant information
- Tokens are a precious resource; keeping them minimal:
  - Prevents the model from being distracted by old content
  - Makes responses slightly faster and cheaper
  - Can improve accuracy

---

## Be Aware of the Model You're Using & Pricing Tiers (00:18:03)

### ChatGPT Tiers (2025)

| Tier | Price | Model Access |
|------|-------|--------------|
| Free | $0 | GPT-4o with usage caps (varies by demand, may hit limits during peak times) |
| Go | ~$5/month | Regional tier (currently available in India, expanding to more countries) with access to GPT-4o and premium tools |
| Plus | $20/month | GPT-4o, o3, o4-mini models with higher usage limits |
| Pro | $200/month | Unlimited access to GPT-4o, o1, o3, o4-mini, and o1-pro mode with virtually no usage caps |
| Team | $25-30/user/month | Business features, 2+ users required |
| Enterprise | Custom pricing | Negotiated with sales |

### Key Point

**Always check which model you're using.** While the free tier now includes GPT-4o, it has usage caps that vary by demand. During peak times, you may be rate-limited or switched to less capable models. Premium tiers provide:
- More consistent access to flagship models
- Access to reasoning models (o1, o3, o4-mini)
- Higher usage limits or unlimited usage (Pro tier)

Other providers (Claude, Gemini, Grok) have similar tiered pricing structures. For professional work, the premium tiers are often worth the investment.

### The "LLM Council" Approach

Karpathy often asks the same question to multiple LLMs and compares their responses – treating them as a "council of language models" for important decisions.

---

## Thinking Models and When to Use Them (00:22:54)

### What Are Thinking Models?

A third stage of training uses **reinforcement learning** where models practice on math and code problems, discovering thinking strategies that lead to better outcomes. These models develop an internal monologue similar to human problem-solving.

### How to Identify Thinking Models

- **OpenAI**: o1, o3, o4-mini, o3-mini, o1-pro-mode, o3-pro (released June 2025, names starting with "o"). Released April 2025, o3 and o4-mini are the first reasoning models that can "think with images" and use multiple tools
- **DeepSeek**: R1 (released January 2025)
- **Anthropic**: Claude 3.7 and Claude 4 with "Extended thinking" mode
- **Google**: Gemini 2.5 Pro with "Deep Think" mode (released May 2025, uses parallel thinking techniques, achieved gold medal standard on 2025 IMO)
- **Grok**: "Think" toggle

### When to Use Thinking Models

**Use thinking models for:**
- Difficult math problems
- Complex coding bugs
- Problems requiring multi-step reasoning

**Don't bother for:**
- Simple queries (travel advice, general knowledge)
- Writing tasks that don't require deep reasoning

### Practical Example

Karpathy encountered a gradient check bug in his code:
- **GPT-4o** (non-thinking): Provided generic debugging suggestions but didn't identify the root cause
- **o1-pro** (thinking): Thought for 1 minute and found the exact parameter mismatch bug
- **Claude 3.5 Sonnet**: Also solved the problem (even without dedicated thinking mode)

**Strategy**: Try non-thinking models first for faster responses, then switch to thinking models if the initial response seems inadequate. Thinking models take longer but excel at complex problems requiring deep reasoning.

---

## Tool Use: Internet Search (00:31:00)

### Why Search Matters

The model's knowledge has a **cutoff date** (pre-training happened months ago). For recent information, the model needs to search the web.

### How It Works

1. The model emits a special "search the internet" token
2. ChatGPT stops generation, performs the search
3. Web pages are loaded into the context window
4. The model then answers using that fresh information

### Example Use Cases

- "When are new episodes of White Lotus Season 3 getting released?"
- "Is the market open today?"
- "What toothpaste does Brian Johnson use?" (recent, niche info)
- Current events, trending topics, product offerings that change over time

### Provider Availability (Updated 2025)

| Provider | Search Available? |
|----------|------------------|
| ChatGPT | Yes (automatic or manual) |
| Perplexity | Yes (designed for this) |
| Grok | Yes |
| **Claude** | **Yes (as of March/May 2025)** - Now available globally on all Claude plans for Claude 3.7 Sonnet, Claude 3.5 Sonnet, and Claude 3.5 Haiku. Includes direct citations for fact-checking |
| Gemini 2.5 Flash | Yes |
| Gemini 2.5 Pro | Yes (with Deep Think mode) |

**Tip**: When you know search is needed, explicitly select the search tool rather than hoping the model auto-detects it.

---

## Tool Use: Deep Research (00:42:04)

### What Is Deep Research?

A combination of **internet search + thinking** that runs for 5-15+ minutes. The model:
- Issues many internet searches
- Reads through papers and articles
- Thinks deeply about the information
- Produces a comprehensive report with citations

### Provider Options

- **ChatGPT Pro** ($200/month): Most thorough, longest reports
- **Perplexity**: "Deep Research" mode
- **Grok**: "Deep Search" mode

### Good Use Cases

- Researching health supplements and their mechanisms of action
- Comparing products (browsers, software)
- Understanding niche scientific papers
- Any topic requiring synthesis of multiple sources

### Important Caveats

**Treat deep research output as a first draft, not ground truth:**
- Hallucinations can still occur
- Numbers may be wrong
- Important items may be missing
- Always follow up on citations to verify

### Example Limitations

When researching "LLM labs in the USA," a deep research report:
- Completely missed xAI
- Incorrectly included Hugging Face (which doesn't train frontier models)
- Provided questionable accuracy on funding numbers

This illustrates the importance of treating deep research as a starting point, not a final answer.

---

## File Uploads: Adding Documents to Context (00:50:57)

### How It Works

You can upload PDFs, documents, or paste text directly into the conversation. The content gets converted to tokens and loaded into the context window.

**Note**: Images in PDFs may be discarded or have limited understanding depending on the model. Text extraction is the primary focus.

### Use Case 1: Reading Research Papers

1. Upload the paper PDF
2. Ask for a summary to start
3. Read the paper yourself while asking clarifying questions
4. The LLM makes complex papers more accessible

### Use Case 2: Reading Books

Karpathy reads books alongside LLMs, especially for:
- Older texts (e.g., *The Wealth of Nations* from 1776)
- Documents outside his area of expertise
- Shakespeare or other challenging material

**Workflow**:
1. Find raw text of the chapter (Project Gutenberg for public domain)
2. Copy/paste into the LLM
3. Start with a summary
4. Ask questions as you read

> "LLMs dramatically increase my retention and understanding of these chapters... Don't read books alone."

**Pain point**: As of 2025, no seamless tool exists to highlight passages in books and ask questions inline. The workflow still requires manual copy-pasting of text.

---

## Tool Use: Python Interpreter (00:59:00)

### Basic Concept

LLMs can recognize problems they can't solve "in their head" and write programs to calculate the answer instead.

**Simple multiplication** (30 × 9): Model calculates in its head → 270 ✓

**Complex multiplication** (large numbers): Model writes Python code, runs it, returns result

### The Messiness of the Ecosystem (2025 Update)

**Not all LLMs have Python access:**

| Provider | Python Interpreter? |
|----------|-------------------|
| ChatGPT | Yes |
| Claude | Yes (Code execution tools) |
| Grok 3/4 | Check current version - earlier versions lacked calculator access and hallucinated close-but-wrong answers |
| Gemini | Yes (with varying consistency) |

**Warning**: If a model doesn't have calculator access, it will still try to answer and may give plausible-looking but incorrect results. Always verify numerical calculations for important work.

---

## ChatGPT Advanced Data Analysis (01:04:35)

### What It Is

ChatGPT acts as a "junior data analyst" – you can:
- Collect data using search
- Create tables
- Generate plots and figures
- Fit trend lines

### Example Workflow

1. "Research OpenAI valuation over time, create a table"
2. "Plot this with log scale for y-axis"
3. "Fit a trend line and extrapolate to 2030"

### Gotchas to Watch For

**The model can make silent assumptions:**
- Missing data points? The model may quietly fill in values without informing you
- Example: When 2015 data was missing, it substituted $100M without disclosure
- **Always review the generated code** to understand what assumptions were made

**The model can hallucinate results:**
- In one example, Karpathy requested a 2030 extrapolation
- Model's text response: "1.7 trillion"
- Actual code output: ~20 trillion
- The model fabricated a number that sounded plausible rather than using the calculation

**Conclusion**: Powerful capability, but treat it like a junior analyst requiring close supervision. **Always verify**:
- The data sources and assumptions
- The generated code logic
- The final numerical results
- Any claims made in the narrative

---

## Claude Artifacts: Apps and Diagrams (01:09:00)

### What Are Artifacts?

Claude can write React code that runs directly in your browser, creating custom mini-apps on the fly.

### Example: Flashcard App

1. "Generate 20 flashcards from this text about Adam Smith"
2. "Use artifacts to create a flashcard app to test these"
3. Claude writes React code → interactive flashcard app appears

**Key insight**: This is a paradigm shift. Instead of developers writing apps for you to customize, the LLM writes a custom app specifically for your use case.

### Limitations

- No backend/database – purely frontend apps
- Limited complexity
- Works best for simple, self-contained utilities

### Best Use Case: Diagram Generation

Ask Claude to create a "conceptual diagram" of a book chapter or document:
- Uses the Mermaid library to define graph structures
- Produces visual representations of arguments/concepts
- Great for visual thinkers who want to see information laid out spatially

---

## Cursor: Composer and Writing Code (01:14:02)

### What Is Cursor?

A desktop application built on VS Code that integrates LLMs directly into your coding workflow. Offers model flexibility with access to frontier models from OpenAI, Anthropic (Claude), Gemini, and xAI.

### Major Update: Cursor 2.0 (October 2025)

Cursor 2.0 introduced significant improvements:
- **Composer Model**: A new frontier model built specifically for low-latency agentic coding, completing most tasks in under 30 seconds (4x faster than similarly intelligent models). Trained with codebase-wide semantic search capabilities.
- **Multi-Agent Workflows**: Run many agents in parallel without interference, powered by git worktrees or remote machines
- **Agent-Centric Interface**: Redesigned from the ground up to focus on outcomes rather than files
- **Built-in Testing**: Native browser tool allows Cursor to test its work and iterate until correct
- **Model Flexibility**: Choose between frontier models from OpenAI, Anthropic, Gemini, and xAI

### Evolution of Features

1. **Cmd+K**: Change a single line of code
2. **Cmd+L**: Explain a chunk of code
3. **Cmd+I (Composer)**: Autonomous multi-agent system that edits across multiple files simultaneously

### "Vibe Coding"

Karpathy coined this term for letting Composer take control:
- Give high-level instructions ("Add confetti when someone wins")
- Watch it install libraries, write code, update CSS
- The system can even find and download assets like sound files

### Demo Results

Starting from nothing, Cursor built a complete Tic-Tac-Toe game with:
- Winning detection
- Confetti animations
- Sound effects
- Styled winning cells

...in minutes, with minimal human input.

**Fallback**: You can always drop back to traditional programming if AI-assisted coding doesn't achieve the desired result.

---

## Audio (Speech) Input/Output (01:22:28)

### Speech-to-Text Input

**On mobile**: Tap the microphone, speak your query, it transcribes to text

**On desktop**: ChatGPT web doesn't have this built-in. Use system-wide apps:
- SuperWhisper
- Whisper Flow
- Mac Whisper

Karpathy uses F5 as a hotkey → speak → F5 to transcribe. About 50% of his queries are voice (80% on mobile).

### Text-to-Speech Output

Most apps have a "Read Aloud" feature to speak responses back to you.

**Key insight**: Don't type everything out – voice input works well and is much faster for many queries.

---

## Advanced Voice Mode: True Audio (01:27:37)

### What's Different?

Previous voice modes are "fake audio" – speech→text→LLM→text→speech.

**Advanced Voice Mode** handles audio natively:
- Audio is chunked into tokens (just like text)
- Model processes audio tokens directly
- No text intermediary

### Capabilities

- Real-time conversation (very low latency)
- Voice impressions (Yoda, pirate, etc.)
- Emotional expression
- Storytelling with engagement

### Limitations

- Very "cagey" – refuses many requests
- OpenAI has strict guardrails

### Grok Alternative

Grok's voice mode has multiple personalities:
- Default
- Romantic
- Unhinged
- Conspiracy mode
- "Spicy" mode

Much less restricted than ChatGPT's Advanced Voice Mode.

---

## NotebookLM: Podcast Generation (01:37:09)

### What It Is

Google's NotebookLM lets you:
1. Upload sources (PDFs, web pages, text)
2. Generate a custom "Audio Overview" (podcast) about those sources
3. Listen to AI-generated discussions with two hosts who summarize material, make connections between topics, and banter back and forth

### 2025 Features & Updates

**Interactive Mode (Beta)**:
- Break in and ask questions during playback
- Tap "Join" to have hosts invite you into the conversation
- Ask questions in real-time (hosts may pause awkwardly before responding, as the feature is still experimental)

**Multiple Format Options** (September 2025 update):
- Deep Dive (original format)
- Brief
- Critique
- Debate

**Language Support**: Extended to 80+ languages (beyond just English)

**NotebookLM Plus** (Early 2025): Paid tier offering:
- 5x more Audio Overview generation capacity
- Ability to customize length and style of notebook responses

**Custom Instructions**: Guide the podcast focus and tone

### Use Cases

- Papers outside your expertise
- Niche topics not covered by real podcasts
- Documents you want to understand without reading
- Great for passive learning while walking/driving

**Example**: Karpathy created a podcast season called "Histories of Mysteries" on Spotify – entirely AI-generated deep dives on topics of interest.

### Important Note

The AI hosts may occasionally introduce inaccuracies. Always verify important information against source material.

---

## Image Input: OCR and Analysis (01:40:20)

### How It Works

Images can be represented as token sequences (patches quantized into vocabulary), allowing LLMs to "see" and analyze them.

### Practical Examples

1. **Nutrition Labels**: Upload Brian Johnson's longevity mix label → get ingredient breakdown, safety rankings, mechanism explanations

2. **Blood Test Results**: Upload screenshots of lab results → get interpretations and explanations (verified against actual results)

3. **Math from Papers**: Screenshot an equation → get LaTeX transcription → ask for solutions

4. **Product Ingredients**: Toothpaste ingredients → which are functional vs unnecessary additives

5. **Meme Explanation**: Upload a confusing meme → get the joke explained

### Best Practice

**Two-step approach:**
1. First, ask the model to transcribe/extract the information
2. Verify the transcription is correct
3. Then ask analytical questions

This ensures the model actually "saw" the content correctly before you trust its analysis.

---

## Image Output: Native Image Generation in ChatGPT (01:47:02)

### Major Change: DALL-E 3 Replaced (March 2025)

**Important Update**: DALL-E 3 was replaced by GPT-4o's native image generation capabilities in March 2025. There is no DALL-E 4 planned.

### How It Works (Current State)

Unlike DALL-E 3, GPT-4o generates images natively:
- Integrated directly with ChatGPT's conversational abilities
- Better understands context from the dialogue
- Can generate images that better meet needs communicated in conversation
- No separate image generation system required

### Usage Limits (2025)

- **ChatGPT Plus users**: Up to 50 images every 3 hours (rolling window basis)
- Example: Generate 10 images at 1:00 PM → those 10 slots become available again at 4:00 PM

### Use Cases

- Thumbnail generation for videos
- Icons and simple graphics
- Summarizing concepts visually
- Creative content

### Alternatives

- **Ideogram**: Karpathy uses this for YouTube thumbnails
- **Midjourney**: Popular for artistic generation
- Various specialized tools for different styles

**Note**: DALL-E 3 is still available through the OpenAI API with a paid API key, but ChatGPT itself now uses GPT-4o for image generation.

---

## Video Input: Point and Talk (01:49:14)

### Availability

Available in ChatGPT mobile app under Advanced Voice Mode (not on web).

### How It Works

Enable camera → point at objects → ask questions in real-time

### Demo Examples

- Identifying books on a shelf by their spines
- Recognizing a CO2 monitor and discussing the readings
- Identifying a Middle Earth map

**Note**: Under the hood, this likely still samples individual frames rather than processing true video – but from the user perspective, it feels seamless.

---

## Video Output: Sora, Veo 2, etc. (01:52:23)

### Current State

Multiple AI video generation models exist:
- OpenAI Sora
- Google Veo 2 (currently near state-of-art)
- Various others (Runway, Pika, etc.)

### Quality

Impressive but rapidly evolving. Different models have different styles and quality levels.

Karpathy doesn't use these much personally (not in a creative profession), but they're valuable for content creators.

---

## ChatGPT Memory and Custom Instructions (01:53:29)

### Memory Feature

ChatGPT can save information across conversations:
- Sometimes triggers automatically
- Often requires explicit request: "Please remember this"
- Creates a database of facts about you
- This database is prepended to all future conversations

### Example

> User: "When do you think was peak Hollywood?"
> ChatGPT: "1990s to early 2000s"
> User: "Totally agreed. Can you remember my preference?"
> ChatGPT: [Memory updated: believes late 1990s/early 2000s was peak Hollywood]

Over time, ChatGPT builds up a profile and becomes more personally relevant.

### Managing Memories

You can view, edit, add, and delete memories in settings. Currently unique to ChatGPT.

### Custom Instructions

Found in Settings → Customize ChatGPT:
- **"What traits should ChatGPT have?"** – e.g., "Don't be like an HR business partner, just talk normally. Be educational."
- **"What should ChatGPT know about you?"** – e.g., learning Korean, prefer 존댓말 (formal) tone

These apply globally to all conversations.

---

## Custom GPTs (01:58:38)

### What They Are

Pre-configured ChatGPT instances with specific instructions saved. Essentially: saved prompts that you don't have to repeat.

### Example 1: Korean Vocabulary Extractor

- Input: A Korean sentence
- Output: Vocabulary in "Korean; English" format for flashcard import
- **Instructions**: Description + concrete examples (few-shot prompting)

### Example 2: Korean Detailed Translator

Instead of Google Translate (which is mediocre for Korean):
- Input: Korean sentence
- Output: Full translation + word-by-word breakdown showing exactly how pieces map

**Key advantage**: You can ask follow-up clarifying questions, which traditional translators don't support.

### Example 3: Korean Caption OCR

For watching Korean shows with baked-in subtitles:
1. Screenshot the frame
2. Paste into the custom GPT
3. Get OCR → translation → breakdown automatically

### Best Practices for Custom GPTs

1. Give background context
2. Provide clear instructions
3. **Include concrete examples** (few-shot prompting dramatically improves accuracy)
4. Use XML-like tags for longer examples to clearly delineate input/output

### Similar Features in Other Apps

Look for "Projects" or similar functionality in Claude, Gemini, etc.

---

## Summary (02:06:30)

### The Ecosystem (2025 Status)

- Rapidly growing, changing, and thriving
- ChatGPT remains the incumbent with comprehensive feature set
- Competition has intensified with major updates:
  - **Claude 4** (May 2025): Hybrid architecture with instant responses and extended thinking, 200K-1M token context window
  - **Gemini 2.5 Pro** (March 2025): Deep Think mode with parallel thinking, achieved gold medal standard on IMO 2025
  - **OpenAI o3/o4 series** (April-June 2025): First reasoning models that can "think with images" and use multiple tools
  - **Grok 3/4** (February 2025): Trained on massive Colossus supercomputer
  - **Cursor 2.0** (October 2025): Revolutionary AI coding with Composer model and multi-agent workflows

### Provider Strengths by Use Case

- **Perplexity**: Best for search-focused queries and research
- **Claude**: Now has web search (as of March 2025), excellent for artifacts/web app prototyping and diagrams
- **ChatGPT**: Most comprehensive toolset including Advanced Voice Mode
- **Grok**: Less restricted, more entertaining, multiple personality modes
- **Gemini 2.5 Pro with Deep Think**: Excellent for complex reasoning, math, and scientific problems
- **NotebookLM**: Best for generating custom podcasts from documents (80+ languages, multiple formats)
- **Cursor**: Best-in-class AI-powered coding environment

### Key Dimensions to Track

1. **Model Size/Tier**: Bigger models = more knowledge, creativity, accuracy
   - Free tiers now often include flagship models but with usage caps
   - Premium tiers ($20-200/month) provide consistent access and reasoning models

2. **Thinking/Reasoning Models**: Use for math, code, complex reasoning
   - OpenAI: o1, o3, o4-mini, o3-pro
   - Google: Gemini 2.5 Pro with Deep Think
   - Anthropic: Claude with Extended Thinking
   - DeepSeek: R1

3. **Tool Access**:
   - Internet search (now widely available, including Claude as of 2025)
   - Python interpreter (most major providers)
   - File uploads (for document analysis)
   - Deep Research (5-15+ minute comprehensive reports)

4. **Multimodality**:
   - Audio input/output (speech, podcasts, Advanced Voice Mode)
   - Image input (OCR, analysis) / Native image generation (GPT-4o replaced DALL-E 3 in March 2025)
   - Video input (Point and Talk in ChatGPT mobile)
   - Video output (Sora, Veo 2, rapidly evolving)

5. **Quality of Life Features**:
   - Memory (ChatGPT saves information across conversations)
   - Custom instructions (global preferences)
   - Custom GPTs / Projects (saved prompts and configurations)

6. **Platform Availability**: Web vs mobile apps have different feature sets
   - Some features (like Point and Talk) are mobile-only
   - Desktop apps (Cursor) offer unique coding capabilities

### Final Advice

- Experiment with different providers and pricing tiers
- Be mindful of which model you're using and whether it has the tools you need
- **Treat outputs as first drafts to verify** - hallucinations and errors still occur
- Use voice input liberally – don't type everything (50-80% of queries can be voice)
- Don't read books or papers alone – bring an LLM for better comprehension and retention
- Start new chats when switching topics to keep context clean
- Consider the "LLM Council" approach: ask multiple LLMs and compare responses for important decisions
- For coding: Embrace "vibe coding" with tools like Cursor 2.0
- Always verify numerical calculations and citations, especially from deep research

### Looking Forward

The ecosystem continues to evolve rapidly. Major trends include:
- Reasoning models becoming multimodal (thinking with images)
- Native tool integration (search, code execution) becoming standard
- Context windows expanding (now up to 10M tokens with Llama 4 Scout)
- AI coding assistants becoming more autonomous and capable
- Pricing competition making premium features more accessible (ChatGPT Go at ~$5/month)

---

*Notes compiled from Andrej Karpathy's video on practical LLM usage, with updates for 2025 ecosystem changes.*
