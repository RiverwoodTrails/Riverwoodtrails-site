// ---- MOBILE NAV TOGGLE ----
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('open');
    });
  });
}

// ---- SITE SEARCH (cross-page aware) ----
const searchIndex = [
  { title: "Home", tag: "Page", href: "index.html", keywords: "home welcome" },
  { title: "HOA News / Announcements", tag: "Section", href: "index.html#announcements", keywords: "announcements news updates board notices" },
  { title: "HOA Dues", tag: "Section", href: "index.html#dues", keywords: "dues payment 350 annual assessment invoice insurance lawn care reserve landscape" },
  { title: "Make a Payment", tag: "Section", href: "index.html#make-a-payment", keywords: "make a payment pay online pay by check credit card ach pnc bank qr code notice of payment by mail po box 195" },
  { title: "Neighborhood Gallery", tag: "Section", href: "index.html#gallery", keywords: "gallery photos pictures neighborhood" },
  { title: "About Riverwood Trails", tag: "Section", href: "index.html#about", keywords: "about history real estate realtor selling home" },
  { title: "Community Calendar", tag: "Page", href: "calendar.html#calendar", keywords: "calendar meetings annual meeting quarterly board meeting minutes" },
  { title: "Board of Directors", tag: "Section", href: "board.html#board", keywords: "board directors president treasurer secretary tim macy amanda wells daniel kostreva" },
  { title: "Design Review Board", tag: "Section", href: "board.html#design-review-board", keywords: "design review board drb approval application architectural" },
  { title: "Grounds Committee", tag: "Section", href: "board.html#grounds-committee", keywords: "grounds committee volunteer landscaping lawn care quotes" },
  { title: "Frequently Asked Questions", tag: "Page", href: "faq.html#faq", keywords: "faq questions rules guidelines" },
  { title: "Contact the Board", tag: "Section", href: "#contact", keywords: "contact email message form" },
  { title: "HOA Documents", tag: "Page", href: "documents.html", keywords: "documents covenants policy garbage can design review application" },
  { title: "Design Review Application (fillable)", tag: "Document", href: "documents.html#drb-form", keywords: "design review application form approval submit fillable online" },
  { title: "Covenants (Full Declaration)", tag: "Document", href: "documents.html#covenants", keywords: "covenants declaration restrictions easements articles of incorporation code of regulations design review board bylaws" },
  { title: "HOA Policy Clarification", tag: "Document", href: "documents.html#policy-clarification", keywords: "policy clarification signs trash fencing mailbox pools shingle siding shutters fees liens" },
  { title: "Garbage Can Storage Policy", tag: "Document", href: "documents.html#garbage-can-policy", keywords: "garbage can trash storage screen enclosure policy violations fine" },
  { title: "New Residents", tag: "Page", href: "new-residents.html", keywords: "new resident welcome guide moving in trash day new to neighborhood getting started" },
  { title: "Realtors", tag: "Page", href: "realtors.html", keywords: "realtor real estate agent listing buyer selling home" },
  { title: "New Resident Welcome Guide", tag: "Document", href: "documents.html#new-resident-guide", keywords: "new resident welcome guide moving in trash day new to neighborhood" },
  { title: "When are HOA dues to be paid?", tag: "FAQ", href: "faq.html#faq-1", keywords: "dues due date april 350 payment" },
  { title: "Can I install a fence? If so, what kind is allowed?", tag: "FAQ", href: "faq.html#faq-2", keywords: "fence fencing split rail" },
  { title: "Can I paint my trim, door, and shutters a different color?", tag: "FAQ", href: "faq.html#faq-3", keywords: "paint trim door shutters color" },
  { title: "Can I add on to my house or deck?", tag: "FAQ", href: "faq.html#faq-4", keywords: "addition deck add on" },
  { title: "Can I change the color of my roof or siding?", tag: "FAQ", href: "faq.html#faq-5", keywords: "roof siding color shingle" },
  { title: "Can I make my landscaping different?", tag: "FAQ", href: "faq.html#faq-6", keywords: "landscaping landscape yard" },
  { title: "Can I install a swimming pool? If so, what kind?", tag: "FAQ", href: "faq.html#faq-7", keywords: "pool swimming pool above ground in ground hot tub" },
  { title: "Can I extend the width of my driveway?", tag: "FAQ", href: "faq.html#faq-8", keywords: "driveway widen extend" },
  { title: "What's the process for getting approval for a home or yard change?", tag: "FAQ", href: "faq.html#faq-9", keywords: "approval process design review application submit" },
  { title: "What are the requirements for my mailbox?", tag: "FAQ", href: "faq.html#faq-10", keywords: "mailbox post color white loggia" },
  { title: "Where am I allowed to store my garbage cans?", tag: "FAQ", href: "faq.html#faq-11", keywords: "garbage can storage location trash" },
  { title: "What are the rules for a garbage can screen or enclosure?", tag: "FAQ", href: "faq.html#faq-12", keywords: "garbage can screen enclosure dimensions materials" },
  { title: "What happens if my garbage cans or screen aren't in compliance?", tag: "FAQ", href: "faq.html#faq-13", keywords: "garbage can violation fine compliance" },
  { title: "Can I park a truck, RV, boat, or trailer at my house?", tag: "FAQ", href: "faq.html#faq-14", keywords: "truck rv boat trailer vehicle parking pickup" },
  { title: "Can I put up a satellite dish or antenna?", tag: "FAQ", href: "faq.html#faq-15", keywords: "satellite dish antenna" },
  { title: "Can I run a business out of my home?", tag: "FAQ", href: "faq.html#faq-16", keywords: "business home occupation" },
  { title: "Are there restrictions on yard signs?", tag: "FAQ", href: "faq.html#faq-17", keywords: "signs yard sign real estate" },
  { title: "What happens if I don't pay my dues on time?", tag: "FAQ", href: "faq.html#faq-18", keywords: "late dues unpaid fee lien" },
  { title: "What does the HOA Board do?", tag: "FAQ", href: "faq.html#faq-19", keywords: "board of directors role duties" },
  { title: "What is the Design Review Board?", tag: "FAQ", href: "faq.html#faq-20", keywords: "design review board role members" },
  { title: "What is the Grounds Committee?", tag: "FAQ", href: "faq.html#faq-21", keywords: "grounds committee role volunteer" },
  { title: "How do I contact the board?", tag: "FAQ", href: "faq.html#faq-22", keywords: "contact email board" },
];

