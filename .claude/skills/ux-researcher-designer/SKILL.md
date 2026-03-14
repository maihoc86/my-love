---
name: ux-researcher-designer
description: |
  UX research and design toolkit bao gồm persona generation, journey mapping, usability testing,
  và research synthesis - tối ưu cho thị trường Việt Nam và dự án CDS Platform.
  Sử dụng khi: cần tạo user persona cho khách hàng VN, mapping customer journey cho CDS modules,
  lập kế hoạch usability testing, hoặc tổng hợp kết quả nghiên cứu người dùng.
  Trigger: "persona", "journey map", "usability test", "user research",
  "pain points", "empathy map", "user needs", "customer journey",
  "trải nghiệm người dùng", "nghiên cứu khách hàng".
---

# UX Researcher & Designer

Generate user personas from research data, create journey maps, plan usability tests, and synthesize research findings into actionable design recommendations.

---

## Table of Contents

- [Trigger Terms](#trigger-terms)
- [Workflows](#workflows)
  - [Workflow 1: Generate User Persona](#workflow-1-generate-user-persona)
  - [Workflow 2: Create Journey Map](#workflow-2-create-journey-map)
  - [Workflow 3: Plan Usability Test](#workflow-3-plan-usability-test)
  - [Workflow 4: Synthesize Research](#workflow-4-synthesize-research)
- [Tool Reference](#tool-reference)
- [Quick Reference Tables](#quick-reference-tables)
- [Knowledge Base](#knowledge-base)

---

## Trigger Terms

Use this skill when you need to:

- "create user persona"
- "generate persona from data"
- "build customer journey map"
- "map user journey"
- "plan usability test"
- "design usability study"
- "analyze user research"
- "synthesize interview findings"
- "identify user pain points"
- "define user archetypes"
- "calculate research sample size"
- "create empathy map"
- "identify user needs"

---

## Workflows

### Workflow 1: Generate User Persona

**Situation:** You have user data (analytics, surveys, interviews) and need to create a research-backed persona.

**Steps:**

1. **Prepare user data**

   Required format (JSON):
   ```json
   [
     {
       "user_id": "user_1",
       "age": 32,
       "usage_frequency": "daily",
       "features_used": ["dashboard", "reports", "export"],
       "primary_device": "desktop",
       "usage_context": "work",
       "tech_proficiency": 7,
       "pain_points": ["slow loading", "confusing UI"]
     }
   ]
   ```

2. **Run persona generator**
   ```bash
   # Human-readable output
   python scripts/persona_generator.py

   # JSON output for integration
   python scripts/persona_generator.py json
   ```

3. **Review generated components**

   | Component | What to Check |
   |-----------|---------------|
   | Archetype | Does it match the data patterns? |
   | Demographics | Are they derived from actual data? |
   | Goals | Are they specific and actionable? |
   | Frustrations | Do they include frequency counts? |
   | Design implications | Can designers act on these? |

4. **Validate persona**

   - Show to 3-5 real users: "Does this sound like you?"
   - Cross-check with support tickets
   - Verify against analytics data

5. **Reference:** See `references/persona-methodology.md` for validity criteria

---

### Workflow 2: Create Journey Map

**Situation:** You need to visualize the end-to-end user experience for a specific goal.

**Steps:**

1. **Define scope**

   | Element | Description |
   |---------|-------------|
   | Persona | Which user type |
   | Goal | What they're trying to achieve |
   | Start | Trigger that begins journey |
   | End | Success criteria |
   | Timeframe | Hours/days/weeks |

2. **Gather journey data**

   Sources:
   - User interviews (ask "walk me through...")
   - Session recordings
   - Analytics (funnel, drop-offs)
   - Support tickets

3. **Map the stages**

   Typical B2B SaaS stages:
   ```
   Awareness → Evaluation → Onboarding → Adoption → Advocacy
   ```

4. **Fill in layers for each stage**

   ```
   Stage: [Name]
   ├── Actions: What does user do?
   ├── Touchpoints: Where do they interact?
   ├── Emotions: How do they feel? (1-5)
   ├── Pain Points: What frustrates them?
   └── Opportunities: Where can we improve?
   ```

5. **Identify opportunities**

   Priority Score = Frequency × Severity × Solvability

6. **Reference:** See `references/journey-mapping-guide.md` for templates

---

### Workflow 3: Plan Usability Test

**Situation:** You need to validate a design with real users.

**Steps:**

1. **Define research questions**

   Transform vague goals into testable questions:

   | Vague | Testable |
   |-------|----------|
   | "Is it easy to use?" | "Can users complete checkout in <3 min?" |
   | "Do users like it?" | "Will users choose Design A or B?" |
   | "Does it make sense?" | "Can users find settings without hints?" |

2. **Select method**

   | Method | Participants | Duration | Best For |
   |--------|--------------|----------|----------|
   | Moderated remote | 5-8 | 45-60 min | Deep insights |
   | Unmoderated remote | 10-20 | 15-20 min | Quick validation |
   | Guerrilla | 3-5 | 5-10 min | Rapid feedback |

3. **Design tasks**

   Good task format:
   ```
   SCENARIO: "Imagine you're planning a trip to Paris..."
   GOAL: "Book a hotel for 3 nights in your budget."
   SUCCESS: "You see the confirmation page."
   ```

   Task progression: Warm-up → Core → Secondary → Edge case → Free exploration

4. **Define success metrics**

   | Metric | Target |
   |--------|--------|
   | Completion rate | >80% |
   | Time on task | <2× expected |
   | Error rate | <15% |
   | Satisfaction | >4/5 |

5. **Prepare moderator guide**

   - Think-aloud instructions
   - Non-leading prompts
   - Post-task questions

6. **Reference:** See `references/usability-testing-frameworks.md` for full guide

---

### Workflow 4: Synthesize Research

**Situation:** You have raw research data (interviews, surveys, observations) and need actionable insights.

**Steps:**

1. **Code the data**

   Tag each data point:
   - `[GOAL]` - What they want to achieve
   - `[PAIN]` - What frustrates them
   - `[BEHAVIOR]` - What they actually do
   - `[CONTEXT]` - When/where they use product
   - `[QUOTE]` - Direct user words

2. **Cluster similar patterns**

   ```
   User A: Uses daily, advanced features, shortcuts
   User B: Uses daily, complex workflows, automation
   User C: Uses weekly, basic needs, occasional

   Cluster 1: A, B (Power Users)
   Cluster 2: C (Casual User)
   ```

3. **Calculate segment sizes**

   | Cluster | Users | % | Viability |
   |---------|-------|---|-----------|
   | Power Users | 18 | 36% | Primary persona |
   | Business Users | 15 | 30% | Primary persona |
   | Casual Users | 12 | 24% | Secondary persona |

4. **Extract key findings**

   For each theme:
   - Finding statement
   - Supporting evidence (quotes, data)
   - Frequency (X/Y participants)
   - Business impact
   - Recommendation

5. **Prioritize opportunities**

   | Factor | Score 1-5 |
   |--------|-----------|
   | Frequency | How often does this occur? |
   | Severity | How much does it hurt? |
   | Breadth | How many users affected? |
   | Solvability | Can we fix this? |

6. **Reference:** See `references/persona-methodology.md` for analysis framework

---

## Tool Reference

### persona_generator.py

Generates data-driven personas from user research data.

| Argument | Values | Default | Description |
|----------|--------|---------|-------------|
| format | (none), json | (none) | Output format |

**Sample Output:**

```
============================================================
PERSONA: Alex the Power User
============================================================

📝 A daily user who primarily uses the product for work purposes

Archetype: Power User
Quote: "I need tools that can keep up with my workflow"

👤 Demographics:
  • Age Range: 25-34
  • Location Type: Urban
  • Tech Proficiency: Advanced

🎯 Goals & Needs:
  • Complete tasks efficiently
  • Automate workflows
  • Access advanced features

😤 Frustrations:
  • Slow loading times (14/20 users)
  • No keyboard shortcuts
  • Limited API access

💡 Design Implications:
  → Optimize for speed and efficiency
  → Provide keyboard shortcuts and power features
  → Expose API and automation capabilities

📈 Data: Based on 45 users
    Confidence: High
```

**Archetypes Generated:**

| Archetype | Signals | Design Focus |
|-----------|---------|--------------|
| power_user | Daily use, 10+ features | Efficiency, customization |
| casual_user | Weekly use, 3-5 features | Simplicity, guidance |
| business_user | Work context, team use | Collaboration, reporting |
| mobile_first | Mobile primary | Touch, offline, speed |

**Output Components:**

| Component | Description |
|-----------|-------------|
| demographics | Age range, location, occupation, tech level |
| psychographics | Motivations, values, attitudes, lifestyle |
| behaviors | Usage patterns, feature preferences |
| needs_and_goals | Primary, secondary, functional, emotional |
| frustrations | Pain points with evidence |
| scenarios | Contextual usage stories |
| design_implications | Actionable recommendations |
| data_points | Sample size, confidence level |

---

## Quick Reference Tables

### Research Method Selection

| Question Type | Best Method | Sample Size |
|---------------|-------------|-------------|
| "What do users do?" | Analytics, observation | 100+ events |
| "Why do they do it?" | Interviews | 8-15 users |
| "How well can they do it?" | Usability test | 5-8 users |
| "What do they prefer?" | Survey, A/B test | 50+ users |
| "What do they feel?" | Diary study, interviews | 10-15 users |

### Persona Confidence Levels

| Sample Size | Confidence | Use Case |
|-------------|------------|----------|
| 5-10 users | Low | Exploratory |
| 11-30 users | Medium | Directional |
| 31+ users | High | Production |

### Usability Issue Severity

| Severity | Definition | Action |
|----------|------------|--------|
| 4 - Critical | Prevents task completion | Fix immediately |
| 3 - Major | Significant difficulty | Fix before release |
| 2 - Minor | Causes hesitation | Fix when possible |
| 1 - Cosmetic | Noticed but not problematic | Low priority |

### Interview Question Types

| Type | Example | Use For |
|------|---------|---------|
| Context | "Walk me through your typical day" | Understanding environment |
| Behavior | "Show me how you do X" | Observing actual actions |
| Goals | "What are you trying to achieve?" | Uncovering motivations |
| Pain | "What's the hardest part?" | Identifying frustrations |
| Reflection | "What would you change?" | Generating ideas |

---

## Knowledge Base

Detailed reference guides in `references/`:

| File | Content |
|------|---------|
| `persona-methodology.md` | Validity criteria, data collection, analysis framework |
| `journey-mapping-guide.md` | Mapping process, templates, opportunity identification |
| `example-personas.md` | 3 complete persona examples with data |
| `usability-testing-frameworks.md` | Test planning, task design, analysis |

---

## Validation Checklist

### Persona Quality
- [ ] Based on 20+ users (minimum)
- [ ] At least 2 data sources (quant + qual)
- [ ] Specific, actionable goals
- [ ] Frustrations include frequency counts
- [ ] Design implications are specific
- [ ] Confidence level stated

### Journey Map Quality
- [ ] Scope clearly defined (persona, goal, timeframe)
- [ ] Based on real user data, not assumptions
- [ ] All layers filled (actions, touchpoints, emotions)
- [ ] Pain points identified per stage
- [ ] Opportunities prioritized

### Usability Test Quality
- [ ] Research questions are testable
- [ ] Tasks are realistic scenarios, not instructions
- [ ] 5+ participants per design
- [ ] Success metrics defined
- [ ] Findings include severity ratings

### Research Synthesis Quality
- [ ] Data coded consistently
- [ ] Patterns based on 3+ data points
- [ ] Findings include evidence
- [ ] Recommendations are actionable
- [ ] Priorities justified

---

## Ứng Dụng Cho CDS Platform

### 3 Persona Phổ Biến Tại Thị Trường VN

**Persona 1: Anh Minh - Giám Đốc Điều Hành (CEO/COO)**
```
Tuổi: 40-55 | Vị trí: C-level | Tech proficiency: 3/10
Mục tiêu: Nhìn tổng quan doanh nghiệp trên 1 dashboard, ra quyết định nhanh
Pain points:
  - Phải hỏi nhiều phòng ban mới có số liệu (5/5 frequency)
  - Báo cáo Excel không real-time, hay sai số (4/5)
  - Không biết performance từng nhân viên/phòng ban (4/5)
CDS Modules quan tâm: M10 (BI), M1 (Sales Dashboard), M8 (HR KPIs)
Đặc điểm VN: Quyết định dựa trên quan hệ tin tưởng, cần demo trực tiếp
```

**Persona 2: Chị Hà - Trưởng Phòng Kinh Doanh**
```
Tuổi: 30-40 | Vị trí: Manager | Tech proficiency: 5/10
Mục tiêu: Quản lý pipeline sales, theo dõi KPI team, không bỏ sót deal
Pain points:
  - Sales team báo cáo bằng Excel, dữ liệu phân tán (5/5)
  - Không biết deal nào đang stuck ở đâu (4/5)
  - Khó forecast doanh thu chính xác (4/5)
CDS Modules quan tâm: M1 (Sales), M2 (Trade Marketing), M10 (Reports)
Đặc điểm VN: Quen dùng Zalo để chỉ đạo, cần mobile-friendly
```

**Persona 3: Anh Tuấn - IT Manager**
```
Tuổi: 28-38 | Vị trí: Technical | Tech proficiency: 8/10
Mục tiêu: Hệ thống ổn định, dễ maintain, tích hợp được với hệ thống hiện có
Pain points:
  - Nhiều hệ thống rời rạc, phải maintain thủ công (5/5)
  - Data không đồng bộ giữa các hệ thống (5/5)
  - Vendor lock-in với giải pháp cũ (3/5)
CDS Modules quan tâm: M11 (Integration), M12 (Advanced Tech), All Admin
Đặc điểm VN: Lo lắng về data sovereignty, muốn on-premise option
```

### CDS Customer Journey Map

```
Stage:        Nhận Biết    →    Đánh Giá     →    Quyết Định    →    Triển Khai    →    Sử Dụng
              (Awareness)       (Evaluation)       (Decision)        (Implementation)   (Adoption)
─────────────────────────────────────────────────────────────────────────────────────────────────
Actions:      Tìm giải pháp    So sánh vendors    Thương lượng      Kickoff, config   Sử dụng hàng
              Đọc case study   Request demo       Ký hợp đồng       Training          ngày, báo cáo

Touchpoints:  Website, Zalo    Demo call, POC     Meeting F2F       Onsite/Remote     Help desk,
              Hội thảo, giới   Tham khảo KH cũ    Proposal, SOW     Go-live support   Zalo group
              thiệu qua quen

Emotions:     😐 Tò mò        😊 Hào hứng →     😰 Lo lắng →      😤 Khó khăn →     😊 Quen dần
              (3/5)           😟 Phân vân         😊 Tin tưởng       😊 Thấy kết quả   → 😍 Hài lòng
                              (3/5)               (4/5)              (3→4/5)            (4/5)

Pain Points:  Không biết bắt   Khó so sánh        Sợ tốn kém mà    Nhân viên ngại    Quên cách dùng
              đầu từ đâu       apple-to-apple      không hiệu quả    thay đổi          tính năng nâng
                                                                                        cao

Opportunities: Content SEO     Tạo comparison      Flexible pricing   Gamified          In-app guide,
              Case study VN    Hands-on POC        Pilot program      training          Zalo support
              Webinar ngành    ROI calculator      Reference visit    Change mgmt       Monthly review
```

### Lưu Ý Khi Research Tại VN

1. **Ngôn ngữ**: Phỏng vấn bằng tiếng Việt, tránh thuật ngữ kỹ thuật với business users
2. **Quan hệ**: Cần warm intro trước khi phỏng vấn, không cold-contact
3. **Bối cảnh**: Nhiều doanh nghiệp VN vẫn dùng Excel/giấy, đừng assume digital maturity cao
4. **Incentive**: Quà tặng hoặc ưu đãi dịch vụ hiệu quả hơn tiền mặt
5. **Privacy**: Người VN ngại chia sẻ thông tin tài chính/doanh thu - hỏi gián tiếp
