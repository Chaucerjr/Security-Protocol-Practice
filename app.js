// ============================================================
//  SECUREOPS TRAINING PLATFORM — App Logic
// ============================================================

// ---- STATE ------------------------------------------------------------------
const state = {
  view: 'dashboard',
  filter: 'all',
  careerTrack: 'all',
  careerLevel: 'all',
  totalScore: 0,
  completedScenarios: new Set(JSON.parse(localStorage.getItem('completed') || '[]')),
  scores: JSON.parse(localStorage.getItem('scores') || '{}'),
  sim: null,  // active simulation state
};

function saveState() {
  localStorage.setItem('completed', JSON.stringify([...state.completedScenarios]));
  localStorage.setItem('scores', JSON.stringify(state.scores));
}

function recalcTotal() {
  state.totalScore = Object.values(state.scores).reduce((a, b) => a + b, 0);
  document.getElementById('total-score').textContent = state.totalScore;
}

// ---- ROUTING ----------------------------------------------------------------
function navigate(view) {
  state.view = view;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  renderView();
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => navigate(btn.dataset.view));
});

// ---- RENDER DISPATCHER ------------------------------------------------------
function renderView() {
  const app = document.getElementById('app');
  if (state.view === 'dashboard') app.innerHTML = renderDashboard();
  else if (state.view === 'scenarios') app.innerHTML = renderScenariosList();
  else if (state.view === 'progress') app.innerHTML = renderProgress();
  else if (state.view === 'simulation') app.innerHTML = renderSimulation();
  else if (state.view === 'careers') app.innerHTML = renderCareers();
  bindViewEvents();
}

// ---- DASHBOARD --------------------------------------------------------------
function renderDashboard() {
  const done = state.completedScenarios.size;
  const total = ALL_SCENARIOS.length;
  const pct = total ? Math.round(done / total * 100) : 0;
  const cats = CATEGORIES.length;

  return `
<div class="view">
  <div class="dashboard-hero">
    <div>
      <div class="hero-title">Security Protocol Training</div>
      <div class="hero-sub">Practice real-world security scenarios across phishing, incident response, social engineering, network analysis, and more. Build skills that protect organizations.</div>
    </div>
    <button class="hero-cta" data-action="start-first">Start Training</button>
  </div>

  <div class="stats-row">
    <div class="stat-card">
      <div class="stat-value">${done}</div>
      <div class="stat-label">Scenarios Completed</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${total}</div>
      <div class="stat-label">Total Scenarios</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${pct}%</div>
      <div class="stat-label">Completion Rate</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${state.totalScore}</div>
      <div class="stat-label">Points Earned</div>
    </div>
  </div>

  <div class="section-title">Training Modules</div>
  <div class="category-grid">
    ${CATEGORIES.map(cat => {
      const catScenarios = ALL_SCENARIOS.filter(s => s.category === cat.id);
      const catDone = catScenarios.filter(s => state.completedScenarios.has(s.id)).length;
      return `
      <div class="category-card" style="--card-color:${cat.color}" data-action="open-category" data-category="${cat.id}">
        <div class="category-icon">${cat.icon}</div>
        <div class="category-name">${cat.name}</div>
        <div class="category-desc">${cat.desc}</div>
        <div class="category-meta">
          <span class="category-count">${catDone}/${catScenarios.length} completed</span>
          <span class="category-difficulty diff-${cat.difficulty}">${cat.difficulty}</span>
        </div>
      </div>`;
    }).join('')}
  </div>
</div>`;
}

// ---- SCENARIOS LIST ---------------------------------------------------------
function renderScenariosList() {
  const filtered = state.filter === 'all'
    ? ALL_SCENARIOS
    : ALL_SCENARIOS.filter(s => s.category === state.filter);

  return `
<div class="view">
  <div class="section-title">All Scenarios</div>
  <div class="scenarios-filters">
    <button class="filter-btn ${state.filter === 'all' ? 'active' : ''}" data-filter="all">All</button>
    ${CATEGORIES.map(c => `
      <button class="filter-btn ${state.filter === c.id ? 'active' : ''}" data-filter="${c.id}">${c.name}</button>
    `).join('')}
  </div>
  <div class="scenarios-grid">
    ${filtered.map(s => {
      const cat = CATEGORIES.find(c => c.id === s.category);
      const done = state.completedScenarios.has(s.id);
      return `
      <div class="scenario-card ${done ? 'completed' : ''}" data-action="start-scenario" data-id="${s.id}">
        <div class="scenario-thumb" style="background:${cat?.color}22; color:${cat?.color}">${cat?.icon || '?'}</div>
        <div class="scenario-info">
          <div class="scenario-title">${s.title}</div>
          <div class="scenario-desc">${s.desc}</div>
          <div class="scenario-tags">
            ${s.tags.map(t => `<span class="tag">${t}</span>`).join('')}
            ${done ? `<span class="tag" style="color:var(--accent2);border-color:var(--accent2)">+${state.scores[s.id] || 0} pts</span>` : ''}
          </div>
        </div>
      </div>`;
    }).join('')}
  </div>
</div>`;
}