const searchToggle = document.getElementById('searchToggle');
const searchPanel = document.getElementById('searchPanel');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

function currentPageName() {
  const p = location.pathname.split('/').pop();
  return p === '' ? 'index.html' : p;
}

function renderResults(query) {
  const q = query.trim().toLowerCase();
  if (!q) { searchResults.innerHTML = ''; return; }
  const matches = searchIndex.filter(item =>
    item.title.toLowerCase().includes(q) || item.keywords.toLowerCase().includes(q)
  ).slice(0, 8);
  if (matches.length === 0) {
    searchResults.innerHTML = '<div class="search-empty">No matches — try a different word.</div>';
    return;
  }
  searchResults.innerHTML = matches.map(item =>
    `<a class="search-result" data-href="${item.href}" data-external="${!!item.external}">
      <span class="r-title">${item.title}</span>
      <span class="r-tag">${item.tag}</span>
    </a>`
  ).join('');
  searchResults.querySelectorAll('.search-result').forEach(el => {
    el.addEventListener('click', () => goToResult(el.dataset.href, el.dataset.external === 'true'));
  });
}

function goToResult(href, external) {
  closeSearch();
  if (external) {
    window.open(href, '_blank', 'noopener');
    return;
  }
  const [page, hash] = href.split('#');
  const targetPage = page || '';
  const onDifferentPage = targetPage !== '' && targetPage !== currentPageName();

  if (onDifferentPage) {
    window.location.href = href;
    return;
  }

  const targetHash = hash ? '#' + hash : '';
  if (!targetHash) return;
  if (targetHash.startsWith('#faq-')) {
    const details = document.getElementById(targetHash.slice(1));
    if (details) {
      details.setAttribute('open', '');
      details.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  } else {
    const target = document.querySelector(targetHash);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }
}

if (searchToggle && searchPanel && searchInput && searchResults) {
  function openSearch() {
    searchPanel.classList.add('open');
    setTimeout(() => searchInput.focus(), 50);
  }
  function closeSearch() {
    searchPanel.classList.remove('open');
    searchInput.value = '';
    searchResults.innerHTML = '';
  }
  searchToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    searchPanel.classList.contains('open') ? closeSearch() : openSearch();
  });
  searchInput.addEventListener('input', (e) => renderResults(e.target.value));
  document.addEventListener('click', (e) => {
    if (!searchPanel.contains(e.target) && e.target !== searchToggle) closeSearch();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
  });
}