// ---- PROGRESS ---------------------------------------------------------------
function renderProgress() {
  const achievements = [
    { name: 'First Steps',       icon: '&#127937;', desc: 'Complete your first scenario',              earned: state.completedScenarios.size >= 1 },
    { name: 'Phish Spotter',     icon: '&#128231;', desc: 'Complete all 10 phishing scenarios',        earned: PHISHING_SCENARIOS.every(s => state.completedScenarios.has(s.id)) },
    { name: 'First Responder',   icon: '&#128680;', desc: 'Complete all 8 incident response scenarios', earned: INCIDENT_SCENARIOS.every(s => state.completedScenarios.has(s.id)) },
    { name: 'Key Master',        icon: '&#128273;', desc: 'Complete all 8 password scenarios',         earned: PASSWORD_SCENARIOS.every(s => state.completedScenarios.has(s.id)) },
    { name: 'Social Shield',     icon: '&#129309;', desc: 'Complete all 8 social eng. scenarios',      earned: SOCIAL_SCENARIOS.every(s => state.completedScenarios.has(s.id)) },
    { name: 'Packet Inspector',  icon: '&#128270;', desc: 'Complete all 8 network scenarios',          earned: NETWORK_SCENARIOS.every(s => state.completedScenarios.has(s.id)) },
    { name: 'Data Guardian',     icon: '&#128196;', desc: 'Complete all 8 data class. scenarios',      earned: DATACLASS_SCENARIOS.every(s => state.completedScenarios.has(s.id)) },
    { name: 'Century',           icon: '&#127881;', desc: 'Earn 500 points',                           earned: state.totalScore >= 500 },
    { name: 'Halfway There',     icon: '&#9889;',   desc: 'Complete 25 scenarios',                     earned: state.completedScenarios.size >= 25 },
    { name: 'Security Pro',      icon: '&#127942;', desc: 'Complete all 50 scenarios',                 earned: state.completedScenarios.size >= ALL_SCENARIOS.length },
    { name: 'Top Scorer',        icon: '&#128200;', desc: 'Earn 1,000 points',                         earned: state.totalScore >= 1000 },
    { name: 'Dedicated',         icon: '&#128293;', desc: 'Earn 2,000 points',                         earned: state.totalScore >= 2000 },
  ];

  return `
<div class="view progress-view">
  <div class="section-title">Progress by Category</div>
  <div class="progress-grid">
    ${CATEGORIES.map(cat => {
      const catS = ALL_SCENARIOS.filter(s => s.category === cat.id);
      const done = catS.filter(s => state.completedScenarios.has(s.id)).length;
      const pct = catS.length ? Math.round(done / catS.length * 100) : 0;
      const catScore = catS.reduce((sum, s) => sum + (state.scores[s.id] || 0), 0);
      return `
      <div class="progress-card">
        <div class="progress-card-title">
          <span>${cat.icon} ${cat.name}</span>
          <span style="color:var(--accent2)">${catScore} pts</span>
        </div>
        <div class="mini-progress"><div class="mini-fill fill-blue" style="width:${pct}%"></div></div>
        <div class="progress-info">${done} of ${catS.length} scenarios complete (${pct}%)</div>
      </div>`;
    }).join('')}
  </div>

  <div class="section-title" style="margin-top:40px">Achievements</div>
  <div class="achievements-grid">
    ${achievements.map(a => `
      <div class="achievement ${a.earned ? 'earned' : 'locked'}">
        <div class="achievement-icon">${a.icon}</div>
        <div class="achievement-name">${a.name}</div>
        <div class="achievement-desc">${a.desc}</div>
      </div>
    `).join('')}
  </div>

  <div class="section-title" style="margin-top:40px">Score Summary</div>
  <div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:24px;max-width:500px">
    ${ALL_SCENARIOS.map(s => {
      const score = state.scores[s.id];
      const done = state.completedScenarios.has(s.id);
      return `
      <div class="breakdown-row">
        <span class="breakdown-label">${s.title}</span>
        <span class="breakdown-val ${done ? 'val-correct' : ''}">${done ? '+' + score + ' pts' : '—'}</span>
      </div>`;
    }).join('')}
    <div class="breakdown-row" style="margin-top:8px">
      <span class="breakdown-label"><strong>Total</strong></span>
      <span class="breakdown-val" style="color:var(--accent)">${state.totalScore} pts</span>
    </div>
  </div>
</div>`;
}

// ---- SIMULATION RENDER ------------------------------------------------------
function renderSimulation() {
  const sim = state.sim;
  if (!sim) return '<div class="view"><p>No active simulation.</p></div>';

  const scenario = sim.scenario;
  const step = scenario.steps[sim.stepIndex];
  const total = scenario.steps.length;
  const pct = Math.round((sim.stepIndex / total) * 100);
  const cat = CATEGORIES.find(c => c.id === scenario.category);

  return `
<div class="view">
  <div class="sim-layout">
    <div class="sim-main">
      <div class="sim-topbar">
        <span style="color:${cat?.color}">${cat?.icon}</span>
        <span class="sim-title">${scenario.title}</span>
        <span class="sim-step-badge">Step ${sim.stepIndex + 1} of ${total}</span>
      </div>
      <div class="sim-body">
        <div class="sim-progress">
          <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
          <div class="progress-labels"><span>Progress</span><span>${pct}%</span></div>
        </div>

        ${renderStep(step, sim)}

        ${sim.answered ? renderFeedback(step, sim) : ''}
        ${sim.answered ? `<button class="next-btn" data-action="next-step">${sim.stepIndex + 1 < total ? 'Next Step &rarr;' : 'Complete Scenario'}</button>` : ''}
      </div>
    </div>

    <div class="sim-sidebar">
      <div class="sidebar-panel">
        <div class="sidebar-panel-title">Objectives</div>
        <div class="sidebar-panel-body">
          <ul class="objective-list">
            ${(step.objectives || scenario.steps[0].objectives || []).map((obj, i) => `
              <li class="${sim.answered && i === 0 ? 'done' : ''}">${obj}</li>
            `).join('')}
          </ul>
        </div>
      </div>

      <div class="sidebar-panel">
        <div class="sidebar-panel-title">Hint</div>
        <div class="sidebar-panel-body">
          ${sim.hintShown
            ? `<div class="hint-text">${step.hint || 'No hint available for this step.'}</div>`
            : `<button class="hint-reveal-btn" data-action="show-hint">Reveal Hint (-5 pts)</button>`
          }
        </div>
      </div>

      <div class="sidebar-panel">
        <div class="sidebar-panel-title">Score</div>
        <div class="sidebar-panel-body score-breakdown">
          <div class="score-row"><span>This step</span><span>${step.points} pts</span></div>
          <div class="score-row"><span>Hint penalty</span><span>${sim.hintPenalty > 0 ? '-' + sim.hintPenalty : '0'} pts</span></div>
          <div class="score-row"><span>Running total</span><span>${sim.runningScore}</span></div>
        </div>
      </div>

      <button class="btn-secondary" data-action="exit-sim" style="width:100%">&#8592; Exit Scenario</button>
    </div>
  </div>
</div>`;
}

function renderStep(step, sim) {
  let content = '';

  if (step.type === 'email') {
    const e = step.email;
    content = `
    <div class="scenario-stage">
      <div class="stage-label">${step.label}</div>
      <div class="email-sim">
        ${renderEmailRow('From', e.from)}
        ${renderEmailRow('To', e.to)}
        ${renderEmailRow('Subject', e.subject)}
        ${renderEmailRow('Date', e.date)}
        <div class="email-body">${formatEmailBody(e.body)}</div>
      </div>
    </div>`;
  } else if (step.type === 'terminal') {
    content = `
    <div class="scenario-stage">
      <div class="stage-label">${step.label}</div>
      <div class="terminal">
        ${step.terminal.map(line => `<div class="${line.type}">${escHtml(line.text)}</div>`).join('')}
      </div>
    </div>`;
  } else if (step.type === 'network') {
    content = `
    <div class="scenario-stage">
      <div class="stage-label">${step.label}</div>
      <div style="overflow-x:auto">
        <table class="network-table">
          <thead><tr><th>Source IP</th><th>Destination IP</th><th>Proto</th><th>Port</th><th>Data</th><th>Note</th></tr></thead>
          <tbody>
            ${step.networkRows.map(r => `
              <tr class="${r.class}">
                <td>${r.src}</td><td>${r.dst}</td><td>${r.proto}</td>
                <td>${r.port}</td><td>${r.bytes}</td><td>${r.note}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
  } else if (step.type === 'analysis') {
    content = `
    <div class="scenario-stage">
      <div class="stage-label">${step.label}</div>
      <div class="stage-content">${step.stageContent || ''}</div>
    </div>`;
  }

  content += `
  <div>
    <div class="stage-label" style="margin-bottom:12px">${step.question}</div>
    <div class="choices">
      ${step.choices.map((c, i) => {
        let cls = '';
        if (sim.answered) {
          if (c.correct) cls = 'correct';
          else if (i === sim.chosenIndex && !c.correct) cls = 'incorrect';
        }
        return `<button class="choice-btn ${cls}" data-action="choose" data-index="${i}" ${sim.answered ? 'disabled' : ''}>${c.text}</button>`;
      }).join('')}
    </div>
  </div>`;

  return content;
}