// ---- DEEP-LINKED FAQ: auto-open + scroll when arriving via #faq-N ----
if (location.hash && location.hash.startsWith('#faq-')) {
  const d = document.getElementById(location.hash.slice(1));
  if (d && d.tagName === 'DETAILS') {
    d.setAttribute('open', '');
    setTimeout(() => d.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
  }
}

// ---- COMMUNITY CALENDAR (only runs on calendar.html) ----
const calGrid = document.getElementById('calGrid');
if (calGrid) {
  const calTitle = document.getElementById('calTitle');
  const calPrev = document.getElementById('calPrev');
  const calNext = document.getElementById('calNext');
  const calToday = document.getElementById('calToday');

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const today = new Date();
  let viewYear = today.getFullYear();
  let viewMonth = today.getMonth();

  const calEvents = [
    { year: 2026, month: 7, day: 29, label: "Annual HOA Meeting — new board elected",
      detail: "Doug Godby (President) and John Cook (Treasurer) completed their terms. Tim Macy and Daniel Kostreva were elected to the board, and Amanda Wells continues her term. Officer positions (President, Treasurer, Secretary) will be assigned at the board's next meeting. Thank you to Doug and John for their service, and welcome to Tim and Daniel.",
      link: { label: "Read the full announcement", href: "index.html#announcements" } }
  ];

  const duesRecurringEvent = {
    label: "Dues invoiced this month",
    detail: "Annual HOA dues invoices are mailed no later than April each year, covering the calendar year January through December. Current annual dues are $350.",
    link: { label: "See dues details", href: "index.html#dues" }
  };

  function renderCalendar(year, month) {
    calTitle.textContent = monthNames[month] + " " + year;
    calGrid.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const isCurrentMonth = (year === today.getFullYear() && month === today.getMonth());
    const isAprilView = (month === 3);

    for (let i = 0; i < firstDay; i++) {
      const cell = document.createElement('div');
      cell.className = 'cal-day empty';
      calGrid.appendChild(cell);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const cell = document.createElement('div');
      cell.className = 'cal-day';
      if (isCurrentMonth && d === today.getDate()) cell.classList.add('today');

      const num = document.createElement('span');
      num.className = 'cal-daynum';
      num.textContent = d;
      cell.appendChild(num);

      if (isAprilView && d === 1) {
        const ev = document.createElement('span');
        ev.className = 'cal-event recurring';
        ev.textContent = duesRecurringEvent.label;
        ev.addEventListener('click', (e) => {
          e.stopPropagation();
          openCalModal(monthNames[month] + " 1, " + year, duesRecurringEvent.label, duesRecurringEvent.detail, duesRecurringEvent.link);
        });
        cell.appendChild(ev);
      }

      const dateEvents = calEvents.filter(e => e.year === year && e.month === month && e.day === d);
      dateEvents.forEach(e => {
        const ev = document.createElement('span');
        ev.className = 'cal-event';
        ev.textContent = e.label;
        ev.addEventListener('click', (evt) => {
          evt.stopPropagation();
          openCalModal(monthNames[month] + " " + d + ", " + year, e.label, e.detail, e.link);
        });
        cell.appendChild(ev);
      });

      calGrid.appendChild(cell);
    }

    const totalCells = firstDay + daysInMonth;
    const remainder = totalCells % 7;
    if (remainder !== 0) {
      for (let i = 0; i < 7 - remainder; i++) {
        const cell = document.createElement('div');
        cell.className = 'cal-day empty';
        calGrid.appendChild(cell);
      }
    }
  }

  calPrev.addEventListener('click', () => {
    viewMonth--;
    if (viewMonth < 0) { viewMonth = 11; viewYear--; }
    renderCalendar(viewYear, viewMonth);
  });
  calNext.addEventListener('click', () => {
    viewMonth++;
    if (viewMonth > 11) { viewMonth = 0; viewYear++; }
    renderCalendar(viewYear, viewMonth);
  });
  calToday.addEventListener('click', () => {
    viewYear = today.getFullYear();
    viewMonth = today.getMonth();
    renderCalendar(viewYear, viewMonth);
  });

  const calModalOverlay = document.getElementById('calModalOverlay');
  const calModalClose = document.getElementById('calModalClose');
  const calModalDate = document.getElementById('calModalDate');
  const calModalTitle = document.getElementById('calModalTitle');
  const calModalDetail = document.getElementById('calModalDetail');
  const calModalLink = document.getElementById('calModalLink');

  function openCalModal(dateLabel, title, detail, link) {
    calModalDate.textContent = dateLabel;
    calModalTitle.textContent = title;
    calModalDetail.textContent = detail;
    if (link) {
      calModalLink.textContent = link.label;
      calModalLink.href = link.href;
      calModalLink.style.display = 'inline-flex';
      calModalLink.onclick = () => closeCalModal();
    } else {
      calModalLink.style.display = 'none';
    }
    calModalOverlay.classList.add('open');
  }
  function closeCalModal() {
    calModalOverlay.classList.remove('open');
  }
  calModalClose.addEventListener('click', closeCalModal);
  calModalOverlay.addEventListener('click', (e) => {
    if (e.target === calModalOverlay) closeCalModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCalModal();
  });

  renderCalendar(viewYear, viewMonth);
}

// ---- DRB FORM TOGGLE (only runs on board.html) ----
const drbFormToggle = document.getElementById('drbFormToggle');
const drbFormWrap = document.getElementById('drbFormWrap');
if (drbFormToggle && drbFormWrap) {
  drbFormToggle.addEventListener('click', () => {
    const showing = drbFormWrap.style.display !== 'none';
    drbFormWrap.style.display = showing ? 'none' : 'block';
    drbFormToggle.textContent = showing ? 'Fill It Out Online' : 'Hide Form';
    if (!showing) drbFormWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