function renderFeedback(step, sim) {
  const correct = step.choices[sim.chosenIndex]?.correct;
  return `
  <div class="feedback-box ${correct ? 'feedback-correct' : 'feedback-incorrect'}">
    <div class="feedback-title">${correct ? 'Correct' : 'Incorrect'} ${correct ? '+' + (step.points - sim.hintPenalty) + ' points' : ''}</div>
    <div>${correct ? step.feedback.correct : step.feedback.incorrect}</div>
  </div>`;
}

function renderEmailRow(label, val) {
  return `<div class="email-header-row"><span class="email-header-label">${label}:</span><span class="email-header-val">${escHtml(val)}</span></div>`;
}

function formatEmailBody(body) {
  return escHtml(body)
    .replace(/(https?:\/\/[^\s]+)/g, '<span class="email-link">$1</span>')
    .replace(/(URGENT|SUSPENDED|CRITICAL|CONFIDENTIAL)/g, '<span class="highlight-warn">$1</span>');
}

function escHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ---- RESULTS SCREEN ---------------------------------------------------------
function renderResults(scenario, runningScore, correct, total) {
  const pct = Math.round(correct / total * 100);
  const grade = pct >= 80 ? 'Excellent' : pct >= 60 ? 'Good' : 'Needs Review';
  const icon = pct >= 80 ? '&#127881;' : pct >= 60 ? '&#128077;' : '&#128218;';

  const el = document.getElementById('app');
  el.innerHTML = `
<div class="view">
  <div class="results-screen">
    <div class="results-icon">${icon}</div>
    <div class="results-title">${grade}!</div>
    <div class="results-sub">${scenario.title} — Completed</div>
    <div class="results-score-ring">
      <div class="ring-value">${pct}%</div>
      <div class="ring-label">Score</div>
    </div>
    <div class="results-breakdown">
      <div class="breakdown-row"><span class="breakdown-label">Correct answers</span><span class="breakdown-val val-correct">${correct} / ${total}</span></div>
      <div class="breakdown-row"><span class="breakdown-label">Points earned</span><span class="breakdown-val val-correct">+${runningScore}</span></div>
      <div class="breakdown-row"><span class="breakdown-label">Total score</span><span class="breakdown-val">${state.totalScore}</span></div>
    </div>
    <div class="results-actions">
      <button class="btn-secondary" data-action="go-scenarios">All Scenarios</button>
      <button class="btn-primary" data-action="go-dashboard">Dashboard</button>
    </div>
  </div>
</div>`;
  bindViewEvents();
}

// ---- EVENT BINDING ----------------------------------------------------------
function bindViewEvents() {
  document.querySelectorAll('[data-action]').forEach(el => {
    el.addEventListener('click', handleAction);
  });
  document.querySelectorAll('[data-filter]').forEach(el => {
    el.addEventListener('click', () => {
      state.filter = el.dataset.filter;
      renderView();
    });
  });
  document.querySelectorAll('[data-career-track]').forEach(el => {
    el.addEventListener('click', () => {
      state.careerTrack = el.dataset.careerTrack;
      renderView();
    });
  });
  document.querySelectorAll('[data-career-level]').forEach(el => {
    el.addEventListener('click', () => {
      state.careerLevel = el.dataset.careerLevel;
      renderView();
    });
  });
}

function handleAction(e) {
  const action = e.currentTarget.dataset.action;

  if (action === 'start-first') {
    const first = ALL_SCENARIOS.find(s => !state.completedScenarios.has(s.id)) || ALL_SCENARIOS[0];
    startScenario(first.id);
  }
  else if (action === 'open-category') {
    state.filter = e.currentTarget.dataset.category;
    navigate('scenarios');
  }
  else if (action === 'start-scenario') {
    startScenario(e.currentTarget.dataset.id);
  }
  else if (action === 'choose') {
    handleChoice(parseInt(e.currentTarget.dataset.index));
  }
  else if (action === 'next-step') {
    advanceStep();
  }
  else if (action === 'show-hint') {
    state.sim.hintShown = true;
    state.sim.hintPenalty = 5;
    renderView();
  }
  else if (action === 'exit-sim') {
    state.sim = null;
    navigate('scenarios');
  }
  else if (action === 'go-dashboard') {
    state.sim = null;
    navigate('dashboard');
  }
  else if (action === 'go-scenarios') {
    state.sim = null;
    navigate('scenarios');
  }
  else if (action === 'open-role') {
    openRoleModal(e.currentTarget.dataset.roleId);
  }
}

// ---- SIMULATION LOGIC -------------------------------------------------------
function startScenario(id) {
  const scenario = ALL_SCENARIOS.find(s => s.id === id);
  if (!scenario) return;
  state.sim = {
    scenario,
    stepIndex: 0,
    answered: false,
    chosenIndex: null,
    hintShown: false,
    hintPenalty: 0,
    runningScore: 0,
    correctCount: 0,
  };
  state.view = 'simulation';
  navigate('simulation');
}

function handleChoice(index) {
  const sim = state.sim;
  if (sim.answered) return;
  const step = sim.scenario.steps[sim.stepIndex];
  const correct = step.choices[index]?.correct;

  sim.answered = true;
  sim.chosenIndex = index;
  if (correct) {
    const earned = step.points - sim.hintPenalty;
    sim.runningScore += Math.max(0, earned);
    sim.correctCount++;
  }
  sim.hintPenalty = 0;
  sim.hintShown = false;
  renderView();
}

function advanceStep() {
  const sim = state.sim;
  const total = sim.scenario.steps.length;

  if (sim.stepIndex + 1 < total) {
    sim.stepIndex++;
    sim.answered = false;
    sim.chosenIndex = null;
    sim.hintShown = false;
    sim.hintPenalty = 0;
    renderView();
  } else {
    // Scenario complete
    const scenario = sim.scenario;
    const finalScore = sim.runningScore;
    state.completedScenarios.add(scenario.id);
    state.scores[scenario.id] = Math.max(state.scores[scenario.id] || 0, finalScore);
    recalcTotal();
    saveState();
    renderResults(scenario, finalScore, sim.correctCount, total);
  }
}

// ---- CAREERS ----------------------------------------------------------------
function renderCareers() {
  const trackFilters = ['all', 'defensive', 'offensive', 'engineering', 'governance'];
  const levelFilters = ['all', 'entry', 'mid', 'senior', 'executive', 'any'];
  const track = state.careerTrack || 'all';
  const level = state.careerLevel || 'all';

  const filtered = CAREER_ROLES.filter(r =>
    (track === 'all' || r.track === track) &&
    (level === 'all' || r.level === level)
  );

  return `
<div class="view">
  <div class="careers-hero">
    <div class="careers-hero-title">Security Career Paths</div>
    <div class="careers-hero-sub">Explore roles in cybersecurity — from entry-level analysts to CISOs. Each card details the skills, certifications, and career paths for every position.</div>
  </div>

  <div class="careers-filters">
    <span style="font-size:12px;color:var(--muted);align-self:center;margin-right:4px">Track:</span>
    ${trackFilters.map(t => `<button class="filter-btn ${track === t ? 'active' : ''}" data-career-track="${t}">${t === 'all' ? 'All Tracks' : t.charAt(0).toUpperCase() + t.slice(1)}</button>`).join('')}
    <span style="font-size:12px;color:var(--muted);align-self:center;margin-left:8px;margin-right:4px">Level:</span>
    ${levelFilters.map(l => `<button class="filter-btn ${level === l ? 'active' : ''}" data-career-level="${l}">${l === 'all' ? 'All Levels' : l.charAt(0).toUpperCase() + l.slice(1)}</button>`).join('')}
  </div>

  <div class="roles-grid">
    ${filtered.map(role => `
      <div class="role-card" style="--role-color:${role.color}" data-action="open-role" data-role-id="${role.id}">
        <div class="role-card-header">
          <div class="role-icon">${role.icon}</div>
          <div>
            <div class="role-title">${role.title}</div>
            <div class="role-subtitle">${role.subtitle}</div>
          </div>
        </div>
        <div class="role-desc">${role.desc}</div>
        <div class="role-meta">
          <span class="role-salary">${role.salary}</span>
          <div style="display:flex;gap:6px">
            <span class="role-level-badge level-${role.level}">${role.level}</span>
            <span class="track-badge">${role.track}</span>
          </div>
        </div>
      </div>
    `).join('')}
  </div>
</div>`;
}

function openRoleModal(roleId) {
  const role = CAREER_ROLES.find(r => r.id === roleId);
  if (!role) return;

  const fromChips = (role.careerPath.from || []).map(f => `<span class="career-path-chip">${f}</span>`).join('<span class="career-path-arrow">›</span>');
  const toChips = (role.careerPath.to || []).map(t => `<span class="career-path-chip">${t}</span>`).join('');

  document.getElementById('modal-content').innerHTML = `
    <div class="role-modal-header">
      <div class="role-modal-icon">${role.icon}</div>
      <div>
        <div class="role-modal-title">${role.title}</div>
        <div class="role-modal-sub">${role.subtitle}</div>
        <div class="role-modal-badges">
          <span class="role-level-badge level-${role.level}">${role.level}</span>
          <span class="track-badge">${role.track}</span>
          <span style="font-size:12px;color:var(--accent2);font-weight:600">${role.salary}</span>
          <span style="font-size:12px;color:var(--muted)">${role.experience}</span>
        </div>
      </div>
    </div>
    <div class="role-modal-body">
      <div>
        <div class="modal-section-title">Overview</div>
        <div class="modal-overview">${role.overview}</div>
      </div>
      <div>
        <div class="modal-section-title">Skills Required</div>
        <div class="skills-columns">
          <div>
            <div style="font-size:12px;color:var(--muted);margin-bottom:6px">Technical</div>
            <ul class="skill-list">${role.technicalSkills.map(s => `<li>${s}</li>`).join('')}</ul>
          </div>
          <div>
            <div style="font-size:12px;color:var(--muted);margin-bottom:6px">Soft Skills</div>
            <ul class="skill-list">${role.softSkills.map(s => `<li>${s}</li>`).join('')}</ul>
          </div>
        </div>
      </div>
      <div>
        <div class="modal-section-title">Certifications</div>
        <div class="cert-list">
          ${role.certifications.map(c => `
            <div class="cert-item">
              <span class="cert-name">${c.name}</span>
              <span class="cert-priority prio-${c.priority}">${c.priority}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div>
        <div class="modal-section-title">Career Path</div>
        <div class="career-path-row">
          ${fromChips ? fromChips + '<span class="career-path-arrow">›</span>' : ''}
          <span class="career-path-current">${role.title}</span>
          ${toChips ? '<span class="career-path-arrow">›</span>' + toChips : ''}
        </div>
      </div>
      <div>
        <div class="modal-section-title">How to Enter This Field</div>
        <div class="entry-path-text">${role.entryPath}</div>
      </div>
      <div>
        <div class="modal-section-title">A Day in the Life</div>
        <div class="day-in-life">${role.dayInLife}</div>
      </div>
    </div>
  `;
  document.getElementById('modal-overlay').classList.remove('hidden');
}

// ---- MODAL ------------------------------------------------------------------
const overlay = document.getElementById('modal-overlay');
document.getElementById('modal-close').addEventListener('click', () => overlay.classList.add('hidden'));
overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.add('hidden'); });

// ---- THEME ------------------------------------------------------------------
const THEME_KEY = 'theme';
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
const themeLabel  = document.getElementById('theme-label');

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.classList.add('light');
    themeIcon.innerHTML = '&#9790;'; // crescent moon
    themeLabel.textContent = 'Light';
    themeToggle.title = 'Switch to dark mode';
  } else {
    document.documentElement.classList.remove('light');
    themeIcon.innerHTML = '&#9788;'; // sun
    themeLabel.textContent = 'Dark';
    themeToggle.title = 'Switch to light mode';
  }
}

themeToggle.addEventListener('click', () => {
  const next = document.documentElement.classList.contains('light') ? 'dark' : 'light';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
});

applyTheme(localStorage.getItem(THEME_KEY) || 'dark');

// ---- INIT -------------------------------------------------------------------
recalcTotal();
renderView();
